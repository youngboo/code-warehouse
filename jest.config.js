module.exports = {
  testMatch: ['<rootDir>/test/**/*.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.{js}',
    '!**/node_modules/**'
  ]
}
