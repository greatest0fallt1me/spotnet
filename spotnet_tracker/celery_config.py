"""
This module configures the Celery application for the project.

It sets up the Celery instance using Redis as both the message broker
and result backend. The Redis connection details (host and port) are
loaded from environment variables using the `dotenv` library.

Additionally, this module defines a scheduled task configuration that
periodically executes scheduled tasks.

Key Components:
- Loads environment variables using `load_dotenv`.
- Configures Redis connection settings for Celery.
- Defines a Celery beat schedule for recurring tasks.

Usage:
- The Celery app can be imported and used in other parts of the application
  to execute tasks or manage workers.

"""

import os

from celery import Celery
from dotenv import load_dotenv

load_dotenv()

# Redis credentials
REDIS_HOST = os.environ.get("REDIS_HOST", "")
REDIS_PORT = os.environ.get("REDIS_PORT", 6379)

app = Celery(
    main="spotnet",
    broker=f"redis://{REDIS_HOST}:{REDIS_PORT}/0",
    backend=f"redis://{REDIS_HOST}:{REDIS_PORT}/0",
)

app.conf.beat_schedule = {
    "check_users_health_ratio": {
        "task": "check_users_health_ratio",
        "schedule": 1,
    },
}

from .tasks import check_users_health_ratio
