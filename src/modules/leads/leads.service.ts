import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { EntityManager } from '@mikro-orm/core';
import { InteractionType } from '@/constants/interaction-type.enum';
import { LeadHistory } from './entities/lead-history.entity';
import { TwilioClient } from './clients/twillio.client';
import { IncomingTwilioMessageDto } from './dto/incoming-twillio-message.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepository: EntityRepository<Lead>,
    private readonly em: EntityManager,
    @InjectRepository(LeadHistory)
    private readonly leadHistoryRepository: EntityRepository<LeadHistory>,
    private readonly twilioClient: TwilioClient,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const newLead = this.leadsRepository.create(createLeadDto);
    await this.em.persistAndFlush(newLead);
    return newLead;
  }

  findAll(phoneNumber?: string): Promise<Lead[]> {
    if (phoneNumber) {
      const leadWithPhoneNumber = this.leadsRepository.find({ phoneNumber });
      if (!leadWithPhoneNumber) {
        throw new NotFoundException(
          'No leads were found with this phone number',
        );
      }
      return leadWithPhoneNumber;
    }
    return this.leadsRepository.findAll();
  }

  findOne(id: string): Promise<Lead | null> {
    const lead = this.leadsRepository.findOne(id);
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const leadToUpdate = await this.leadsRepository.findOne(id);
    if (!leadToUpdate) throw new NotFoundException('Lead not found');
    this.leadsRepository.assign(leadToUpdate, updateLeadDto);
    await this.em.flush();
    return leadToUpdate;
  }

  async addHistory(
    leadId: string,
    type: InteractionType,
    data: unknown,
  ): Promise<LeadHistory> {
    const history = this.leadHistoryRepository.create({
      lead: this.em.getReference(Lead, leadId),
      type,
      data,
    });
    await this.em.persistAndFlush(history);
    return history;
  }

  async handleIncomingMessage(body: IncomingTwilioMessageDto) {
    const phoneNumber = body.From;
    const messageContent = body.Body;
    let lead = await this.leadsRepository.findOne({ phoneNumber });

    if (!lead) {
      const createLeadDto: Partial<CreateLeadDto> = {
        phoneNumber,
      };
      lead = this.leadsRepository.create(createLeadDto as CreateLeadDto);
      await this.em.persistAndFlush(lead);
    }

    await this.addHistory(lead.id, InteractionType.SMS, {
      message: messageContent,
    });

    return this.twilioClient.receiveMessage();
  }

  async sendSms(leadId: string, body: string) {
    const lead = await this.leadsRepository.findOne(leadId);
    if (!lead) throw new NotFoundException('Lead not found');
    const to = lead.phoneNumber;
    return this.twilioClient.sendMessage(to, body);
  }
}
