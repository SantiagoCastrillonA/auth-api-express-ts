import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Configuración global para pruebas
global.console.log = jest.fn();
global.console.error = jest.fn();

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};
