# Generated by Django 5.1.5 on 2025-01-15 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0005_remove_product_description_remove_product_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
