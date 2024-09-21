from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Lesson
from package.permissions import IsAdmin
from .serializer import LessonSerializer

# Create your views here.
class LessonList(APIView):
    def get(self, req):
        try:
            lessons = Lesson.objects.all()
            serializer = LessonSerializer(lessons, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LessonByTopicId(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, req, id):
        try:
            lessons = Lesson.objects.filter(topicId=id)
            serializer = LessonSerializer(lessons, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        except Lesson.DoesNotExist:
            return Response({"Error": "The Lesson does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LessonAdd(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, req):
        try:
            serializer = LessonSerializer(data = req.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as err:
            return Response({"Error": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LessonAction(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, req, id):
        try:
            lesson = Lesson.objects.get(id=id)
            serializer = LessonSerializer(lesson, data = req.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Lesson.DoesNotExist:
            return Response({"Error": "The Lesson does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, req, id):
        try:
            lesson = Lesson.objects.get(id=id)
            lesson.delete()
            return Response({"Error": "Lesson deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Lesson.DoesNotExist: 
            return Response({"Error": "Lesson does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)