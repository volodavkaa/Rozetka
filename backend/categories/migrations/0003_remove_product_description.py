# Generated by Django 5.1.5 on 2025-01-15 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_category_parent_alter_category_name_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='description',
        ),
    ]
