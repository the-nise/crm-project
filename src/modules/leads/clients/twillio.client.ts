import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

@Injectable()
export class TwilioClient {
  private twilioClient;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.twilioClient = Twilio(accountSid, authToken);
  }

  async sendMessage(to: string, body: string): Promise<MessageInstance> {
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
    return this.twilioClient.messages.create({
      to,
      from,
      body,
    });
  }

  receiveMessage(): MessagingResponse {
    return new MessagingResponse();
  }
}
