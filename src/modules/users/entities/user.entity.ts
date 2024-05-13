import {
  Entity,
  Enum,
  LoadStrategy,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  types,
} from '@mikro-orm/core';
import { UuidAdapter } from '@/adapters/uuid.adapter';
import { Role } from '@/constants/roles.enum';
import { BaseEntity } from '@/infra/db/_base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Permissions } from './permissions.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the user',
  })
  @PrimaryKey({ type: types.uuid })
  id: string = new UuidAdapter().generate();

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @Property({ type: types.string, length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Property({ type: types.string, length: 255 })
  lastName: string;

  @Unique()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    uniqueItems: true,
  })
  @Property({ type: types.string, length: 255 })
  email: string;

  @Property({ type: types.string, length: 255, hidden: true })
  password: string;

  @ApiProperty({
    example: 'AGENT',
    description: 'Role of the user',
    enum: Role,
    enumName: 'Role',
  })
  @Enum({ items: () => Role, default: Role.AGENT })
  role: Role;

  @ApiProperty({
    description: 'Permissions of the user',
    type: Permissions,
    required: true,
  })
  @ManyToOne(() => Permissions, { eager: true, strategy: LoadStrategy.JOINED })
  permissions!: Permissions;
}
