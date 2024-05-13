import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client',
    example: 'Twillio integration',
  })
  @IsString()
  name: string;
}
