# Weather Subscription Service

A Node.js application that provides weather updates for subscribed users. The service allows users to subscribe to weather updates for their chosen cities and receive updates at their preferred frequency (hourly or daily).

## Live Demo

- Frontend: [https://website-w2h4.onrender.com](https://website-w2h4.onrender.com)
- API: [https://software-school-genesis.onrender.com](https://software-school-genesis.onrender.com)

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Cache & Queue**: Redis with BullMQ for job scheduling
- **Email Service**: SendGrid
- **Testing**: Jest with Supertest
- **Type Safety**: TypeScript
- **API Validation**: Zod
- **Containerization**: Docker & Docker Compose

## Project Structure

```
backend/
├── src/
│   ├── __tests__/        # Unit and integration tests
│   ├── config/           # Environment and configuration setup
│   ├── db/              # Database client and utilities
│   ├── lib/             # Core libraries and utilities
│   │   ├── email/       # Email service implementation
│   │   ├── queue/       # Queue management with BullMQ
│   │   └── weather/     # Weather service implementation
│   ├── modules/         # Feature modules
│   │   ├── subscription/# Subscription management
│   │   └── weather/     # Weather endpoints
│   └── index.ts         # Application entry point
├── prisma/              # Database schema and migrations
```

## Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Configure the following environment variables:

- `SENDGRID_API_KEY`: SendGrid API key
- `SENDGRID_FROM_EMAIL`: SendGrid from email
- `WEATHER_API_KEY`: WeatherAPI.com API key

## Running with Docker

### Development

```bash
# Build containers
pnpm run docker:build:dev

# Start services
pnpm run docker:run:dev
```

### Production

```bash
# Build containers
pnpm run docker:build

# Start services
pnpm run docker:run
```

## Local Development

### Database Setup

Run migrations without Docker:

```bash
# Development environment
pnpm run db:migrate-local:dev

# Production environment
pnpm run db:migrate-local
```

### Starting the Application

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm run db:generate

# Start development server
pnpm run dev
```

## Testing

The project includes both unit and integration tests. Run them with:

```bash
pnpm run test
```
