import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testEnvironment: "jsdom",
};

export default createJestConfig(config);