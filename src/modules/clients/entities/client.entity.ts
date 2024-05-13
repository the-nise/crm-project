import { UuidAdapter } from '@/adapters/uuid.adapter';
import { BaseEntity } from '@/infra/db/_base.entity';
import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'clients' })
export class Client extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier of the client',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: 'string',
  })
  @PrimaryKey({ type: types.uuid })
  id = new UuidAdapter().generate();

  @ApiProperty({
    description: 'Name of the client',
    example: 'Twillio Integration',
    type: 'string',
  })
  @Property({ type: types.string, length: 255 })
  name: string;

  @Property({ type: types.string, length: 255, hidden: true })
  secret: string;
}
