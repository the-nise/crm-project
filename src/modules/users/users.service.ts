import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashAdapter } from 'src/adapters/hash.adapter';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Permissions } from './entities/permissions.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>,
    @InjectRepository(Permissions)
    private readonly permissionsRepository: EntityRepository<Permissions>,
    private readonly hashAdapter: HashAdapter,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.repository.findOne({ email: createUserDto.email })) {
      throw new BadRequestException('User with same email already exists');
    }
    const hashedPassword = await this.hashAdapter.hash(createUserDto.password);
    const permissions = await this.permissionsRepository.findOne({
      role: createUserDto.role,
    });
    if (!permissions) {
      throw new BadRequestException('Role not found');
    }
    const user = this.repository.create({
      ...createUserDto,
      password: hashedPassword,
      permissions,
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  findAll() {
    return this.repository.findAll();
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = updateUserDto.password
      ? await this.hashAdapter.hash(updateUserDto.password)
      : user.password;

    if (updateUserDto.role !== user.role) {
      const permissions = await this.permissionsRepository.findOne({
        role: updateUserDto.role,
      });
      if (!permissions) {
        throw new BadRequestException('Role not found');
      }
      user.permissions = permissions;
    }

    wrap(user).assign({
      ...updateUserDto,
      password: hashedPassword,
    });
    return this.em.flush();
  }

  async remove(id: string) {
    this.em.remove(this.repository.getReference(id));
    await this.em.flush();
  }
}
