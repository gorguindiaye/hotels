from django.contrib.auth.models import AbstractUser
from django.db import models


class HotelAdmin(AbstractUser):
    """Extended user model for hotel administrators"""
    hotel_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hotel Administrator"
        verbose_name_plural = "Hotel Administrators"

