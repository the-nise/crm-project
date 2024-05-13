import { ApiClientsService } from 'src/modules/api-clients/api-clients.service';
import { ExecutionContext } from '@nestjs/common';
import { HeaderAuthGuard } from '../header-auth.guard';
import { ApiClient } from 'src/modules/api-clients/entities/api-client.entity';
import { Reflector } from '@nestjs/core';
import { HashAdapter } from 'src/adapters/hash.adapter';
import { useHashAdapterMock } from 'src/tests/mocks/hash.adapter.mock';

jest.mock('src/modules/api-clients/api-clients.service');

describe('HeaderAuthGuard', () => {
  let guard: HeaderAuthGuard;
  let apiClientsService: jest.Mocked<ApiClientsService>;
  let reflector: jest.Mocked<Reflector>;
  let hashAdapter: jest.Mocked<HashAdapter>;

  beforeEach(() => {
    apiClientsService = {
      findOneByClientId: jest.fn(),
    } as unknown as jest.Mocked<ApiClientsService>;
    reflector = {
      get: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    hashAdapter = useHashAdapterMock();
    guard = new HeaderAuthGuard(reflector, apiClientsService, hashAdapter);
  });

  describe('canActivate', () => {
    let context: jest.Mocked<ExecutionContext>;
    let request: any;

    beforeEach(() => {
      request = {
        headers: {},
      };
      context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(request),
        }),
        getHandler: jest.fn(),
      } as unknown as jest.Mocked<ExecutionContext>;
    });

    it('should throw a BadRequestException if credentials are missing', async () => {
      await expect(guard.canActivate(context)).rejects.toThrow(
        'Missing credentials',
      );
    });

    it('should return false if credentials are invalid', async () => {
      request.headers['x-client-id'] = 'client-id';
      request.headers['x-client-secret'] = 'client-secret';

      apiClientsService.findOneByClientId.mockResolvedValueOnce(
        new ApiClient(),
      );

      hashAdapter.verify.mockResolvedValueOnce(false);

      await expect(guard.canActivate(context)).resolves.toBe(false);
    });

    it('should return true and attach apiClient to request if credentials are valid', async () => {
      request.headers['x-client-id'] = 'client-id';
      request.headers['x-client-secret'] = 'client-secret';

      const apiClient = {
        verifySecret: jest.fn().mockResolvedValueOnce(true),
      } as unknown as ApiClient;

      apiClientsService.findOneByClientId.mockResolvedValueOnce(apiClient);
      hashAdapter.verify.mockResolvedValueOnce(true);

      await expect(guard.canActivate(context)).resolves.toBe(true);
      expect(request.apiClient).toBe(apiClient);
    });

    it('should return false error is thrown', async () => {
      request.headers['x-client-id'] = 'client-id';
      request.headers['x-client-secret'] = 'client-secret';

      apiClientsService.findOneByClientId.mockImplementationOnce(() => {
        throw new Error('test error');
      });

      await expect(guard.canActivate(context)).resolves.toBe(false);
      expect(request.apiClient).toBe(undefined);
    });

    it('Should return true if isPublic is true', async () => {
      reflector.get.mockReturnValueOnce(true);
      await expect(guard.canActivate(context)).resolves.toBe(true);
    });
  });
});
