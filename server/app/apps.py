from django.apps import AppConfig
from django.db.models.signals import post_migrate


class AppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app"

    def ready(self):
        from .fixtures import create_mock_data

        post_migrate.connect(create_mock_data, sender=self)
