# django-nextjs-template

Django + Nextjs Template: Standardised CFC Tech Stack

## Get started

0. Activate the dev container in VSCode
1. Create a copy of `.env.example` found in the `client` folder and name it `.env`
2. Create a copy of `.env.example` found in the `server` folder and name it `.env`
3. `docker compose up -d`
4. `cd server` then run `poetry install`
5. Run `python manage.py migrate` to apply migrations to the database
6. Start the backend with `python manage.py runserver`, you'll get a popup in VSCode telling you to open it in a browser (might be `localhost:8001`)
7. In a new terminal, `cd client`
8. Install deps, `npm install`
9. Run the frontend `npm run dev`
10. Click the popup that shows in the bottom right of VSCode to open it in a browser (might be `localhost:3001`)
