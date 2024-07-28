from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Users
from django.contrib.auth.hashers import make_password
# from django.core.files.uploadedfile import SimpleUploadedFile


class UsersModelTest(TestCase):
    def setUp(self):
        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="0450000000",
            is_poster=True,
        )
        self.user.set_password("secure_password")
        self.user.save()

    def tearDown(self):
        self.user.delete()

    def test_user_creation(self):
        self.assertEqual(self.user.mobile, "0450000000")
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("secure_password"))
        self.assertEqual(self.user.is_poster, True)

        alpha_mobile = Users(
            email="testuser2@example.com",
            mobile="0450oooooo",
            password="secure_password",
            is_bidder=True,

        )
        with self.assertRaises(ValidationError) as cm:
            alpha_mobile.full_clean()
        self.assertEqual(
            cm.exception.message_dict["mobile"][0],
            "Mobile must contain only digits."
        )

        empty_status = Users(
            email="testuser3@example.com",
            mobile="0450000oo0",
            password=make_password("secure_password"),
        )
        with self.assertRaises(ValidationError) as cm:
            empty_status.full_clean()
            self.assertEqual(
                cm.exception.message_dict["status"][0], "This field cannot be blank."
            )

    def test_user_retrieval(self):
        user = Users.objects.get(mobile="0450000000")
        self.assertEqual(user.email, "testuser@example.com")

    def test_default_fields(self):
        # self.assertFalse(self.user.is_staff)
        # self.assertFalse(self.user.is_superuser)
        self.assertTrue(self.user.is_active)

    def test_string_representation(self):
        self.assertEqual(
            str(self.user),
            f"User {self.user.user_id}: email=testuser@example.com, "
            f"mobile=0450000000, "
            f"created_at={self.user.created_at}, "
            f"updated_at={self.user.updated_at}, "
            f"last_login={self.user.last_login}, "
        )
