from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Profiles
from .models import User
from django.urls import reverse


# Stub testing of the db models
class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            mobile='0450000000',
            password_hash='cnjcweinwoicwnwiwciowecwioencw',
            status='pending',
            user_role='cleaner'
        )

        self.usrid = self.user.user_id
        self.created = self.user.created_at
        self.updated = self.user.updated_at
        self.logined = self.user.last_login

    def test_user_creation(self):
        self.assertEqual(self.user.mobile, '0450000000')
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertEqual(self.user.password_hash, 'cnjcweinwoicwnwiwciowecwioencw')
        self.assertEqual(self.user.status, 'pending')
        self.assertEqual(self.user.user_role, 'cleaner')

        alpha_mobile = User(email='testuser@example.com', mobile='0450oooooo', password_hash='cnjcweinwoicwnwiwciowecwioencw', status='pending', user_role='cleaner')
        with self.assertRaises(ValidationError) as cm:
            alpha_mobile.clean()  # This will call the clean method and raise ValidationError if the first name contains numbers
        self.assertEqual(cm.exception.message_dict['mobile'][0], 'Mobile must not contain letters.')

        empty_status = User(email='testuser@example.com', mobile='0450oooooo', password_hash='cnjcweinwoicwnwiwciowecwioencw', user_role='cleaner')
        with self.assertRaises(ValidationError) as cm:
            empty_status.clean()  # This will call the clean method and raise ValidationError if the first name contains numbers
        self.assertEqual(cm.exception.message_dict['status'][0], 'Status must not be empty')

    def test_user_retrieval(self):
        user = User.objects.get(mobile='testuser')
        self.assertEqual(user.email, 'testuser@example.com')

    def test_default_fields(self):
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)
        self.assertTrue(self.user.is_active)

    def test_string_representation(self):
        self.assertEqual(str(self.user), f"User {self.usrid}: email='testuser@example.com', "
                f"mobile=0450000000, "
                f"password_hash=cnjcweinwoicwnwiwciowecwioencw, "
                f"created_at={self.created}, "
                f"updated_at={self.updated}, last_login={self.logined},"
                f"status=pending")

    def test_user_method(self):
        pass


class ProfilesModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            mobile='0450000000',
            password_hash='cnjcweinwoicwnwiwciowecwioencw',
            status='pending',
            user_role='cleaner'
        )

        self.usrid = self.user.user_id
        self.created = self.user.created_at
        self.updated = self.user.updated_at
        self.logined = self.user.last_login

    def test_profiles_creation(self):
        # Create a profile linked to the test user
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        
        # Retrieve the profile from the database
        saved_profile = Profiles.objects.get(profile_id=profile.profile_id)
        
        # Assert that the saved profile matches the created profile
        self.assertEqual(saved_profile.user_id, self.user)
        self.assertEqual(saved_profile.full_name, 'Test User')
        self.assertEqual(saved_profile.avatar_url, 'http://example.com/avatar.jpg')
        self.assertEqual(saved_profile.bio, 'This is a test bio.')

        saved_profile.full_name = "Tim 123"
        saved_profile.save()
        numerical_full_name = Profiles.objects.get(profile_id=profile.profile_id)
        with self.assertRaises(ValidationError) as cm:
            numerical_full_name.clean()  # This will call the clean method and raise ValidationError if the first name contains numbers
        self.assertEqual(cm.exception.message_dict['full_name'][0], 'Full name must not contain numbers.')

        saved_profile.avatar_url = "www.google.com"
        saved_profile.save()
        url_test = Profiles.objects.get(profile_id=profile.profile_id)
        with self.assertRaises(ValidationError) as cm:
            url_test.clean()  # This will call the clean method and raise ValidationError if the first name contains numbers
        self.assertEqual(cm.exception.message_dict['avatar_url'][0], 'Avatar URL must startwith http:// or https://')

    def test_profiles_str_method(self):
        # Create a profile linked to the test user
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        
        # Test the __str__ method of the Profiles model
        self.assertEqual(str(profile), f"Profile {profile.profile_id}: User={profile.user_id}, Full Name={profile.full_name}")
        
    def test_profiles_delete_user_cascade(self):
        # Create a profile linked to the test user
        profile = Profiles.objects.create(
            user_id=self.user,
            full_name='Test User',
            avatar_url='http://example.com/avatar.jpg',
            bio='This is a test bio.'
        )
        
        # Delete the test user
        self.user.delete()
        
        # Query the Profiles to check if the profile is deleted due to CASCADE
        with self.assertRaises(Profiles.DoesNotExist):
            Profiles.objects.get(profile_id=profile.profile_id)

