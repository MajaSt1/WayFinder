# Generated by Django 4.2.1 on 2023-11-06 11:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_route_end_location_lat_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SearchedLocation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('lat', models.DecimalField(decimal_places=7, max_digits=9)),
                ('lng', models.DecimalField(decimal_places=7, max_digits=9)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Searched Location',
                'verbose_name_plural': 'Searched Locations',
            },
        ),
    ]
