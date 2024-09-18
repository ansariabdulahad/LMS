from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from package.permissions import IsAdmin
from .models import Topic
from .serializers import TopicSerializer

# Create your views here.
class TopicList(APIView):
    def get(self, req):
        try:
            topics = Topic.objects.all()
            serializer = TopicSerializer(topics, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            return Response({'Error': str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class TopicByCourseId(APIView):
    def get(self, req, id):
        try:
            topics = Topic.objects.filter(courseId=id)
            serializer = TopicSerializer(topics, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Topic.DoesNotExist:
            return Response({"Error": str(err)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TopicAdd(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, req):
        try:
            serializer = TopicSerializer(data=req.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as err:
            return Response({"Error": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TopicAction(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, req, id):
        try:
            topic = Topic.objects.get(id=id)
            serializer = TopicSerializer(topic, data=req.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Topic.DoesNotExist:
            return Response({"Error": "Topic does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, req, id):
        try:
            topic = Topic.objects.get(id=id)
            topic.delete()
            return Response({
                "success": True,
                "message": "Topic deleted successfully"
            }, status=status.HTTP_204_NO_CONTENT)
        except Topic.DoesNotExist:
            return Response({'Error': 'Topic does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)