from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import AuSerializer

class TokenSerializer(TokenObtainPairSerializer) :
    def get_token(cls, user) :
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['fullname'] = user.fullname
        token['mobile'] = user.mobile
        token['gender'] = user.gender
        token['country'] = user.country
        token['fatherName'] = user.fatherName
        token['qualifications'] = user.qualifications
        token['courses'] = user.courses
        token['userType'] = user.userType
        token['address'] = user.address
        token['image'] = user.image

        return token

class Login(TokenObtainPairView) :
    serializer_class = TokenSerializer

class Register(APIView) :
    def post(self, req) :
        serializer = AuSerializer(data = req.data)

        if serializer.is_valid() :
            user = serializer.save()
            user.set_password(req.data.get('password'))
            user.is_active = True
            user.save()
            return Response(
                serializer.data, 
                status=status.HTTP_200_OK
                )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class ForgotPassword(APIView) :
    def post(self, req) :
        return Response({"success": True}, status=status.HTTP_200_OK)