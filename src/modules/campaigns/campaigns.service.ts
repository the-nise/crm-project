import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly repository: EntityRepository<Campaign>,
    private readonly em: EntityManager,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    if (await this.repository.findOne({ name: createCampaignDto.name })) {
      throw new BadRequestException('Campaign with same name already exists');
    }
    const campaign = this.repository.create(createCampaignDto);
    await this.em.persistAndFlush(campaign);
    return campaign;
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const campaign = await this.repository.findOne(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with id ${id} not found`);
    }
    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    wrap(campaign).assign(updateCampaignDto);
    await this.em.persistAndFlush(campaign);
    return campaign;
  }

  async remove(id: string) {
    this.em.remove(this.repository.getReference(id));
    await this.em.flush();
  }
}
