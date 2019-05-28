"""empty message

Revision ID: 206d8c063ef3
Revises: 87efb2c24729
Create Date: 2018-12-08 23:06:05.420731

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '206d8c063ef3'
down_revision = '87efb2c24729'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('airport', sa.Column('altitude', sa.Float(), nullable=True))
    op.add_column('airport', sa.Column('icao', sa.String(length=4), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('airport', 'icao')
    op.drop_column('airport', 'altitude')
    # ### end Alembic commands ###