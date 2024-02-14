import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [".d.ts", ".js"],
  verbose: true,
  testTimeout: 15000,
  setupFiles: [
    "dotenv/config"
  ]
}
export default config