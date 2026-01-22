"""
Permissions customisées pour le système de rôles
"""

from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Permet l'accès uniquement aux administrateurs
    """
    message = "Accès réservé aux administrateurs."

    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'admin'
        )


class IsAdminOrManager(BasePermission):
    """
    Permet l'accès aux administrateurs et managers
    """
    message = "Accès réservé aux administrateurs et managers."

    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ('admin', 'manager')
        )


class IsAdminOrReadOnly(BasePermission):
    """
    Permet la lecture à tous, mais l'écriture uniquement aux admins
    """
    
    def has_permission(self, request, view):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'admin'
        )
