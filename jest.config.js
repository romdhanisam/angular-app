// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { paths } = require('./tsconfig.json').compilerOptions;

// eslint-disable-next-line no-undef
globalThis.ngJest = {
    skipNgcc: true
};

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'jest-preset-angular',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    globalSetup: 'jest-preset-angular/global-setup',
    moduleNameMapper: {...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' })},
    modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/build'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalTeardown: '<rootDir>/teardown.js',
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['clover', 'json', 'lcov', ['text-summary', {skipFull: false}]],
    coverageThreshold: {global: {branches: 50, functions: 50, lines: 50, statements: -10}},
    collectCoverageFrom: [
        '<rootDir>/src/app/**/*.ts',
        '!<rootDir>/src/app/**/index.ts',
        '!<rootDir>/src/app/**/module.ts',
        "!<rootDir>/node_modules/**"
    ],
    testMatch: [
        '<rootDir>/src/app/**/*.spec.ts'
    ]
};
