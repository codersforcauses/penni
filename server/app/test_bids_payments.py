# This is a draft test before ERM review finished;
# Test CRUD on table Bids and Payments;
# Assume user and task are already created with no problems before testing Bids and Payments.
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from .models import Users, Tasks, Bids, Payments
from datetime import datetime, timedelta

class BidsPaymentsTestCase(TestCase):

    def setUp(self):
        # Create a test user
        self.user = Users.objects.create(
            email="testuser@example.com",
            mobile="1234567890",
            password_hash = make_password("secure_password"),
            status="active"
        )

        # Create a test task
        self.task = Tasks.objects.create(
            owner_id=self.user,
            title="Test Task",
            description="Task Description",
            location="Test Location",
            deadline=datetime.now() + timedelta(days=5),
            status="open"
        )

    def test_create_bid(self):
        # Create a bid
        bid = Bids.objects.create(
            task_id=self.task,
            bidder_id=self.user,
            price="100",
            message="This is a bid message",
            status="pending"
        )

        try:
            bid.clean()
            bid.save()
        except ValidationError as e:
            self.fail(f'ValidationError raised: {e}')
        self.assertEqual(bid.price, "100")
        self.assertEqual(bid.message, "This is a bid message")
        self.assertEqual(bid.status, "pending")

    def test_read_bid(self):
        # Create and read a bid
        bid = Bids.objects.create(
            task_id=self.task,
            bidder_id=self.user,
            price="100",
            message="This is a bid message",
            status="pending"
        )

        fetched_bid = Bids.objects.get(pk=bid.bid_id)
        self.assertEqual(fetched_bid.price, "100")
        self.assertEqual(fetched_bid.message, "This is a bid message")
        self.assertEqual(fetched_bid.status, "pending")

    def test_update_bid(self):
        # Create and update a bid
        bid = Bids.objects.create(
            task_id=self.task,
            bidder_id=self.user,
            price="100",
            message="This is a bid message",
            status="pending"
        )

        bid.price = "150"
        bid.status = "accepted"

        try:
            bid.clean()
            bid.save()
        except ValidationError as e:
            self.fail(f'ValidationError raised: {e}')

        updated_bid = Bids.objects.get(pk=bid.bid_id)
        self.assertEqual(updated_bid.price, "150")
        self.assertEqual(updated_bid.status, "accepted")

    def test_delete_bid(self):
        # Create and delete a bid
        bid = Bids.objects.create(
            task_id=self.task,
            bidder_id=self.user,
            price="100",
            message="This is a bid message",
            status="pending"
        )

        bid_id = bid.bid_id
        bid.delete()

        with self.assertRaises(Bids.DoesNotExist):
            Bids.objects.get(pk=bid_id)

    def test_create_payment(self):
        # Create a payment
        payment = Payments.objects.create(
            task_id=self.task,
            payer_id=self.user,
            amount=150.00,
            payment_method="Credit Card",
            status="completed"
        )

        try:
            payment.clean()
            payment.save()
        except ValidationError as e:
            self.fail(f'ValidationError raised: {e}')

        self.assertEqual(payment.amount, 150.00)
        self.assertEqual(payment.payment_method, "Credit Card")
        self.assertEqual(payment.status, "completed")

    def test_read_payment(self):
        # Create and read a payment
        payment = Payments.objects.create(
            task_id=self.task,
            payer_id=self.user,
            amount=150.00,
            payment_method="Credit Card",
            status="completed"
        )

        fetched_payment = Payments.objects.get(pk=payment.payment_id)
        self.assertEqual(fetched_payment.amount, 150.00)
        self.assertEqual(fetched_payment.payment_method, "Credit Card")
        self.assertEqual(fetched_payment.status, "completed")

    def test_update_payment(self):
        # Create and update a payment
        payment = Payments.objects.create(
            task_id=self.task,
            payer_id=self.user,
            amount=150.00,
            payment_method="Credit Card",
            status="completed"
        )

        payment.amount = 200.00
        payment.status = "refunded"

        try:
            payment.clean()
            payment.save()
        except ValidationError as e:
            self.fail(f'ValidationError raised: {e}')

        updated_payment = Payments.objects.get(pk=payment.payment_id)
        self.assertEqual(updated_payment.amount, 200.00)
        self.assertEqual(updated_payment.status, "refunded")

    def test_delete_payment(self):
        # Create and delete a payment
        payment = Payments.objects.create(
            task_id=self.task,
            payer_id=self.user,
            amount=150.00,
            payment_method="Credit Card",
            status="completed"
        )

        payment_id = payment.payment_id
        payment.delete()

        with self.assertRaises(Payments.DoesNotExist):
            Payments.objects.get(pk=payment_id)
