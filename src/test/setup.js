// Test setup file
import '@testing-library/jest-dom'

// Mock environment variables for tests
Object.defineProperty(import.meta, 'env', {
  value: {
    DEV: false,
    PROD: true
  },
  writable: true
})
