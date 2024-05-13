import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('api/')
export class AppController {
  @ApiExcludeEndpoint()
  @Get('health-check')
  getHealth(): string {
    return 'OK';
  }
}
