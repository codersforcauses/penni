# django-nextjs-template

Django + Nextjs Template: Standardised CFC Tech Stack

## Get started

0. Activate the dev container in VSCode
1. Start the db, server and client with `docker compose up`
2. Server is at `localhost:8000`, client at `localhost:3000`

## Server

### Create and run migrations

If the models are updated, be sure to create a migration:

```bash
docker container exec server python manage.py makemigrations # create a new migration OR
dxc server python manage.py makemigrations
```

## Other

### Get Intellisense

If you're in the dev container, this should be done already. You can run `poetry install` and `npm install` in the correct folders to get the latest dependencies.

### Editing Docker stuff

If you modify anything in the `docker` folder, you need to add the `--build` flag or Docker won't give you the latest changes.

### Custom env vars

Edit the `.env` file in the respective directory (client or server).

### Production

#### [1] Modify client environment parameter

Change the `.env.example` in `./client/.env.example`:

1. `APP_ENV=PRODUCTION`
2. change the file name from `.env.example` to `.env.prod`

#### [2] Modify server environment parameter

Change the `.env.example` in `./server/.env.example`:

1. `API_ALLOWED_HOSTS=".localhost 127.0.0.1 [::1] 170.64.220.156"` and remain the APP_ENV to "DEVELOPMENT"
2. change the file name from `.env.example` to `.env.prod`

#### [3] Modify the URL in `./client/src/lib/api.ts`

Change the value of `LocalBaseURL` from "http://localhost:8000/api" to "http://170.64.220.156:8000/api"

```bash
-- const LocalBaseURL = "http://localhost:8000/api";
++ const LocalBaseURL = "http://170.64.220.156:8000/api";
```

#### [4] Change the `./docker-compose.yml` to production mode:

1. delete `./docker-compose.yml`
2. change the name of file `./docker-compose.prod.yml` to `./docker-compose.yml`

#### [5] Compose up

Run the command below and it will start 3000 port as the frontend port:

```bash
docker compose up
```
