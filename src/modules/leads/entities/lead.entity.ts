import {
  Entity,
  PrimaryKey,
  Property,
  types,
  Enum,
  OneToMany,
  Ref,
} from '@mikro-orm/core';
import { UuidAdapter } from '@/adapters/uuid.adapter';
import { LeadStatus } from '@/constants/lead-status.enum';
import { BaseEntity } from '@/infra/db/_base.entity';
import { LeadHistory } from './lead-history.entity';

@Entity({ tableName: 'active-leads' })
export class Lead extends BaseEntity {
  @PrimaryKey({ type: types.uuid })
  id = new UuidAdapter().generate();

  @Property({ type: types.string, length: 255 })
  firstName!: string;

  @Property({ type: types.string, length: 255 })
  lastName!: string;

  @Property({ type: types.string, length: 255 })
  phoneNumber!: string;

  @Property({ type: types.string, length: 255 })
  email!: string;

  @Enum(() => LeadStatus)
  leadStatus!: LeadStatus;

  @Property({ type: types.string, length: 255 })
  campaignId!: string;

  @OneToMany(() => LeadHistory, (history) => history.lead, {
    ref: true,
    eager: true,
  })
  history?: Ref<LeadHistory>;
}
