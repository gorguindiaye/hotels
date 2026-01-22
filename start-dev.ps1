# Script PowerShell pour démarrer l'application en mode développement
# Utilise SQLite au lieu de PostgreSQL pour faciliter le démarrage

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Hotel Manager Pro - Démarrage Dev" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si on est dans le bon répertoire
if (-not (Test-Path "backend\manage.py")) {
    Write-Host "Erreur: Ce script doit être exécuté depuis le répertoire racine du projet" -ForegroundColor Red
    exit 1
}

# Option: Utiliser SQLite pour le développement
Write-Host "Voulez-vous utiliser SQLite pour le développement? (O/N)" -ForegroundColor Yellow
$useSqlite = Read-Host "Par défaut: O"

if ($useSqlite -eq "" -or $useSqlite -eq "O" -or $useSqlite -eq "o") {
    Write-Host "Configuration SQLite activée..." -ForegroundColor Green
    
    # Sauvegarder settings.py original
    if (Test-Path "backend\hotel_manager\settings.py") {
        if (-not (Test-Path "backend\hotel_manager\settings_postgres.py")) {
            Copy-Item "backend\hotel_manager\settings.py" "backend\hotel_manager\settings_postgres.py"
            Write-Host "settings.py original sauvegardé comme settings_postgres.py" -ForegroundColor Green
        }
        
        # Copier settings_sqlite.py vers settings.py
        if (Test-Path "backend\hotel_manager\settings_sqlite.py") {
            Copy-Item "backend\hotel_manager\settings_sqlite.py" "backend\hotel_manager\settings.py" -Force
            Write-Host "Configuration SQLite appliquée" -ForegroundColor Green
        }
    }
}

# Vérifier les migrations
Write-Host ""
Write-Host "Création des migrations..." -ForegroundColor Yellow
Set-Location backend
python manage.py makemigrations

if ($LASTEXITCODE -eq 0) {
    Write-Host "Application des migrations..." -ForegroundColor Yellow
    python manage.py migrate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Migrations appliquées avec succès!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Pour créer un superutilisateur, exécutez:" -ForegroundColor Cyan
        Write-Host "  python manage.py createsuperuser" -ForegroundColor White
        Write-Host ""
        Write-Host "Démarrage du serveur Django..." -ForegroundColor Yellow
        Write-Host "Le serveur sera accessible sur http://localhost:8000" -ForegroundColor Cyan
        Write-Host ""
        python manage.py runserver
    } else {
        Write-Host "Erreur lors de l'application des migrations" -ForegroundColor Red
    }
} else {
    Write-Host "Erreur lors de la création des migrations" -ForegroundColor Red
}

Set-Location ..

