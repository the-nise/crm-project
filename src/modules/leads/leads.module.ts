import { Global, Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Lead } from './entities/lead.entity';
import { LeadHistory } from './entities/lead-history.entity';
import { WebhookController } from './webhook.controller';
import { TwilioClient } from './clients/twillio.client';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Lead, LeadHistory])],
  controllers: [LeadsController, WebhookController],
  providers: [LeadsService, TwilioClient],
  exports: [LeadsService],
})
export class LeadsModule {}
