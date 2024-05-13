import { PinoLogger } from 'nestjs-pino';
import { LogDecorator } from '../execution-logger.decorator';

jest.mock('nestjs-pino', () => ({
  PinoLogger: jest.fn().mockImplementation(() => ({
    info: jest.fn(),
  })),
}));

describe('LogDecorator', () => {
  describe('LogCall', () => {
    it('should throw an error if logger is not available on the instance', async () => {
      class SomeService {
        @LogDecorator.LogCall()
        async someMethod() {
          // ...
        }
      }

      const service = new SomeService();

      await expect(service.someMethod()).rejects.toThrow(
        'CustomLogger is not available on the instance.',
      );
    });

    it('should log method call, method return, and method error', async () => {
      const loggerMock = new PinoLogger({});

      class SomeService {
        logger = loggerMock;

        @LogDecorator.LogCall()
        async someMethod(shouldThrow: boolean) {
          if (shouldThrow) {
            throw new Error('Some error');
          }
          return 'some result';
        }
      }

      const service = new SomeService();

      // Test method call and method return logging
      await service.someMethod(false);
      expect(loggerMock.info).toHaveBeenCalledWith(
        'Method call: SomeService.someMethod',
      );
      expect(loggerMock.info).toHaveBeenCalledWith(
        'Method return: SomeService.someMethod',
      );

      // Test method error logging
      await expect(service.someMethod(true)).rejects.toThrow('Some error');
      expect(loggerMock.info).toHaveBeenCalledWith(
        'Method error: SomeService.someMethod: Some error',
      );
    });
  });
});
