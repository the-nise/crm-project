## Description

Inbounds CRM App

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# watch tests
$ yarn test:watch

# test coverage
$ yarn test:cov

# debug tests
$ yarn test:debug

# integration tests
$ yarn test:it

# unit tests
$ yarn test:unit

# generate test data
$ yarn test:generate
```

## Database Schema Update and Migrations

WARNING: This may cause data loss, do not use in production

Reference [Mikro-ORM Schema Generator](https://mikro-orm.io/docs/schema-generator)

```bash
# sync db schema with entities
$ yarn db-schema:update
```

Reference [Mikro-ORM Migrations](https://mikro-orm.io/docs/migrations)

```bash
# create new migration
$ db-migration:create

# run migrations
$ db-migration:up

# rollback migrations
$ db-migration:down
```

## Seeding the Database

Reference [Mikro-ORM Db Seeding](https://mikro-orm.io/docs/seeding)

```bash
# create seed
$ yarn db-seed:create

# run seeds
$ yarn db-seed:run
```

## Documentation Generation

Reference: [Redoc](https://redocly.com/)

```bash
# generate API documentation
$ yarn api-doc:generate
```

Reference: [Open Api Code Generator](https://openapi-generator.tech/)

```bash
# generate API client
$ yarn api-client:generate
```

## Formatting and Linting

```bash
# format code
$ yarn format

# lint code
$ yarn lint
```

## Build

Backend

```bash
$ yarn build
```

Frontend

```bash
$ cd frontend
$ yarn build
```

## Production

Api docs are served statically from

```
/api/docs
```

Frontend is served statically in SPA mode from

```
/
```

Api is served from routes

```
/api/*
```

## Development

Running backend

```bash
$ yarn start:dev
```

Running frontend

```bash
$ cd frontend
$ yarn dev
```

## Evn variables

Backend

```
SESSION_SECRET=secret
SESSION_COOKIE_MAX_AGE=360000000
SESSION_RESAVE=false
SESSION_SAVE_UNINITIALIZED=false
SESSION_NAME=crm-session

PRETTY_LOGS=true
MYSQL_HOST=localhost
MYSQL_ROOT_PASSWORD=changeme
MYSQL_DATABASE=crm-db
MYSQL_USER=admin
MYSQL_PASSWORD=changeme
MYSQL_PORT=3306

REDIS_URL=redis://localhost:6379
REDIS_USERNAME=redis
REDIS_PASSWORD=changeme
```

Frontend

```
VITE_BE_BASE_URL=http://localhost:3000/api
```
