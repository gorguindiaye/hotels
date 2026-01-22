from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import HotelAdmin


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            try:
                user = HotelAdmin.objects.get(email=email)
            except HotelAdmin.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password.')

            user = authenticate(username=user.username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid email or password.')

            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')

            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include "email" and "password".')

        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True, max_length=150)
    hotel_name = serializers.CharField(required=True, max_length=255)

    class Meta:
        model = HotelAdmin
        fields = ('username', 'email', 'password', 'password_confirm', 'hotel_name', 'first_name', 'last_name', 'phone')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        
        if HotelAdmin.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Un compte avec cet email existe déjà."})
        
        if HotelAdmin.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Ce nom d'utilisateur est déjà pris."})
        
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = HotelAdmin.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelAdmin
        fields = ('id', 'username', 'email', 'hotel_name', 'first_name', 'last_name')

