# app/test_task_views.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Users, Tasks


class TaskViewSetTestCase(APITestCase):

    def setUp(self):
        self.user = Users.objects.create(
            email='user@example.com',
            mobile='1234567890',
            password_hash='password123',
            status='active'
        )
        self.user.set_password('password123')
        self.user.save()
        self.task = Tasks.objects.create(
            owner_id=self.user,
            title="Clean my house",
            description="Need cleaning services for 3-room apartment",
            location="New York, NY",
            budget="100.00",
            deadline="2024-12-31T00:00:00Z",
            status="open"
        )

    def test_create_task(self):
        """
        Ensure we can create a new task.
        """
        url = reverse('tasks-post-task')
        data = {
            "owner_id": self.user.user_id,
            "title": "Clean my house",
            "description": "Need cleaning services for 3-room apartment",
            "location": "New York, NY",
            "budget": "100",
            "deadline": "2024-12-31T00:00:00Z",
            "status": "open"
        }
        response = self.client.post(url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'success')
        self.assertEqual(response.data['message'], 'Task created successfully.')

    def test_create_task_invalid_budget(self):
        """
        Ensure task creation fails with invalid budget.
        """
        url = reverse('tasks-list')
        data = {
            "title": "Clean my house",
            "description": "Need cleaning services for 3-room apartment",
            "location": "New York, NY",
            "budget": "-100",
            "deadline": "2024-12-31T00:00:00Z",
            "status": "open"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_task_past_deadline(self):
        """
        Ensure task creation fails with a deadline in the past.
        """
        url = reverse('tasks-list')
        data = {
            "title": "Clean my house",
            "description": "Need cleaning services for 3-room apartment",
            "location": "New York, NY",
            "budget": "100",
            "deadline": "2022-12-31T00:00:00Z",
            "status": "open"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_tasks(self):
        """
        Ensure we can fetch all tasks.
        """
        Tasks.objects.create(
            owner_id=self.user,
            title="Clean my house",
            description="Need cleaning services",
            location="New York, NY",
            budget="100",
            deadline="2024-12-31T00:00:00Z",
            status="open"
        )
        url = reverse('tasks-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_update_task(self):
        """
        Ensure we can update a task.
        """
        url = reverse('tasks-detail', args=[self.task.task_id])
        data = {
            "owner_id": self.user.user_id,
            "title": "Clean my apartment",
            "description": "Need cleaning services for 2-room apartment",
            "location": "Los Angeles, CA",
            "budget": "150.00",
            "deadline": "2024-11-30T00:00:00Z",
            "status": "in progress"
        }
        response = self.client.put(url, data, format='json')
        # print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, data['title'])
        self.assertEqual(self.task.description, data['description'])
