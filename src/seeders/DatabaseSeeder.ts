import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UsersSeeder } from './UsersSeeder';

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [UsersSeeder]);
  }
}
