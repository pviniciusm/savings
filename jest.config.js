/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  'rootDir': 'src',
  'moduleDirectories': [
    'node_modules',
    '<rootDir>'
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/$1'
  }
};
