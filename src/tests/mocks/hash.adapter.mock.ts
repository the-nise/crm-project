export function useHashAdapterMock() {
  return {
    hash: jest.fn().mockResolvedValue('hashed-secret'),
    verify: jest.fn().mockResolvedValue(true),
  };
}
