# Generated by Django 2.0.4 on 2018-04-22 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('unit_price', models.IntegerField(default=0)),
                ('inventory', models.IntegerField(default=0)),
            ],
        ),
    ]
