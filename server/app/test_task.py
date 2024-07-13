from django.test import TestCase
from django.utils import timezone
from .models import Users, Tasks
from django.core.exceptions import ValidationError
import time


class TaskModelTests(TestCase):

    def setUp(self):
        Tasks.objects.all().delete()

        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="1234567890",
            password_hash="password123",
            status="active"
        )
        self.task = Tasks.objects.create(
            owner_id=self.user,
            title="Test Task",
            category="General",
            description="This is a test task",
            location="Test Location",
            budget="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )

    def test_task_creation(self):
        self.assertIsInstance(self.task, Tasks)
        self.assertEqual(self.task.owner_id.email, "testuser@example.com")
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.category, "General")
        self.assertEqual(self.task.description, "This is a test task")
        self.assertEqual(self.task.location, "Test Location")
        self.assertEqual(self.task.budget, "100")
        self.assertEqual(self.task.estimated_time, "2 hours")
        self.assertEqual(self.task.status, "open")

    def test_task_str_method(self):
        self.assertEqual(str(self.task), f"Task {self.task.task_id}: owner_id={self.task.owner_id}, "
                         f"title={self.task.title}, description={self.task.description}, "
                         f"location={self.task.location}, budget={self.task.budget}, "
                         f"deadline={self.task.deadline}, status={self.task.status}, "
                         f"created_at={self.task.created_at}, updated_at={self.task.updated_at}")

    def test_task_default_values(self):
        task = Tasks.objects.create(
            owner_id=self.user,
            title="Task with Defaults",
            description="Task description",
            location="Default Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        self.assertEqual(task.category, "")
        self.assertEqual(task.budget, "")
        self.assertEqual(task.estimated_time, "")

    def test_task_update(self):
        self.task.title = "Updated Task Title"
        self.task.save()
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Updated Task Title")

    def test_task_deletion(self):
        task_id = self.task.task_id
        self.task.delete()
        with self.assertRaises(Tasks.DoesNotExist):
            Tasks.objects.get(task_id=task_id)

    def test_task_invalid_deadline(self):
        invalid_deadline = Tasks.objects.create(
            owner_id=self.user,
            title="Invalid Deadline Task",
            description="This task has an invalid deadline",
            location="Invalid Location",
            budget="100",
            estimated_time="2 hours",
            deadline=timezone.now() - timezone.timedelta(days=1),
            status="open"
        )

        with self.assertRaises(ValidationError) as cm:
            invalid_deadline.full_clean()
        self.assertEqual(cm.exception.message_dict['deadline'][0], 'Deadline must be in the future.')

    def test_task_deadline_future(self):
        task = Tasks.objects.create(
            owner_id=self.user,
            title="Future Deadline Task",
            description="This task has a future deadline",
            location="Future Location",
            budget="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=2),
            status="open"
        )
        self.assertGreater(task.deadline, timezone.now())

    def test_task_status_choices(self):
        valid_statuses = ["open", "in_progress", "completed", "cancelled"]
        for status in valid_statuses:
            task = Tasks.objects.create(
                owner_id=self.user,
                title=f"Task with {status} status",
                description="Task description",
                location="Location",
                budget="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status=status
            )
            self.assertEqual(task.status, status)

        with self.assertRaises(ValidationError):
            task = Tasks.objects.create(
                owner_id=self.user,
                title="Invalid Status Task",
                description="Task with invalid status",
                location="Location",
                budget="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="invalid_status"
            )
            task.full_clean()

    def test_task_location_not_empty(self):
        with self.assertRaises(ValidationError):
            Tasks.objects.create(
                owner_id=self.user,
                title="No Location Task",
                description="This task has no location",
                location="",
                budget="100",
                estimated_time="2 hours",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="open"
            ).full_clean()

    def test_task_without_estimated_fields(self):
        task = Tasks.objects.create(
            owner_id=self.user,
            title="No Estimated Fields Task",
            description="This task has no estimated price or time",
            location="Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        self.assertEqual(task.budget, "")
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
        user = Users.objects.create(
            email="testuser2@example.com",
            mobile="0987654321",
            password_hash="password123",
            status="active"
        )
        task = Tasks.objects.create(
            owner_id=user,
            title="Task to be deleted with owner",
            description="Description",
            location="Location",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        user.delete()
        with self.assertRaises(Tasks.DoesNotExist):
            Tasks.objects.get(task_id=task.task_id)

    def test_task_bulk_create(self):
        tasks = [
            Tasks(
                owner_id=self.user,
                title=f"Task {i}",
                description=f"Description {i}",
                location="Location",
                deadline=timezone.now() + timezone.timedelta(days=1),
                status="open"
            )
            for i in range(5)
        ]
        Tasks.objects.bulk_create(tasks)
        self.assertEqual(Tasks.objects.count(), 6)

    def test_task_filtering(self):
        Tasks.objects.create(
            owner_id=self.user,
            title="Task for Filtering",
            description="This task is for filtering",
            location="Filtering Location",
            budget="200",
            estimated_time="3 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open"
        )
        open_tasks = Tasks.objects.filter(status="open")
        self.assertEqual(open_tasks.count(), Tasks.objects.count())

    def test_task_ordering(self):
        Tasks.objects.all().delete()

        task1 = Tasks.objects.create(
            owner_id=self.user,
            title="Earlier Task",
            description="This task was created earlier",
            location="Location",
            budget="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open",
            created_at=timezone.now() - timezone.timedelta(days=2)
        )

        time.sleep(1)

        task2 = Tasks.objects.create(
            owner_id=self.user,
            title="Later Task",
            description="This task was created later",
            location="Location",
            budget="100",
            estimated_time="2 hours",
            deadline=timezone.now() + timezone.timedelta(days=1),
            status="open",
            created_at=timezone.now() - timezone.timedelta(days=1)
        )
        tasks = Tasks.objects.all().order_by('created_at')
        self.assertEqual(tasks[0], task1)
        self.assertEqual(tasks[1], task2)
