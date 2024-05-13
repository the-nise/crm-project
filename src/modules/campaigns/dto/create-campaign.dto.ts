import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    name: 'name',
    description: 'Campaign name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
