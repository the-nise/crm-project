import { PinoLogger } from 'nestjs-pino';

export function useMockLogger(): jest.Mocked<Partial<PinoLogger>> {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
}
