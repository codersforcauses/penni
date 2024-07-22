import logging
import os
from django.conf import settings

LOG_DIR = os.path.join(settings.BASE_DIR, 'log')
LOG_FILE = 'api_middleware.log'
LOG_PATH = os.path.join(LOG_DIR, LOG_FILE)

if not os.path.exists(LOG_DIR):
    os.mkdir(LOG_DIR)

if not os.path.exists(LOG_PATH):
    open(LOG_PATH, 'a').close()  # create empty log file

# Configure logging for the middleware
logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
)


class RequestLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log request details
        logging.info(f"Request: {request.method} {request.path}")

        response = self.get_response(request)

        # Log response details
        logging.info(
            f"Response: {response.status_code} {response.reason_phrase}")

        return response

    def process_exception(self, request, exception):
        # Log exception details
        logging.error(f"Exception: {exception}")
