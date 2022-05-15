# Game API
This API includes a microservice that implements CRUD for games and publishers.
Also it will also be possible:
- To fetch only the publisher data for a given game (without any publishers dedicated API – i.e. only by
using the game API)
- To trigger a process which will automatically remove the games having a release date older than 18
months and apply a discount of 20% to all games having a release date between 12 and 18 months.

Games request logics are located in  

## 

# Nest.js README

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## License

Nest is [MIT licensed](LICENSE).
