# Storefront Backend

is a backend system that can be used to showcase great product ideas

--------------------------------------------------
**Used Technologies**
Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

--------------------------------------------------
# Usage

## Enviornment
clone `.sample.env` file and rename it to `.env` and fill-in the required env. variables.
## Installation

`docker-compose.yml` contains all the configurations to setup the database and the node app.

run `docker-compose up` 

DB port `5432` (default)
Express app port `3000`

### Manual steps

#### DB
In a terminal, create and run the database:
- switch to the postgres user `su postgres`
- start psql `psql postgres`
in psql run the following:
`CREATE USER shopping_user WITH PASSWORD 'password123';`
`CREATE DATABASE shopping;`
`\c shopping`
`GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
make sure to add the values to the `.env` file
If you want to run the `test script` then you need to repeat the previous steps to create a testing DB with name `shopping_test` and add it to the `.env` file as well
#### Node

**installing packages**
run `yarn`

----------
#### Start

`yarn start`

**API Base URL** http://localhost:3000/

----------
----------
### Development
#### Requirements
----------
npm >= 5
#### Commands

----------
##### Database
run this command to get the database up and running

`yarn db:up`

----------
##### Watch
run development in watch mode to re-run code when there is any change

`yarn watch`

----------
##### Build

`yarn build`

----------

##### Test

`yarn test`

----------

##### lint

`yarn lint`



