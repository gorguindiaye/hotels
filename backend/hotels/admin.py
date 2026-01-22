from django.contrib import admin
from hotels.models import Hotel, Room, Reservation, Review


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'status', 'star_rating', 'price_per_night', 'created_at']
    list_filter = ['status', 'city', 'star_rating', 'created_at']
    search_fields = ['name', 'city', 'address']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['number', 'hotel', 'room_type', 'capacity', 'price_per_night', 'is_available']
    list_filter = ['room_type', 'is_available', 'hotel']
    search_fields = ['number', 'hotel__name']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['guest_name', 'room', 'check_in', 'check_out', 'status', 'total_price']
    list_filter = ['status', 'check_in', 'created_at']
    search_fields = ['guest_name', 'guest_email', 'room__hotel__name']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['guest_name', 'hotel', 'rating', 'created_at']
    list_filter = ['rating', 'hotel', 'created_at']
    search_fields = ['guest_name', 'hotel__name', 'comment']
    readonly_fields = ['created_at', 'updated_at']

