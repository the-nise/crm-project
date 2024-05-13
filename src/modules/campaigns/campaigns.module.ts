import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Campaign } from './entities/campaign.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
