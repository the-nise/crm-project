import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  migrations: {
    snapshot: true,
  },
  extensions: [SeedManager, Migrator],
});
