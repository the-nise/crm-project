import {
  Entity,
  PrimaryKey,
  Property,
  types,
  Enum,
  ManyToOne,
} from '@mikro-orm/core';
import { UuidAdapter } from '@/adapters/uuid.adapter';
import { InteractionType } from '@/constants/interaction-type.enum';
import { BaseEntity } from '@/infra/db/_base.entity';
import { Lead } from './lead.entity';

@Entity({ tableName: 'lead-history' })
export class LeadHistory extends BaseEntity {
  @PrimaryKey({ type: types.uuid })
  id = new UuidAdapter().generate();

  @ManyToOne(() => Lead)
  lead: Lead;

  @Enum(() => InteractionType)
  type: InteractionType;

  @Property({ type: 'json' })
  data: unknown;
}
