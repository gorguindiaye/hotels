import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotel_manager.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from django.core.management import call_command
call_command('startapp', 'hotels')
