import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { stdTimeFunctions } from 'pino';
import { HashAdapter } from 'src/adapters/hash.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MySqlDriver } from '@mikro-orm/mysql';
import { RandomAdapter } from '@/adapters/random.adapter';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: stdTimeFunctions.isoTime,
        level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
        transport:
          process.env.PRETTY_LOGS === 'true'
            ? { target: 'pino-pretty' }
            : undefined,
        redact: {
          paths: [
            'req.headers.x_client_id',
            'req.headers.x_client_secret',
            'req.headers.authorization',
          ],
        },
      },
    }),
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
      host: process.env.MYSQL_HOST,
      dbName: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT),
      driver: MySqlDriver,
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '../../../..', '/public/api-docs'),
        serveRoot: '/api/docs',
      },
      {
        rootPath: join(__dirname, '../../../..', '/public/client'),
        exclude: ['api/*'],
      },
    ),
  ],
  providers: [HashAdapter, RandomAdapter],
  exports: [
    ConfigModule,
    LoggerModule,
    MikroOrmModule,
    HashAdapter,
    RandomAdapter,
  ],
})
export class ToolingModule {}
