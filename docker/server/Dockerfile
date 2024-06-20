FROM python:3.12-slim

RUN apt-get update && apt-get install --yes --no-install-recommends postgresql-client g++ libssl-dev && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && pip install poetry

RUN poetry config virtualenvs.in-project false
RUN poetry config virtualenvs.create false

WORKDIR /app

COPY ./docker/server/entrypoint.sh /entrypoint.sh

COPY ./server/pyproject.toml ./server/poetry.lock ./

RUN poetry install

COPY ./server ./

RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]