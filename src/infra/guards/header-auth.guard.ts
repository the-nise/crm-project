import {
  Injectable,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from '../express/request';
import { Reflector } from '@nestjs/core';
import { ClientsService } from '@/modules/clients/clients.service';
import { HashAdapter } from '@/adapters/hash.adapter';

@Injectable()
export class HeaderAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly clientService: ClientsService,
    private readonly hashAdapter: HashAdapter,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    const req: Request = context.switchToHttp().getRequest();
    const clientId = req.headers['x-client-id'];
    const clientSecret = req.headers['x-client-secret'];

    if (
      !clientId ||
      !clientSecret ||
      Array.isArray(clientId) ||
      Array.isArray(clientSecret)
    ) {
      throw new BadRequestException('Missing credentials');
    }

    try {
      const client = await this.clientService.findOne(clientId);
      if (
        !client ||
        !(await this.hashAdapter.verify(client.secret, clientSecret))
      ) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const Public = () => SetMetadata('isPublic', true);
