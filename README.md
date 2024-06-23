# django-nextjs-template

Django + Nextjs Template: Standardised CFC Tech Stack

## Get started

0. Activate the dev container in VSCode
1. Create a copy of `.env.example` found in the `client` folder and name it `.env`
2. Create a copy of `.env.example` found in the `server` folder and name it `.env`
3. Start the database in the background with `docker compose up -d`
4. `cd server` then run `poetry install`
5. Run `python manage.py migrate` to apply migrations to the database
6. Start the backend with `python manage.py runserver`, you'll also get a popup in VSCode telling you to open it in a browser
7. In a new terminal, `cd client`
8. Install deps, `npm install`
9. Run the frontend `npm run dev`
10. Click the popup that shows in the bottom right of VSCode to open it in a browser

## Server

### Create superuser

To log in to the Django admin dashboard, you'll need to create a superuser with the following command:

```bash
python manage.py createsuperuser
```

### Create and run migrations

If the models are updated, be sure to create a migration:

```bash
python manage.py makemigrations # create a new migration
python manage.py migrate # apply migrations
```
