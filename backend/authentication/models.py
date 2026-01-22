from django.contrib.auth.models import AbstractUser
from django.db import models


class HotelAdmin(AbstractUser):
    """Extended user model for hotel administrators"""
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('staff', 'Staff'),
    )
    
    hotel_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='staff')
    is_active_user = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hotel Administrator"
        verbose_name_plural = "Hotel Administrators"
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

