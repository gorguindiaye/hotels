# Guide de Démarrage Rapide

## 🚀 Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)

1. **Démarrer PostgreSQL avec Docker :**
```bash
docker-compose up -d
```

2. **Backend Django :**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Éditer .env avec vos paramètres
python manage.py migrate
python manage.py createsuperuser  # Optionnel
python manage.py runserver
```

3. **Frontend React :**
```bash
cd frontend
npm install
npm start
```

### Option 2 : Sans Docker

1. **Configurer PostgreSQL manuellement :**
   - Créer une base de données `hotel_manager`
   - Créer un utilisateur avec les permissions appropriées

2. **Suivre les étapes 2 et 3 de l'Option 1**

## 📝 Créer un compte administrateur

Après avoir lancé le serveur Django, créez un superutilisateur :

```bash
python manage.py createsuperuser
```

Ou utilisez le shell Django pour créer un utilisateur :

```bash
python manage.py shell
```

```python
from authentication.models import HotelAdmin
user = HotelAdmin.objects.create_user(
    username='admin',
    email='admin@hotel.com',
    password='votre_mot_de_passe',
    hotel_name='Mon Hôtel'
)
```

## 🔗 URLs

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Admin Django** : http://localhost:8000/admin

## 🧪 Tester l'authentification

1. Accédez à http://localhost:3000/login
2. Connectez-vous avec les identifiants créés
3. Testez la réinitialisation de mot de passe via "Mot de passe oublié ?"

## 📧 Email en développement

En mode développement, les emails sont affichés dans la console Django. Pour tester la réinitialisation de mot de passe, vérifiez la console où Django s'exécute.

