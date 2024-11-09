# Generated by Django 5.1.2 on 2024-11-06 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('incident_type', models.CharField(max_length=20)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('description', models.TextField()),
                ('timestamp', models.DateTimeField()),
            ],
        ),
        migrations.AlterField(
            model_name='sosrequest',
            name='emergency_type',
            field=models.CharField(max_length=20),
        ),
    ]