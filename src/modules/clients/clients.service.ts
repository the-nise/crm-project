import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RandomAdapter } from '@/adapters/random.adapter';
import { HashAdapter } from '@/adapters/hash.adapter';

@Injectable()
export class ClientsService {
  secretLength = 20;
  constructor(
    @InjectRepository(Client)
    private readonly repository: EntityRepository<Client>,
    private readonly randomAdapter: RandomAdapter,
    private readonly em: EntityManager,
    private readonly hashAdapter: HashAdapter,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const secret = this.randomAdapter.generateString(this.secretLength);
    const client = this.repository.create({
      ...createClientDto,
      secret: await this.hashAdapter.hash(secret),
    });
    await this.em.persistAndFlush(client);
    return {
      ...wrap(client).toJSON(),
      secret,
    };
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne({ id });
  }

  async renewSecret(id: string) {
    const client = await this.repository.findOne({ id });
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    const secret = this.randomAdapter.generateString(this.secretLength);
    wrap(client).assign({
      ...client,
      secret,
    });
    return {
      ...wrap(client).toJSON(),
      secret,
    };
  }

  async remove(id: string) {
    this.em.remove(this.repository.getReference(id));
    await this.em.flush();
  }
}
