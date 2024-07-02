# Generated by Django 5.0.6 on 2024-07-01 04:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Users",
            fields=[
                ("user_id", models.AutoField(primary_key=True, serialize=False)),
                ("email", models.CharField(max_length=255)),
                ("mobile", models.CharField(max_length=20)),
                ("password_hash", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("last_login", models.DateTimeField(blank=True, null=True)),
                ("status", models.CharField(max_length=50)),
            ],
            options={
                "verbose_name_plural": "Users",
            },
        ),
        migrations.CreateModel(
            name="Tasks",
            fields=[
                ("task_id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("location", models.CharField(max_length=255)),
                ("budget", models.DecimalField(decimal_places=2, max_digits=10)),
                ("deadline", models.DateTimeField()),
                ("status", models.CharField(max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "owner_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.users"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Tasks",
            },
        ),
        migrations.CreateModel(
            name="Profiles",
            fields=[
                ("profile_id", models.AutoField(primary_key=True, serialize=False)),
                ("full_name", models.CharField(max_length=255)),
                ("avatar_url", models.CharField(blank=True, max_length=255)),
                ("bio", models.TextField(blank=True)),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.users"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Profiles",
            },
        ),
        migrations.CreateModel(
            name="Payments",
            fields=[
                ("payment_id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("payment_method", models.CharField(max_length=50)),
                ("status", models.CharField(max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "task_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.tasks"
                    ),
                ),
                (
                    "payer_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.users"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Payments",
            },
        ),
        migrations.CreateModel(
            name="Bids",
            fields=[
                ("bid_id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("message", models.TextField(blank=True)),
                ("status", models.CharField(max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "task_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.tasks"
                    ),
                ),
                (
                    "bidder_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.users"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Bids",
            },
        ),
    ]
