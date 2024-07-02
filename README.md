Clone the Repository:

bash

git clone https://github.com/ponez/wallet-service
cd wallet-service

Install Dependencies:

npm install

Set Up Environment Variables:

    Confgire .env variables

Run the Application:

Start the NestJS app:

        npm run start
      
The GraphQL playgroun will be accessible at http://localhost:3000/graphql

Usage
GraphQL API Endpoints

    GraphQL Playground: Use the GraphQL Playground to interact with the API.
        Open your browser and go to http://localhost:3000/graphql (or the respective port).
        Use the provided schema and auto-generated documentation to explore available queries, mutations, and types.

Running Tests

Unit Tests: Execute unit tests for individual components:
Ensure all unit tests pass to verify the functionality of isolated components.


```
yarn test
```
or 
```
npm run test
```

  

End-to-End (e2e) Tests: Perform comprehensive tests across the entire GraphQL API:


```
yarn test:e2e
```
or 
```
npm run test:e2e
```

This will run integration tests using Apollo Server integration testing and Supertest to validate API endpoints and interactions.

Project Structure

```
my-nestjs-graphql-project/
├── node_modules/                   # Dependencies installed by npm or yarn
├── src/                            # Main source directory for the application
│   ├── app.module.ts               # Main application module
│   ├── main.ts                     # Entry point for the application
│   ├── user/                       # User feature module
│   │   ├── user.module.ts          # User module definition
│   │   ├── user.service.ts         # User service for business logic
│   │   ├── user.resolver.ts        # GraphQL resolver for user operations
│   │   ├── dto/                    # Data Transfer Objects for user
│   │   │   ├── get-balance.dto.ts  # DTO for getting user balance
│   │   │   ├── update-balance.dto.ts # DTO for updating user balance
│   │   ├── repository/             
│   │   │   ├── user.repository.ts # Repository for user DB logic
│   │   ├── entity/             
│   │   │   ├── user.entity.ts      # Entity Model for user
│   │   ├── test/                   # Unit-test related to user
│   ├── transaction/                # Transaction feature module
│   │   ├── transaction.module.ts   # Transaction module definition
│   │   ├── transaction.service.ts  # Transaction service for business logic
│   │   ├── transaction.resolver.ts # GraphQL resolver for transaction operations
│   │   ├── dto/                    # Data Transfer Objects for transaction
│   │   │   ├── create-transaction.dto.ts # DTO for creating a transaction
│   │   │   ├── daily-totals.dto.ts # DTO for daily totals
│   │   ├── repository/             
│   │   │   ├── transaction.repository.ts # Repository for transaction DB logic
│   │   ├── entity/             
│   │   │   ├── transaction.entity.ts      # Entity Model for transaction
│   │   ├── test/                   # Unit-test related to transaction
|   ├── infrastructure/
|   |   ├── logger/
|   |   |  ├── logger.ts            # Logger interceptor for every request
|   |   ├── typeorm/
|   |   |  ├── typeorm.module.ts    # Typeorm module
|   |   ├── util/
|   |   |  ├── numeric.transformer.ts # Transformer for database responses 
├── test/                           # Directory for end-to-end tests
│   ├── user.e2e-spec.ts            # E2E tests for user feature
│   ├── transaction.e2e-spec.ts     # E2E tests for transaction feature
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── jest.config.js                  # Jest configuration for running tests
├── package.json                    # Project metadata and dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```
