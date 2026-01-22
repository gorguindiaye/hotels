from django.db import models
from authentication.models import HotelAdmin


class Hotel(models.Model):
    """Modèle pour les hôtels"""
    
    STATUS_CHOICES = (
        ('active', 'Actif'),
        ('inactive', 'Inactif'),
        ('maintenance', 'En maintenance'),
    )
    
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    website = models.URLField(blank=True)
    image = models.URLField(blank=True, null=True)
    
    # Informations de gestion
    owner = models.ForeignKey(HotelAdmin, on_delete=models.CASCADE, related_name='hotels')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Détails
    star_rating = models.IntegerField(default=3, choices=[(i, f"{i} étoiles") for i in range(1, 6)])
    number_of_rooms = models.IntegerField(default=0)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner', '-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['city']),
        ]

    def __str__(self):
        return self.name


class Room(models.Model):
    """Modèle pour les chambres d'hôtel"""
    
    ROOM_TYPE_CHOICES = (
        ('single', 'Simple'),
        ('double', 'Double'),
        ('suite', 'Suite'),
        ('deluxe', 'Deluxe'),
    )
    
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='rooms')
    number = models.CharField(max_length=10)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    capacity = models.IntegerField(default=2)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('hotel', 'number')
        ordering = ['hotel', 'number']

    def __str__(self):
        return f"{self.hotel.name} - Room {self.number}"


class Reservation(models.Model):
    """Modèle pour les réservations"""
    
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('checked_in', 'Arrivée effectuée'),
        ('checked_out', 'Départ effectué'),
        ('cancelled', 'Annulée'),
    )
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reservations')
    guest_name = models.CharField(max_length=255)
    guest_email = models.EmailField()
    guest_phone = models.CharField(max_length=20)
    
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    number_of_guests = models.IntegerField(default=1)
    special_requests = models.TextField(blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['room', 'check_in', 'check_out']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.guest_name} - {self.room} ({self.check_in} to {self.check_out})"


class Review(models.Model):
    """Modèle pour les avis"""
    
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    guest_name = models.CharField(max_length=255)
    rating = models.IntegerField(choices=[(i, f"{i}/5") for i in range(1, 6)])
    comment = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.hotel.name} - {self.rating}/5 stars"

