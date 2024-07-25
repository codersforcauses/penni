from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Users, Profiles
from django.contrib.auth.hashers import make_password
from django.core.files.uploadedfile import SimpleUploadedFile


class UsersModelTest(TestCase):
    def setUp(self):
        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="0450000000",
            password_hash=make_password("secure_password"),
            status="pending",
            user_role="cleaner",
        )

    def tearDown(self):
        self.user.delete()

    def test_user_creation(self):
        self.assertEqual(self.user.mobile, "0450000000")
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("secure_password"))
        self.assertEqual(self.user.status, "pending")
        self.assertEqual(self.user.user_role, "cleaner")

        alpha_mobile = Users(
            email="testuser2@example.com",
            mobile="0450oooooo",
            password_hash=make_password("secure_password"),
            status="pending",
            user_role="cleaner",
        )
        with self.assertRaises(ValidationError) as cm:
            alpha_mobile.full_clean()
        self.assertEqual(
            cm.exception.message_dict["mobile"][0], "Mobile must contain only digits."
        )

        empty_status = Users(
            email="testuser3@example.com",
            mobile="0450000000",
            password_hash=make_password("secure_password"),
            status="",
            user_role="cleaner",
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
            f"status=pending",
        )

    # def test_user_method(self):
    # pass


class ProfilesModelTest(TestCase):
    def setUp(self):
        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="0450000000",
            password_hash="cnjcweinwoicwnwiwciowec",
            status="pending",
            user_role="cleaner",
        )
        self.avatar = SimpleUploadedFile(
            name="avatar.jpg", content=b"", content_type="image/jpeg"
        )

    def tearDown(self):
        try:
            self.user.delete()
        except ValueError:
            pass

    def test_profiles_creation(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name="Test User",
            avatar_url=self.avatar,
            bio="This is a test bio.",
        )
        saved_profile = Profiles.objects.get(profile_id=profile.profile_id)
        self.assertEqual(saved_profile.user_id, self.user)
        self.assertEqual(saved_profile.full_name, "Test User")
        self.assertEqual(saved_profile.bio, "This is a test bio.")

        profile.delete()

        profile = Profiles.objects.create(
            user_id=self.user,
            full_name="Tim 123",
            avatar_url=self.avatar,
            bio="This is a test bio.",
        )
        saved_profile = Profiles.objects.get(profile_id=profile.profile_id)
        with self.assertRaises(ValidationError) as cm:
            saved_profile.full_clean()
        self.assertEqual(
            cm.exception.message_dict["full_name"][0],
            "Full name must not contain numbers.",
        )

        profile = Profiles.objects.create(
            user_id=self.user,
            full_name="Test User",
            avatar_url=SimpleUploadedFile(
                name="avatar.jpg", content=b"", content_type="image/jpeg"
            ),
            bio="This is a test bio.",
        )
        saved_profile = Profiles.objects.get(profile_id=profile.profile_id)

    def test_profiles_str_method(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name="Test User",
            avatar_url=self.avatar,
            bio="This is a test bio.",
        )
        self.assertEqual(
            str(profile),
            f"Profile {profile.profile_id}: user_id={profile.user_id}, "
            f"full_name={profile.full_name}, "
            f"avatar_url={profile.avatar_url}, bio={profile.bio}",
        )

    def test_profiles_delete_user_cascade(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name="Test User",
            avatar_url=self.avatar,
            bio="This is a test bio.",
        )
        self.user.delete()
        with self.assertRaises(Profiles.DoesNotExist):
            Profiles.objects.get(profile_id=profile.profile_id)
