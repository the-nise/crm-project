import { OptionalProps, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Property({ columnType: 'DATETIME', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Property({
    columnType: 'DATETIME',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
