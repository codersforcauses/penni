from .models import Users, Tasks, Bids, Payments, TaskLocation
from django.utils.timezone import now, timedelta


# Create user instances
def create_users():
    if not Users.objects.exists():
        user1 = Users.objects.create(
            email="bidder@example.com",
            username="bidder_test",
            mobile="1234567890",
            password="password1",
            is_bidder=True,
            is_poster=False,
        )
        user2 = Users.objects.create(
            email="poster@example.com",
            username="poster_test",
            mobile="0987654321",
            password="password2",
            is_bidder=False,
            is_poster=True,
        )
        print("Users created.")
        return [user1, user2]
    else:
        print("Users already exist.")
        return Users.objects.all()


# Create task instances
def create_tasks(users):
    if not Tasks.objects.exists():
        task1 = Tasks.objects.create(
            poster_id=users[0],
            title="Task 1",
            category="Category 1",
            description="Description for task 1",
            budget="100.00",
            estimated_time="2 hours",
            deadline=now() + timedelta(days=10),
            status="open",
        )
        task2 = Tasks.objects.create(
            poster_id=users[0],
            title="Task 2",
            category="Category 2",
            description="Description for task 2",
            budget="200.00",
            estimated_time="4 hours",
            deadline=now() + timedelta(days=5),
            status="open",
        )
        TaskLocation.objects.create(
            task=task1,
            suburb="Suburb 1",
            state="NSW",
        )
        TaskLocation.objects.create(
            task=task2,
            suburb="Suburb 2",
            state="NSW",
        )
        print("Tasks created.")
        return [task1, task2]
    else:
        print("Tasks already exist.")
        return Tasks.objects.all()


# Create bid instances
def create_bids(tasks, users):
    if not Bids.objects.exists():
        Bids.objects.create(
            task_id=tasks[0],
            bidder_id=users[1],
            price="150.00",
            message="I can do this task.",
            status="pending",
        )
        Bids.objects.create(
            task_id=tasks[1],
            bidder_id=users[1],
            price="180.00",
            message="I have experience with this.",
            status="pending",
        )
        print("Bids created.")
    else:
        print("Bids already exist.")


# Create payment instances
def create_payments(tasks, users):
    if not Payments.objects.exists():
        Payments.objects.create(
            task_id=tasks[0],
            payer_id=users[0],
            amount=100.00,
            payment_method="Credit Card",
            status="completed",
        )
        Payments.objects.create(
            task_id=tasks[1],
            payer_id=users[0],
            amount=200.00,
            payment_method="PayPal",
            status="pending",
        )
        print("Payments created.")
    else:
        print("Payments already exist.")


# Populate Mock data
def create_mock_data(sender, **kwargs):
    users = create_users()
    tasks = create_tasks(users)
    create_bids(tasks, users)
    create_payments(tasks, users)
