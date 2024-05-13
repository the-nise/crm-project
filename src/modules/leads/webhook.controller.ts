import { HeaderAuthGuard } from '@/infra/guards/header-auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { IncomingTwilioMessageDto } from './dto/incoming-twillio-message.dto';

@UseGuards(HeaderAuthGuard)
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('/receive-sms')
  @HttpCode(HttpStatus.OK)
  async handleMessageReceived(@Body() body: IncomingTwilioMessageDto) {
    return await this.leadsService.handleIncomingMessage(body);
  }
}
