module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['src', 'tests'],
    testRegex: '\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    coverageDirectory: './coverage/',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts'
    ],
    testEnvironment: 'node'
}