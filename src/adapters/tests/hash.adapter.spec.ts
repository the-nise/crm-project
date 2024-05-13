import * as argon2 from 'argon2';
import { HashAdapter } from '../hash.adapter';

jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn(),
}));

describe('HashAdapter', () => {
  let hashAdapter: HashAdapter;

  beforeEach(() => {
    hashAdapter = new HashAdapter();
  });
  describe('hash', () => {
    it('should call argon2.hash with the correct arguments', async () => {
      const data = 'my-plain-password';
      const hashedData = 'hashed-data';

      (argon2.hash as jest.Mock).mockResolvedValueOnce(hashedData);

      const result = await hashAdapter.hash(data);

      expect(argon2.hash).toHaveBeenCalledWith(data);
      expect(result).toEqual(hashedData);
    });
  });

  describe('verify', () => {
    it('should call argon2.verify with the correct arguments', async () => {
      const data = 'my-plain-password';
      const hashedData = 'hashed-data';

      (argon2.verify as jest.Mock).mockResolvedValueOnce(true);

      const result = await hashAdapter.verify(hashedData, data);

      expect(argon2.verify).toHaveBeenCalledWith(hashedData, data);
      expect(result).toEqual(true);
    });
  });
});
