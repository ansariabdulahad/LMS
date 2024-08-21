from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class Login(APIView) :
    def post(self, req) :
        return Response({"success": True}, status=status.HTTP_200_OK)
    
class Register(APIView) :
    def post(self, req) :
        return Response({"success": True}, status=status.HTTP_200_OK)
    
class ForgotPassword(APIView) :
    def post(self, req) :
        return Response({"success": True}, status=status.HTTP_200_OK)