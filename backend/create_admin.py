#!/usr/bin/env python
"""
Script pour créer un utilisateur admin par défaut
Utilisation: python manage.py shell < create_admin.py
Ou: python create_admin.py
"""

import os
import django

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotel_manager.settings')
django.setup()

from authentication.models import HotelAdmin

def create_default_admin():
    """Crée un utilisateur admin par défaut"""
    
    # Vérifier si l'admin existe déjà
    if HotelAdmin.objects.filter(email='admin@hotelsmanager.com').exists():
        print("✓ Admin existe déjà")
        return
    
    # Créer l'admin par défaut
    admin = HotelAdmin.objects.create_superuser(
        username='admin',
        email='admin@hotelsmanager.com',
        password='Admin@123456',
        first_name='Admin',
        last_name='Système',
        role='admin',
        hotel_name='Tous les hôtels',
        is_active_user=True
    )
    
    print("✓ Admin créé avec succès!")
    print(f"Email: admin@hotelsmanager.com")
    print(f"Mot de passe: Admin@123456")
    print(f"Rôle: {admin.get_role_display()}")
    
if __name__ == '__main__':
    create_default_admin()
