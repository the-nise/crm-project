import { PinoLogger } from 'nestjs-pino';
import { useMockLogger } from '../../mocks/logger.mock';
import { HashAdapter } from 'src/adapters/hash.adapter';
import { useHashAdapterMock } from 'src/tests/mocks/hash.adapter.mock';

export function useUnitTestModule() {
  return {
    module: class MockModule {},
    global: true,
    providers: [
      { provide: PinoLogger, useValue: useMockLogger() },
      {
        provide: HashAdapter,
        useValue: useHashAdapterMock(),
      },
    ],
    exports: [PinoLogger, HashAdapter],
  };
}
