import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Roles, RolesGuard } from '../role.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    guard = new RolesGuard(reflector);
  });

  describe('canActivate', () => {
    let context: jest.Mocked<ExecutionContext>;
    let request: any;

    beforeEach(() => {
      request = {
        apiClient: {
          role: 'user',
        },
      };
      context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(request),
        }),
        getHandler: jest.fn(),
      } as unknown as jest.Mocked<ExecutionContext>;
    });

    it('should allow access if no roles are specified on the route handler', () => {
      reflector.get.mockReturnValueOnce(null);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should deny access if the API client role does not match any of the roles specified on the route handler', () => {
      reflector.get.mockReturnValueOnce(['admin']);
      Reflect.decorate([Roles(['admin'])], context.getHandler);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should allow access if the API client role matches one of the roles specified on the route handler', () => {
      reflector.get.mockReturnValueOnce(['user', 'admin']);
      Reflect.decorate([Roles(['user', 'admin'])], context.getHandler);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });
  });
});
