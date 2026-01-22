from rest_framework import serializers
from hotels.models import Hotel, Room, Reservation, Review
from authentication.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'guest_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'hotel', 'number', 'room_type', 'capacity', 'price_per_night', 'is_available', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']


class ReservationSerializer(serializers.ModelSerializer):
    room_detail = RoomSerializer(source='room', read_only=True)
    
    class Meta:
        model = Reservation
        fields = ['id', 'room', 'room_detail', 'guest_name', 'guest_email', 'guest_phone', 'check_in', 'check_out', 'status', 'number_of_guests', 'special_requests', 'total_price', 'created_at']
        read_only_fields = ['id', 'created_at']


class HotelListSerializer(serializers.ModelSerializer):
    """Serializer pour la liste des hôtels (sans détails complets)"""
    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address', 'city', 'country', 'price_per_night', 'image', 'star_rating', 'status', 'owner_name', 'review_count', 'average_rating', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_review_count(self, obj):
        return obj.reviews.count()
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(r.rating for r in reviews) / len(reviews), 2)
        return 0


class HotelDetailSerializer(serializers.ModelSerializer):
    """Serializer détaillé pour un hôtel"""
    rooms = RoomSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'description', 'address', 'city', 'country', 'email', 'phone', 'website', 'image', 'owner_name', 'status', 'star_rating', 'number_of_rooms', 'price_per_night', 'rooms', 'reviews', 'review_count', 'average_rating', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_review_count(self, obj):
        return obj.reviews.count()
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(r.rating for r in reviews) / len(reviews), 2)
        return 0
