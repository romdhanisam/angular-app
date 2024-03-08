// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
globalThis.ngJest = {
    skipNgcc: true
};
/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'jest-preset-angular',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    globalSetup: 'jest-preset-angular/global-setup',
    collectCoverage: false,
    modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/build'],
    setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts'],
    globalTeardown: '<rootDir>/../../teardown.js',
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['clover', 'json', 'lcov', ['text-summary', {skipFull: false}]],
    coverageThreshold: {global: {branches: 50, functions: 50, lines: 50, statements: -10}},
    collectCoverageFrom: [
        '<rootDir>/src/lib/**/*.ts',
        '!<rootDir>/src/lib/**/index.ts',
        '!<rootDir>/src/lib/**/module.ts',
        "!<rootDir>/node_modules/**"
    ],
    testMatch: [
        '<rootDir>/src/lib/**/*.spec.ts'
    ]
};
