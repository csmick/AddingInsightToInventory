# Generated by Django 2.0.4 on 2018-04-23 17:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('start_selling', '0002_auto_20180423_1217'),
    ]

    operations = [
        migrations.RenameField(
            model_name='solditem',
            old_name='item_id',
            new_name='item',
        ),
        migrations.RenameField(
            model_name='solditem',
            old_name='transaction_id',
            new_name='transaction',
        ),
    ]