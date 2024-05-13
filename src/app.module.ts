import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ToolingModule } from './infra/nest/tooling.module';
import { FeatureModule } from './modules/feature.module';

@Module({
  imports: [ToolingModule, FeatureModule],
  controllers: [AppController],
})
export class AppModule {}
