import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OutgoingTwilioMessageDto {
  @ApiProperty({
    description: 'Lead Uuid',
    example: 'f7b3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e',
  })
  @IsString()
  @IsNotEmpty()
  leadId: string;

  @ApiProperty({
    description: 'Message body',
    example: 'Hello, how can I help you?',
  })
  @IsString()
  @IsNotEmpty()
  body: string;
}
