import { UuidAdapter } from '@/adapters/uuid.adapter';
import { BaseEntity } from '@/infra/db/_base.entity';
import { Entity, PrimaryKey, Property, Unique, types } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'campaigns' })
export class Campaign extends BaseEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the user',
  })
  @PrimaryKey({ type: types.uuid })
  id: string = new UuidAdapter().generate();

  @ApiProperty({
    name: 'name',
    description: 'Campaign name',
  })
  @Unique()
  @Property()
  name: string;
}
