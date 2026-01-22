# Hotel Manager Pro

Application web professionnelle de gestion hôtelière avec React (frontend), Django (backend) et PostgreSQL (base de données).

## 🏗️ Structure du Projet

```
hotels/
├── backend/          # Django REST API
│   ├── hotel_manager/
│   ├── authentication/
│   └── manage.py
└── frontend/         # React Application
    ├── src/
    │   ├── pages/
    │   ├── styles/
    │   └── App.js
    └── public/
```

## 🚀 Installation et Configuration

### Prérequis

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- pip (Python package manager)
- npm ou yarn

### Backend (Django)

1. **Créer un environnement virtuel Python :**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

2. **Installer les dépendances :**
```bash
pip install -r requirements.txt
```

3. **Configurer PostgreSQL :**
   - Créer une base de données nommée `hotel_manager`
   - Créer un fichier `.env` dans le dossier `backend/` basé sur `.env.example`
   - Configurer les variables d'environnement dans `.env`

4. **Appliquer les migrations :**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Créer un superutilisateur (optionnel) :**
```bash
python manage.py createsuperuser
```

6. **Lancer le serveur Django :**
```bash
python manage.py runserver
```

Le serveur sera accessible sur `http://localhost:8000`

### Frontend (React)

1. **Installer les dépendances :**
```bash
cd frontend
npm install
```

2. **Lancer l'application React :**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📋 Fonctionnalités d'Authentification

### Écran 1 - Connexion Administrateur
- Formulaire de connexion avec email et mot de passe
- Option "Se souvenir de moi"
- Lien vers la réinitialisation de mot de passe

### Écran 2 - Mot de passe oublié
- Formulaire pour demander la réinitialisation
- Envoi d'email avec lien de réinitialisation

### Écran 3 - Confirmation
- Page de confirmation après envoi de l'email

## 🎨 Design UI/UX

- **Layout** : Deux colonnes (desktop-first, responsive)
  - Section gauche : Fond sombre avec motifs abstraits
  - Section droite : Carte blanche centrée avec formulaire
- **Style** : SaaS moderne, professionnel, orienté industrie hôtelière
- **Typographie** : Sans-serif neutre
- **Couleurs** : Gris foncé / bleu nuit pour le fond, blanc pour la carte

## 🔌 API Endpoints

- `POST /api/auth/login/` - Connexion
- `POST /api/auth/password-reset/` - Demande de réinitialisation
- `POST /api/auth/password-reset-confirm/` - Confirmation de réinitialisation
- `GET /api/auth/me/` - Informations utilisateur actuel (authentifié)

## 📝 Notes

- L'authentification utilise JWT (JSON Web Tokens)
- Les tokens sont stockés dans le localStorage du navigateur
- En développement, les emails sont affichés dans la console Django
- Pour la production, configurer un vrai service d'email dans les settings Django

## 🛠️ Technologies Utilisées

- **Backend** : Django 4.2, Django REST Framework, PostgreSQL, JWT
- **Frontend** : React 18, React Router, Axios
- **Styling** : CSS3 avec Material Design inspirations

