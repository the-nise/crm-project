module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts', // Include all JavaScript and TypeScript files
    '!**/migrations/**', // Exclude all files in the migration folder
    '!**/*.entity.ts', // Exclude all entity files
    '!**/*.enum.ts',
    '!**/*.module.ts',
    '!**/*.dto.ts',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', __dirname],
};
