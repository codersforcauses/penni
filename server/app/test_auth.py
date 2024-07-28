# from django.test import TestCase
# from django.urls import reverse
# from rest_framework.test import APIClient


# class AuthRegistrationTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()

#     def test_get_jwt_token(self):
#         return

#     def test_registration_success(self):
#         valid_data = {
#             "username": "test_user",
#             "password": "test_password",
#             "email": "test@example.com",
#         }
#         url = reverse("register")
#         response = self.client.post(url, data=valid_data)
#         self.assertEqual(response.status_code, 201)  # create user successfully

#     def test_registration_invalid_data(self):
#         invalid_data = {
#             "username": "",
#             "password": "test_password",
#             "email": "test@example.com",
#         }
#         try:
#             url = reverse("register")
#             response = self.client.post(url, data=invalid_data)
#             self.assertEqual(response.status_code, 400)
#         except Exception as e:
#             print(f"An exception occurred: {e}")

#     def test_login_success(self):
#         valid_data = {
#             "username": "test_user",
#             "password": "test_password",
#             "email": "test@example.com",
#         }
#         response = self.client.post(reverse("register"), data=valid_data)

#         # valid password
#         data = {
#             "username": "test_user",
#             "password": "test_password",
#         }
#         response = self.client.post(reverse("get-jwt-token"), data)
#         self.assertEqual(response.status_code, 200)

#     def test_login_failure(self):
#         # invalid password
#         data = {
#             "username": "test_user",
#             "password": "test_password_wrong",
#         }
#         response = self.client.post(reverse("get-jwt-token"), data)
#         self.assertEqual(response.status_code, 400)
