import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { UuidAdapter } from '../uuid.adapter';

jest.mock('uuid');

describe('UuidAdapter', () => {
  let uuidAdapter: UuidAdapter;
  let v4Mock: jest.Mock;

  beforeEach(async () => {
    v4Mock = v4 as jest.Mock;
    v4Mock.mockReturnValue('mock-uuid-1234'); // Mock a UUID value for testing

    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidAdapter],
    }).compile();

    uuidAdapter = module.get<UuidAdapter>(UuidAdapter);
  });

  it('should return a UUID when generate is called', () => {
    const result = uuidAdapter.generate();

    expect(v4).toHaveBeenCalledTimes(1); // Ensure v4 from uuid was called
    expect(result).toBe('mock-uuid-1234'); // Ensure our mock value was returned
  });
});
