# Generated by Django 5.1.5 on 2025-01-15 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0004_product_description_product_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='description',
        ),
        migrations.RemoveField(
            model_name='product',
            name='image_url',
        ),
    ]