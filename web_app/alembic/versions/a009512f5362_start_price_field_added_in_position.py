"""start_price field added in position

Revision ID: a009512f5362
Revises: b705d1435b64
Create Date: 2024-10-24 18:56:29.399344

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect


# revision identifiers, used by Alembic.
revision = 'a009512f5362'
down_revision = 'b705d1435b64'
branch_labels = None
depends_on = None


def column_exists(table_name, column_name):
    """Utility function to check if a column exists in the table."""
    bind = op.get_bind()
    inspector = inspect(bind)
    columns = [col['name'] for col in inspector.get_columns(table_name)]
    return column_name in columns

def upgrade() -> None:
    """Upgrade the database."""

    if column_exists('position', 'start_price'):
        print("Column 'start_price' already exists, skipping creation.")
    else:
        op.add_column('position', sa.Column('start_price', sa.DECIMAL(), nullable=False,
                                            server_default='0.0'))
        print("Column 'start_price' added to the 'position' table.")
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('position', 'start_price',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               type_=sa.DECIMAL(),
               existing_nullable=False,
               server_default=None)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade the database."""

    if column_exists('position', 'start_price'):
        print("Column 'start_price' exists, downgrading.")
        op.drop_column('position', 'start_price')
    else:
        print("Column 'start_price' already removed, skipping.")
