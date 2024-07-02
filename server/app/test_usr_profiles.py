from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import User, Profiles


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            mobile='0450000000',
            password_hash='cnjcweinwoicwnwiwciowec',
            status='pending',
            user_role='cleaner'
        )

    def tearDown(self):
        self.user.delete()

    def test_user_creation(self):
        self.assertEqual(self.user.mobile, '0450000000')
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertEqual(self.user.password_hash, 'cnjcweinwoicwnwiwciowec')
        self.assertEqual(self.user.status, 'pending')
        self.assertEqual(self.user.user_role, 'cleaner')

        alpha_mobile = User(
            email='testuser2@example.com',
            mobile='0450oooooo',
            password_hash='cnjcweinwoicwnwiwciowec',
            status='pending',
            user_role='cleaner'
        )
        with self.assertRaises(ValidationError) as cm:
            alpha_mobile.full_clean()
        self.assertEqual(cm.exception.message_dict['mobile'][0], 'Mobile must not contain letters.')

        empty_status = User(
            email='testuser3@example.com',
            mobile='0450000000',
            password_hash='cnjcweinwoicwnwiwciowec',
            user_role='cleaner'
        )
        with self.assertRaises(ValidationError) as cm:
            empty_status.full_clean()
        self.assertEqual(cm.exception.message_dict['status'][0], 'Status must not be empty')

    def test_user_retrieval(self):
        user = User.objects.get(mobile='0450000000')
        self.assertEqual(user.email, 'testuser@example.com')

    def test_default_fields(self):
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)
        self.assertTrue(self.user.is_active)

    def test_string_representation(self):
        self.assertEqual(
            str(self.user),
            f"User {self.user.user_id}: email='testuser@example.com', "
            f"mobile=0450000000, "
            f"password_hash=cnjcweinwoicwnwiwciowecwioencw, "
            f"created_at={self.user.created_at}, "
            f"updated_at={self.user.updated_at},"
            f"last_login={self.user.last_login},"
            f"status=pending"
        )

    def test_user_method(self):
        pass


class ProfilesModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            mobile='0450000000',
            password_hash='cnjcweinwoicwnwiwciowec',
            status='pending',
            user_role='cleaner'
        )

    def tearDown(self):
        self.user.delete()

    def test_profiles_creation(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        saved_profile = Profiles.objects.get(profile_id=profile.profile_id)
        self.assertEqual(saved_profile.user_id, self.user)
        self.assertEqual(saved_profile.full_name, 'Test User')
        self.assertEqual(saved_profile.avatar_url, 'http://example.com/avatar.jpg')
        self.assertEqual(saved_profile.bio, 'This is a test bio.')

        saved_profile.full_name = "Tim 123"
        with self.assertRaises(ValidationError) as cm:
            saved_profile.full_clean()
        self.assertEqual(cm.exception.message_dict['full_name'][0], 'Full name must not contain numbers.')

        saved_profile.avatar_url = "www.google.com"
        with self.assertRaises(ValidationError) as cm:
            saved_profile.full_clean()
        self.assertEqual(cm.exception.message_dict['avatar_url'][0], 'Avatar URL must start with http:// or https://')

    def test_profiles_str_method(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        self.assertEqual(str(profile), f"Profile {profile.profile_id}: User={profile.user_id}, Full Name={profile.full_name}")

    def test_profiles_delete_user_cascade(self):
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        self.user.delete()
        with self.assertRaises(Profiles.DoesNotExist):
            Profiles.objects.get(profile_id=profile.profile_id)
