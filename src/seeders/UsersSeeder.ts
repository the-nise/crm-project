import { Role } from '@/constants/roles.enum';
import {
  PermissionKeys,
  Permissions,
} from '@/modules/users/entities/permissions.entity';
import { User } from '@/modules/users/entities/user.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import * as argon2 from 'argon2';

export class UsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const password = await argon2.hash('123456');
    const managerPermissions = em.create(Permissions, {
      value: {
        [PermissionKeys.MANAGE_USERS]: true,
      },
      role: Role.MANAGER,
    });
    const author = em.create(User, {
      firstName: 'Manager',
      lastName: 'Manager',
      email: 'manager@email.com',
      password: password,
      role: Role.MANAGER,
      permissions: managerPermissions.id,
    });

    const userPermissions = em.create(Permissions, {
      value: {
        [PermissionKeys.MANAGE_USERS]: false,
      },
      role: Role.AGENT,
    });

    const agent = em.create(User, {
      firstName: 'Agent',
      lastName: 'Agent',
      email: 'agent@email.com',
      password: password,
      role: Role.AGENT,
      permissions: userPermissions.id,
    });

    await em.persistAndFlush([
      managerPermissions,
      author,
      userPermissions,
      agent,
    ]);
  }
}
