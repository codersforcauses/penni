# This is a draft test before ERM review finished;
# Test CRUD on table Bids and Payments;
# Assume user and task are already created with no problems before testing Bids and Payments.
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from .models import Users, Tasks, Bids, Payments
from datetime import datetime, timedelta


class AuthRegistrationTestCase(TestCase):

    def setUp(self):
        # Create a test user
        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="1234567890",
            password_hash=make_password("secure_password"),
            status="active"
        )

    def test_get_jwt_token(self):
        return
