import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IncomingTwilioMessageDto {
  @IsString()
  @IsNotEmpty()
  To: string;

  @IsString()
  @IsNotEmpty()
  From: string;

  @IsString()
  @IsNotEmpty()
  Body: string;

  @IsOptional()
  SmsSid: string;

  @IsOptional()
  AccountSid: string;

  @IsOptional()
  SmsStatus: string;

  @IsOptional()
  NumMedia: string;

  @IsOptional()
  NumSegments: string;

  @IsOptional()
  FromCity: string;

  @IsOptional()
  FromState: string;

  @IsOptional()
  FromZip: string;

  @IsOptional()
  FromCountry: string;

  @IsOptional()
  ToCity: string;

  @IsOptional()
  ToState: string;

  @IsOptional()
  ToZip: string;

  @IsOptional()
  ToCountry: string;
}
