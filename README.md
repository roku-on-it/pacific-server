<p>
  <img src="https://miro.medium.com/max/1130/1*xBW6mryj24q6KYjboM0TZA.png" alt="Nest and gRPC Logo" />
</p>

## Description

A server for password management that uses `gRPC` as main communication protocol.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Further Documentation

### Adding new entities:
- Create an entity module with a model. (user.module.ts`(Module)` user.grpc.service.ts`(gRPC Service)`, user.ts(`Active Model`), etc.)
- Create it's corresponding proto file
- Move proto file to `src/module/misc/app-proto-registry/proto-files` so that proto file registry service register proto definitions.

### Removing entities
- Un-import the module you want to remove from every module you imported.
- Remove the relations of the module you want to remove from other modules, services, models etc.