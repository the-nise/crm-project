import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: process.env.APP_URL,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const client = await createClient({
    url: process.env.REDIS_URL,
  }).connect();
  const store = new RedisStore({
    client,
  });

  app.use(
    session({
      store: store,
      secret: String(process.env.SESSION_SECRET),
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      name: String(process.env.SESSION_NAME),
      cookie: {
        maxAge: Number(process.env.SESSION_COOKIE_MAX_AGE),
        sameSite: false,
        secure: false,
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Inbounds CRM API')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Users')
    .addTag('Clients')
    .addCookieAuth('session')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  await app.listen(3000);
}
bootstrap();
