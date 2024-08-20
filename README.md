# django-nextjs-template

Django + Nextjs Template: Standardised CFC Tech Stack

## Get started

0. Activate the dev container in VSCode
1. In the `client` folder, run `npm run dev` to start the frontend on port at `localhost:3000`
2. In the `server` folder, run `python manage.py runserver` to start the server at `localhost:8000`

## Server

### Create and run migrations

If the models are updated, be sure to create a migration:

```bash
python manage.py makemigrations # create migration
python manage.py migrate # apply migrations
```

### Nuke the DB

If you run into migration conflicts that you can't be bothered to fix, run `nuke.sh` to clear your database. Then, run migrations again.

## Other

### Update Dependencies

You can run `npm install` and `poetry install` in the respective `client` and `server` folders to install the newest dependencies.

### Editing Docker stuff

If you modify anything in the `docker` folder, you need to add the `--build` flag or Docker won't give you the latest changes.

### Changing env vars

Edit the `.env` file in the respective directory (client or server).
