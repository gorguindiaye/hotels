# Guide de Configuration - Hotel Manager Pro

## ✅ Fichier .env créé

Le fichier `.env` a été créé dans `backend/.env` avec les paramètres par défaut.

## 🐘 Configuration PostgreSQL

### Option 1 : Utiliser Docker (Recommandé)

1. **Démarrer Docker Desktop** (si ce n'est pas déjà fait)
2. **Ouvrir PowerShell en tant qu'administrateur**
3. **Naviguer vers le répertoire du projet :**
   ```powershell
   cd C:\Users\Administrator\Desktop\hotels
   ```
4. **Démarrer PostgreSQL avec Docker :**
   ```powershell
   docker-compose up -d
   ```
5. **Vérifier que le conteneur est en cours d'exécution :**
   ```powershell
   docker ps
   ```

### Option 2 : PostgreSQL installé localement

1. **Créer la base de données :**
   ```sql
   CREATE DATABASE hotel_manager;
   ```
2. **Vérifier les paramètres dans `backend/.env` :**
   - `DB_NAME=hotel_manager`
   - `DB_USER=postgres` (ou votre utilisateur)
   - `DB_PASSWORD=postgres` (ou votre mot de passe)
   - `DB_HOST=localhost`
   - `DB_PORT=5432`

### Option 3 : Utiliser SQLite pour le développement (Temporaire)

Si vous voulez tester rapidement sans PostgreSQL, modifiez `backend/hotel_manager/settings.py` :

```python
# Remplacez la section DATABASES par :
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

⚠️ **Note :** SQLite est uniquement pour le développement. Pour la production, utilisez PostgreSQL.

## 📋 Étapes suivantes

Une fois PostgreSQL configuré :

1. **Créer les migrations :**
   ```powershell
   cd backend
   python manage.py makemigrations
   ```

2. **Appliquer les migrations :**
   ```powershell
   python manage.py migrate
   ```

3. **Créer un superutilisateur (optionnel) :**
   ```powershell
   python manage.py createsuperuser
   ```

4. **Lancer le serveur Django :**
   ```powershell
   python manage.py runserver
   ```

5. **Dans un autre terminal, lancer le frontend React :**
   ```powershell
   cd frontend
   npm install
   npm start
   ```

## 🔧 Dépannage

### Erreur de connexion PostgreSQL

- Vérifiez que PostgreSQL est en cours d'exécution
- Vérifiez les paramètres dans `.env`
- Testez la connexion : `psql -U postgres -d hotel_manager`

### Erreur Docker

- Assurez-vous que Docker Desktop est démarré
- Exécutez PowerShell en tant qu'administrateur
- Vérifiez que le port 5432 n'est pas déjà utilisé

### Erreur d'encodage

- Vérifiez que le fichier `.env` est en UTF-8
- Réinstallez psycopg2 : `pip install --force-reinstall psycopg2-binary`

