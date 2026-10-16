from sqlalchemy import event, inspect
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Session, create_engine, select

from src.config import DATABASE_KIND, DATABASE_URL, DatabaseKind
from src.models.enums import UserRole
from src.models.users import Users

_database_url = DATABASE_URL or ""

DEFAULT_ROOT_EMAIL = "root@gmail.com"
DEFAULT_ROOT_PASSWORD = "root"


match DATABASE_KIND:
    case DatabaseKind.SQLITE:
        engine = create_engine(
            _database_url,
            echo=True,
            connect_args={"check_same_thread": False},
        )
    case DatabaseKind.POSTGRES:
        engine = create_engine(_database_url, echo=True, pool_pre_ping=True)
    case _:
        raise RuntimeError(f"Unsupported DATABASE_URL scheme: {_database_url!r}")

if DATABASE_KIND is DatabaseKind.SQLITE:
    @event.listens_for(engine, "connect")
    def _sqlite_pragmas(dbapi_conn, _):
        cur = dbapi_conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        cur.close()

# engine = create_engine(_database_url, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


def assert_database_ready() -> bool:
    try:
        with engine.connect() as conn:
            inspector = inspect(conn)
            tables = inspector.get_table_names()

    except SQLAlchemyError:
        print("[db] Can't connect to database.")
        return False

    if "users" not in tables:
        print("[db] 'users' table not found.")
        return False

    print("[db] Connected.")
    return True




def ensure_default_super_admin() -> None:
    """
    Create a default SUPER_ADMIN 'root' user if no super admin exists yet.
    Safe to call on every startup.
    """
    from src.modules.auth.passwords import hash_password

    with Session(engine) as session:
        existing = session.exec(
            select(Users).where(Users.role == UserRole.SUPER_ADMIN)
        ).first()

        if existing is not None:
            return

        root = Users(
            email=DEFAULT_ROOT_EMAIL,
            password_hash=hash_password(DEFAULT_ROOT_PASSWORD),
            role=UserRole.SUPER_ADMIN,
            is_active=True,
        )
        session.add(root)
        session.commit()
        print(f"[seed] Created default super admin: {DEFAULT_ROOT_EMAIL}")
