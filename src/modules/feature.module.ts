import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ClientsModule,
    CampaignsModule,
    LeadsModule,
  ],
  controllers: [],
  providers: [],
})
export class FeatureModule {}
