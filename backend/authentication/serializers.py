from rest_framework import serializers
from .models import Auth

class AuSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Auth
        fields = '__all__'

    def validate(self, attrs):
        return super().validate(attrs)