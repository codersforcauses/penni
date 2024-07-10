from .models import Users, Profiles, Tasks, Bids, Payments
from django.contrib.auth.hashers import make_password
from django.utils.timezone import now, timedelta


# Empty database before populating mock data
def delete_mock_data():
    if Users.objects.exists():
        Users.objects.all().delete()
        Profiles.objects.all().delete()
        Tasks.objects.all().delete()
        Bids.objects.all().delete()
        Payments.objects.all().delete()
        print("Mock data deleted.")
    else:
        print("No mock data to delete.")


# Create user instances
def create_users():
    if not Users.objects.exists():
        user1 = Users.objects.create(
            email='user1@example.com',
            mobile='1234567890',
            password_hash=make_password('password1'),
            status='active',
            user_role='poster'
        )
        user2 = Users.objects.create(
            email='user2@example.com',
            mobile='0987654321',
            password_hash=make_password('password2'),
            status='active',
            user_role='bidder'
        )
        print("Users created.")
        return [user1, user2]
    else:
        print("Users already exist.")
        return Users.objects.all()


# Create profile instances
def create_profiles(users):
    if not Profiles.objects.exists():
        for user in users:
            Profiles.objects.create(
                user_id=user,
                full_name=f'Full Name {user.email}',
                avatar_url='http://example.com/avatar.jpg',
                bio='This is a bio.'
            )
        print("Profiles created.")
    else:
        print("Profiles already exist.")


# Create task instances
def create_tasks(users):
    if not Tasks.objects.exists():
        task1 = Tasks.objects.create(
            owner_id=users[0],
            title='Task 1',
            category='Category 1',
            description='Description for task 1',
            location='Location 1',
            budget='100.00',
            estimated_time='2 hours',
            deadline=now() + timedelta(days=10),
            status='open'
        )
        task2 = Tasks.objects.create(
            owner_id=users[0],
            title='Task 2',
            category='Category 2',
            description='Description for task 2',
            location='Location 2',
            budget='200.00',
            estimated_time='4 hours',
            deadline=now() + timedelta(days=5),
            status='open'
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
            price='150.00',
            message='I can do this task.',
            status='pending'
        )
        Bids.objects.create(
            task_id=tasks[1],
            bidder_id=users[1],
            price='180.00',
            message='I have experience with this.',
            status='pending'
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
            payment_method='Credit Card',
            status='completed'
        )
        Payments.objects.create(
            task_id=tasks[1],
            payer_id=users[0],
            amount=200.00,
            payment_method='PayPal',
            status='pending'
        )
        print("Payments created.")
    else:
        print("Payments already exist.")


# Populating Mock data
def create_mock_data(sender, **kwargs):
    delete_mock_data()
    users = create_users()
    create_profiles(users)
    tasks = create_tasks(users)
    create_bids(tasks, users)
    create_payments(tasks, users)
