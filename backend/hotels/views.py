from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from hotels.models import Hotel, Room, Reservation, Review
from hotels.serializers import (
    HotelListSerializer, HotelDetailSerializer,
    RoomSerializer, ReservationSerializer, ReviewSerializer
)
from authentication.permissions import IsAdmin, IsAdminOrManager, IsAdminOrReadOnly


class HotelViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour la gestion des hôtels
    CRUD réservé aux administrateurs
    """
    queryset = Hotel.objects.all()
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'city', 'country']
    search_fields = ['name', 'address', 'city']
    ordering_fields = ['created_at', 'price_per_night', 'star_rating']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return HotelDetailSerializer
        return HotelListSerializer
    
    def perform_create(self, serializer):
        """Assigner l'utilisateur courant comme propriétaire"""
        serializer.save(owner=self.request.user)
    
    def perform_update(self, serializer):
        """Vérifier que seul le propriétaire ou admin peut modifier"""
        hotel = self.get_object()
        if self.request.user != hotel.owner and self.request.user.role != 'admin':
            return Response(
                {'detail': 'Vous ne pouvez pas modifier cet hôtel.'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()
    
    @action(detail=True, methods=['POST'], permission_classes=[IsAuthenticated, IsAdminOrManager])
    def toggle_status(self, request, pk=None):
        """Activer/désactiver un hôtel"""
        hotel = self.get_object()
        new_status = 'active' if hotel.status != 'active' else 'inactive'
        hotel.status = new_status
        hotel.save()
        return Response({'status': new_status})


class RoomViewSet(viewsets.ModelViewSet):
    """ViewSet pour la gestion des chambres"""
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['hotel', 'room_type', 'is_available']
    ordering = ['hotel', 'number']
    
    def perform_create(self, serializer):
        """Vérifier les permissions"""
        hotel = serializer.validated_data['hotel']
        if (self.request.user != hotel.owner and 
            self.request.user.role != 'admin'):
            return Response(
                {'detail': 'Vous n\'avez pas permission pour ajouter des chambres à cet hôtel.'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()


class ReservationViewSet(viewsets.ModelViewSet):
    """ViewSet pour la gestion des réservations"""
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['room__hotel', 'status', 'check_in', 'check_out']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filtrer les réservations selon le rôle"""
        user = self.request.user
        if user.role == 'admin':
            return Reservation.objects.all()
        elif user.role in ('manager', 'staff'):
            # Voir uniquement les réservations de leurs hôtels
            return Reservation.objects.filter(room__hotel__owner=user)
        return Reservation.objects.none()
    
    @action(detail=True, methods=['POST'], permission_classes=[IsAuthenticated, IsAdminOrManager])
    def confirm(self, request, pk=None):
        """Confirmer une réservation"""
        reservation = self.get_object()
        reservation.status = 'confirmed'
        reservation.save()
        return Response({'status': 'Réservation confirmée'})
    
    @action(detail=True, methods=['POST'], permission_classes=[IsAuthenticated, IsAdminOrManager])
    def cancel(self, request, pk=None):
        """Annuler une réservation"""
        reservation = self.get_object()
        reservation.status = 'cancelled'
        reservation.save()
        return Response({'status': 'Réservation annulée'})


class ReviewViewSet(viewsets.ModelViewSet):
    """ViewSet pour les avis"""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['hotel', 'rating']
    ordering = ['-created_at']
    
    def perform_create(self, serializer):
        """Les reviews sont en lecture seule pour les non-admins"""
        if self.request.user.role != 'admin':
            return Response(
                {'detail': 'Seuls les administrateurs peuvent créer des avis.'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()

