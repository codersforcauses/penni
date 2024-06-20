# django-nextjs-template

Django + Nextjs Template: Standardised CFC Tech Stack

## Get started

0. Activate the dev container in VSCode
1. Create a copy of `.env.example` found in the `client` folder and name it `.env`
2. Create a copy of `.env.example` found in the `server` folder and name it `.env`
3. Start the database with `docker compose up -d`
4. `cd server` then run `poetry install`
5. Run `sudo chmod +x dev.sh`
6. Run `python manage.py migrate` to apply migrations to the database
7. Start the backend with `./dev.sh`, you'll get a popup in VSCode telling you to open it in a browser (might be `localhost:8001`)
8. In a new terminal, `cd client`
9. Install deps, `npm install`
10. Run the frontend `npm run dev`
11. Click the popup that shows in the bottom right of VSCode to open it in a browser (might be `localhost:3001`)
