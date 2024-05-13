import { LeadStatus } from '@/constants/lead-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'John', description: 'The first name of the lead' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the lead' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the lead',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the lead',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123123123-asda-asda-123123123',
    description: 'The ID of the campaign associated with the lead',
  })
  @IsString()
  campaignId: string;

  @ApiProperty({
    enum: LeadStatus,
    example: LeadStatus.NOT_STARTED,
    description: 'The status of the lead',
  })
  @IsEnum(LeadStatus)
  leadStatus: LeadStatus;
}
