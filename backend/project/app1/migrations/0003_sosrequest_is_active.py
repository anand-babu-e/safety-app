# Generated by Django 5.1.2 on 2024-11-09 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0002_incident_alter_sosrequest_emergency_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='sosrequest',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
