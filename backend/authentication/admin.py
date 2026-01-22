from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import HotelAdmin


@admin.register(HotelAdmin)
class HotelAdminAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'hotel_name', 'is_staff', 'is_active', 'created_at')
    list_filter = ('is_staff', 'is_active', 'created_at')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Hotel Information', {'fields': ('hotel_name', 'phone')}),
    )

