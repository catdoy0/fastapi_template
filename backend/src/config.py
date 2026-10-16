import os
from enum import Enum

from dotenv import load_dotenv

load_dotenv()


class DatabaseKind(str, Enum):
    POSTGRES = "postgres"
    SQLITE = "sqlite"
    UNKNOWN = "unknown"


def detect_database(url: str | None) -> DatabaseKind:
    """Classify a DATABASE_URL by its scheme prefix."""
    if not url:
        return DatabaseKind.UNKNOWN

    scheme = url.split("://", 1)[0].lower()

    match scheme:
        case "postgres" | "postgresql" | "postgresql+psycopg" | "postgresql+asyncpg":
            return DatabaseKind.POSTGRES
        case "sqlite" | "sqlite+aiosqlite":
            return DatabaseKind.SQLITE
        case _:
            # gotta do it manually dawg
            return DatabaseKind.UNKNOWN


def normalize_database_url(url: str | None) -> str | None:
    """Rewrite driver-specific URLs to the driver this app actually uses."""
    kind = detect_database(url)

    match kind:
        case DatabaseKind.POSTGRES:
            # bare postgresql:// → postgresql+psycopg:// (psycopg3)
            assert url is not None
            if url.startswith("postgresql://") or url.startswith("postgres://"):
                return url.replace("postgres://", "postgresql+psycopg://", 1) \
                          .replace("postgresql://", "postgresql+psycopg://", 1)
            return url
        case DatabaseKind.SQLITE:
            return url
        case _:
            return url


DATABASE_URL = normalize_database_url(os.getenv("DATABASE_URL"))
DATABASE_KIND = detect_database(DATABASE_URL)

# if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
#     DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7


PRODUCTION = os.getenv("PRODUCTION", "FALSE")
IS_PRODUCTION: bool = False
if PRODUCTION == "TRUE":
    IS_PRODUCTION = True

COOKIE_OPTIONS = {
    "httponly": True,
    "secure": IS_PRODUCTION,
    "samesite": "none" if IS_PRODUCTION else "lax",
}


def validate_config():
    required = {
        "DATABASE_URL": DATABASE_URL,
        "JWT_SECRET": JWT_SECRET,
    }

    missing = []

    for name, value in required.items():
        if not value:
            missing.append(name)

    if missing:
        raise RuntimeError(
            "Missing required environment variables: "
            + ", ".join(missing)
        )
