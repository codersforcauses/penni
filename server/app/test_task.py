from django.test import TestCase
from django.utils import timezone
from .models import User, Task
from django.core.exceptions import ValidationError


class TaskModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            email="testuser@example.com",
            mobile="1234567890",
            password_hash="password123",
            status="active"
        )
        self.task = Task.objects.create(
            owner_id=self.user,
            title="Test Task",
            category="General",
            description="This is a test task",
            location="Test Location",
            estimated_price="100",
            estimated_time="100",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )

    def test_task_creation(self):
        self.assertIsInstance(self.task, Task)
        self.assertEqual(self.task.owner_id.email, "testuser@example.com")
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.category, "General")
        self.assertEqual(self.task.description, "This is a test task")
        self.assertEqual(self.task.location, "Test Location")
        self.assertEqual(self.task.estimated_price, "100")
        self.assertEqual(self.task.estimated_time, "2 hours")
        self.assertEqual(self.task.status, "open")

    def test_task_str(self):
        self.assertEqual(str(self.task), self.task.title)

    def test_task_default_values(self):
        task = Task.objects.create(
            owner_id=self.user,
            title="Task with Defaults",
            description="Task description",
            location="Default Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        self.assertEqual(task.category, "")
        self.assertEqual(task.estimated_price, "")
        self.assertEqual(task.estimated_time, "")

    def test_task_update(self):
        self.task.title = "Updated Task Title"
        self.task.save()
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Updated Task Title")

    def test_task_deletion(self):
        task_id = self.task.task_id
        self.task.delete()
        with self.assertRaises(Task.DoesNotExist):
            Task.objects.get(task_id=task_id)

    def test_task_invalid_deadline(self):
        with self.assertRaises(ValidationError):
            Task.objects.create(
                owner_id=self.user,
                title="Invalid Deadline Task",
                description="This task has an invalid deadline",
                location="Invalid Location",
                estimated_price="100",
                estimated_time="2 hours",
                deadline=timezone.now() - timezone.timedelta(days=1),
                status="open"
            )

    def test_task_deadline_future(self):
        task = Task.objects.create(
            owner_id=self.user,
            title="Future Deadline Task",
            description="This task has a future deadline",
            location="Future Location",
            estimated_price="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=2),
            status="open"
        )
        self.assertGreater(task.deadline, timezone.now())

    def test_task_status_choices(self):
        valid_statuses = ["open", "in_progress", "completed", "cancelled"]
        for status in valid_statuses:
            task = Task.objects.create(
                owner_id=self.user,
                title=f"Task with {status} status",
                description="Task description",
                location="Location",
                estimated_price="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status=status
            )
            self.assertEqual(task.status, status)

        with self.assertRaises(ValidationError):
            task = Task.objects.create(
                owner_id=self.user,
                title="Invalid Status Task",
                description="Task with invalid status",
                location="Location",
                estimated_price="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="invalid_status"
            )
            task.full_clean()

    def test_task_location_not_empty(self):
        with self.assertRaises(ValidationError):
            Task.objects.create(
                owner_id=self.user,
                title="No Location Task",
                description="This task has no location",
                location="",
                estimated_price="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="open"
            ).full_clean()

    def test_task_long_title(self):
        long_title = 'T' * 256
        with self.assertRaises(ValidationError):
            Task.objects.create(
                owner_id=self.user,
                title=long_title,
                description="This task has a very long title",
                location="Location",
                estimated_price="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="open"
            ).full_clean()

    def test_task_without_estimated_fields(self):
        task = Task.objects.create(
            owner_id=self.user,
            title="No Estimated Fields Task",
            description="This task has no estimated price or time",
            location="Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        self.assertEqual(task.estimated_price, "")
        self.assertEqual(task.estimated_time, "")

    def test_task_creation_timestamp(self):
        self.assertIsNotNone(self.task.created_at)
        self.assertIsInstance(self.task.created_at, timezone.datetime)

    def test_task_update_timestamp(self):
        old_updated_at = self.task.updated_at
        self.task.title = "New Title"
        self.task.save()
        self.task.refresh_from_db()
        self.assertGreater(self.task.updated_at, old_updated_at)

    def test_task_owner_deletion_cascade(self):
        user = User.objects.create(
            email="testuser2@example.com",
            mobile="0987654321",
            password_hash="password123",
            status="active"
        )
        task = Task.objects.create(
            owner_id=user,
            title="Task to be deleted with owner",
            description="Description",
            location="Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        user.delete()
        with self.assertRaises(Task.DoesNotExist):
            Task.objects.get(task_id=task.task_id)

    def test_task_bulk_create(self):
        tasks = [
            Task(
                owner_id=self.user,
                title=f"Task {i}",
                description=f"Description {i}",
                location="Location",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="open"
            )
            for i in range(5)
        ]
        Task.objects.bulk_create(tasks)
        self.assertEqual(Task.objects.count(), 6)

    def test_task_filtering(self):
        Task.objects.create(
            owner_id=self.user,
            title="Task for Filtering",
            description="This task is for filtering",
            location="Filtering Location",
            estimated_price="200",
            estimated_time="3 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        open_tasks = Task.objects.filter(status="open")
        self.assertEqual(open_tasks.count(), Task.objects.count())

    def test_task_ordering(self):
        task1 = Task.objects.create(
            owner_id=self.user,
            title="Earlier Task",
            description="This task was created earlier",
            location="Location",
            estimated_price="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open",
            created_at=timezone.now() - timezone.timedelta(days=2)
        )
        task2 = Task.objects.create(
            owner_id=self.user,
            title="Later Task",
            description="This task was created later",
            location="Location",
            estimated_price="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open",
            created_at=timezone.now() - timezone.timedelta(days=1)
        )
        tasks = Task.objects.all().order_by('created_at')
        self.assertEqual(tasks[0], task1)
        self.assertEqual(tasks[1], task2)
