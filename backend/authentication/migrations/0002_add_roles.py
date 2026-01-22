# Generated migration for adding role and is_active_user fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hoteladmin',
            name='role',
            field=models.CharField(
                choices=[('admin', 'Admin'), ('manager', 'Manager'), ('staff', 'Staff')],
                default='staff',
                max_length=20
            ),
        ),
        migrations.AddField(
            model_name='hoteladmin',
            name='is_active_user',
            field=models.BooleanField(default=True),
        ),
    ]
