# nestjs

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run build
# development
$ npm run start
```
# watch mode
$ npm run start:dev
```

```bash
# unit tests
$ npm run test
```

## Linting

```bash
$ npm run lint
```

## Formatting

```bash
$ npm run format
```

```bash
npm run build
npm run typeorm migration:run
```


### Connection:

- Host name/address: postgres
- port: 5432
- maintenance database: nestjsDB
- username: postgres
- password: 123456

### Migration
```
npm run typeorm migration:generate -- -n <name>
npm run typeorm migration:create -- -n <name>
npm run typeorm migration:run
npm run typeorm migration:revert
```