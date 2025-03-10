# bank-api

A company and transfers management API

## TL;DR

Run `docker-compose up -d`.
**(You will need to have `docker` and `docker-compose` installed on your machine)**

## Environment Variables

To run this project, you will need to add the following environment variables to
your .env file. Check `.env.example` for an example.

| Parameter | Type     | Description                                                                                      |
| :-------- | :------- | :----------------------------------------------------------------------------------------------- |
| `PORT`    | `number` | **Optional**. Port to run server, default to `3000`                                              |
| `PG_URL`  | `string` | **Optional**. Database host url. you can choose to use your own database or the default database |

## Run With Docker

Clone the project

**SSH**

```bash
  git clone git@github.com:LeandroBustos/bank-api.git
```

**HTTP**

```bash
  git clone https://github.com/LeandroBustos/bank-api.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  docker-compose up -d
```

## Run Locally

Clone the project

**SSH**

```bash
  git clone git@github.com:LeandroBustos/bank-api.git
```

**HTTP**

```bash
  git clone https://github.com/LeandroBustos/bank-api.git
```

Go to the project directory

```bash
  cd my-project
```

Set Node Version To 22.14.0

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

### Company routes

#### Create company

```http
  POST /companies
```

#### body JSON

```http
{
	"cuit": string!,
	"razon_social": string!,
}
```

#### Example

```http
{
	"cuit": "00-00000000-0",
	"razon_social": "Company SRL",
}
```

#### Get Adhesions Last Month

```http
  GET /companies/adhesions-last-month
```

#### Response example

```http
{
	"id": number,
	"cuit": string,
	"razon_social": string,
	"adhesion_date": string,
}
```

#### Get Transfers Last Month

```http
  GET /companies/transfers-last-month
```

#### Response example

```http
{
	"id": number,
	"cuit": string,
	"razon_social": string,
	"adhesion_date": string,
}
```

### Transfer routes

#### Create Transfer

```http
  POST /transfers
```

#### body JSON

```http
{
	"company_id": number!,
	"amount": number!,
	"debit_account": string!,
	"credit_account": string!
}
```

#### Example

```http
{
	"company_id": 1,
	"amount": 111.11,
	"debit_account": "test",
	"credit_account": "test"
}
```

## Tech Stack

**Server:** NodeJS, Express, JavaScript, PostgreSQL, Jest

**Architecture**: Hexagonal Architecture + Vertical Slicing + Screaming Architecture
