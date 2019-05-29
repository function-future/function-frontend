module.exports = {
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@mock-api(.*)$': '<rootDir>/src/api-mock/',
    '@test/(.*)$': '<rootDir>/test/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  'collectCoverage': true,
  'collectCoverageFrom': [
    'src/**/*.js',
    'src/**/*.vue',
    '!**/node_modules/**'
  ],
  'coverageDirectory': 'test/unit/coverage',
  'coverageReporters': [
    'lcov',
    'text'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}
