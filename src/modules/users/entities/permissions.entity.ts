import { UuidAdapter } from '@/adapters/uuid.adapter';
import { Role } from '@/constants/roles.enum';
import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
  Unique,
  types,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export enum PermissionKeys {
  MANAGE_USERS = 'manage_users',
}

@Entity({ tableName: 'permissions' })
export class Permissions {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the user',
  })
  @PrimaryKey({ type: types.uuid })
  id: string = new UuidAdapter().generate();

  @ApiProperty({
    example: 'Manager',
    description: 'Readable identifier for the permission',
    enum: Role,
  })
  @Enum(() => Role)
  @Unique()
  role: Role;

  @ApiProperty({
    description: 'Object containing permissions for the role',
    type: 'object',
    additionalProperties: {
      properties: {
        [PermissionKeys.MANAGE_USERS]: {
          type: 'boolean',
        },
      },
      enum: Object.keys(PermissionKeys).map(
        (key) => PermissionKeys[key as keyof typeof PermissionKeys],
      ),
    },
  })
  @Property({ type: types.json })
  value: Record<PermissionKeys.MANAGE_USERS, boolean>;
}
