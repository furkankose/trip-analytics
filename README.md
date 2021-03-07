# Trip Analytics

## About The Project

### Tech Stack

The project is built with NestJS + MongoDB + Docker.

### Tools

#### ESLint + Prettier + Lintstaged

To preserve coding standards, ESLint and Prettier is used in the project. All the changes that you did in project files are automatically checked,formatted and fixed before committed.

#### husky + commitlint (Conventional Commit)

To ensure that all commit messages meet the [conventional commit format](https://conventionalcommits.org/), commitlint package is used. If the commit message does not follow the conventional commit pattern, the package does not allow you to commit your changes until the commit message meets the requirements.

#### GitHub Actions

GitHub actions is used for creating CI/CD pipelines of the project.

- When a new pull request is opened to be able to merge the new changes into main branch, GitHub Actions runs lint and test steps to ensure that nothing is broken with the new changes
- When the new changes are commited into main branch, GitHub Actions builds the application, runs the tests, and deploys the application if build and test steps completed succesfully.

### Project Structure

#### Error Handlers

There are two types of global error handler; [anyExceptionFilter](/src/filters/anyException.filter.ts) and [httpExceptionFilter](/src/filters/httpException.filter.ts).

HttpExceptionFilter is responsible from catching the HTTP exceptions that are throwed in controller and service layers. The other error handler, AnyExceptionFilter, is responsible from catching all the other application level exceptions. If there will be a need for handling exceptions more spesifically in function level, local exception handlers can be added inside of the functions.

#### Request Validation

The ValidationPipe provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in local class/DTO declarations in each module. It uses class-validator and class-transformer packages.

## Running the app with Docker

```bash
$  docker-compose up --build production
```

## Running the app without Docker

1.  Create .env file by cloning the [.env.sample](.env.sample)

```bash
$ cp .env.sample .env
```

2.  Fill the .env file with corresponding variables

3.  Install packages

```bash
$ yarn install
```

4. Run the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running tests with Docker

```bash
# unit and integration tests
$ docker-compose run test

# test coverage
$ docker-compose run test yarn test:cov
```

## Running tests without Docker

1.  Create .env file by cloning the [.env.sample](.env.sample)

```bash
$ cp .env.sample .env
```

2.  Fill the .env file with corresponding variables

3.  Run the tests

```bash
# unit and integration tests
$ yarn test

# test coverage
$ yarn test:cov
```

## API Doc

You can access the API documentation (Swagger UI) by entering base URL of the API (http://localhost:3000)

## License

[MIT](LICENSE)
