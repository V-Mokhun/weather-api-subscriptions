import { jest } from "@jest/globals";
import { PrismaClient as PrismaClientOriginal } from "@prisma/client";

// Define the mock methods with proper typing
type MockPrismaClient = jest.Mocked<PrismaClientOriginal>;

// Create base mock methods
const createMockModelMethods = () => ({
  findUnique: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  upsert: jest.fn(),
  delete: jest.fn(),
  deleteMany: jest.fn(),
  count: jest.fn(),
});

// Create the mock client with all models
export const prisma = {
  subscription: {
    ...createMockModelMethods(),
    // Add any subscription-specific mock methods here
  },
  weatherCache: {
    ...createMockModelMethods(),
    // Add any weatherCache-specific mock methods here
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn(),
  $use: jest.fn(),
  $on: jest.fn(),
} as unknown as MockPrismaClient;

// Default mock implementations
prisma.subscription.findMany.mockResolvedValue([]);
prisma.subscription.findUnique.mockResolvedValue(null);
prisma.subscription.create.mockResolvedValue({
  id: 1,
  email: "test@example.com",
  city: "London",
  frequency: "DAILY",
  confirmed: true,
  confirmToken: null,
  confirmTokenExpiresAt: null,
  unsubscribeToken: "token",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSentAt: null,
});

prisma.weatherCache.findUnique.mockResolvedValue(null);
prisma.weatherCache.upsert.mockResolvedValue({
  id: 1,
  city: "London",
  temperature: 20,
  humidity: 50,
  description: "Sunny",
  fetchedAt: new Date(),
});

export const PrismaClient = jest.fn(() => prisma);

export * from "@prisma/client";
