# Generated by Django 5.0.1 on 2024-01-18 02:33

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("data", "0004_alter_data_startyear"),
    ]

    operations = [
        migrations.AddField(
            model_name="data",
            name="mongodb_id",
            field=models.CharField(default="", max_length=24, unique=True),
        ),
        migrations.AlterField(
            model_name="data",
            name="intensity",
            field=models.IntegerField(
                blank=True,
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(
                        limit_value=1, message="Value cannot be less than 1!"
                    ),
                    django.core.validators.MaxValueValidator(
                        limit_value=20, message="Value cannot be greater than 20!"
                    ),
                ],
            ),
        ),
        migrations.AlterField(
            model_name="data",
            name="likelihood",
            field=models.IntegerField(
                blank=True,
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(
                        limit_value=1, message="Value cannot be less than 1!"
                    ),
                    django.core.validators.MaxValueValidator(
                        limit_value=20, message="Value cannot be greater than 20!"
                    ),
                ],
            ),
        ),
        migrations.AlterField(
            model_name="data",
            name="relevance",
            field=models.IntegerField(
                blank=True,
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(
                        limit_value=1, message="Value cannot be less than 1!"
                    ),
                    django.core.validators.MaxValueValidator(
                        limit_value=20, message="Value cannot be greater than 20!"
                    ),
                ],
            ),
        ),
    ]
