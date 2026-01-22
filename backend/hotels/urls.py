from django.urls import path, include
from rest_framework.routers import DefaultRouter
from hotels.views import HotelViewSet, RoomViewSet, ReservationViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename='hotel')
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'reservations', ReservationViewSet, basename='reservation')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
]
