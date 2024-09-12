from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from package.permissions import IsAdmin
from .models import Course
from .serializers import CourseSerializer

# Create your views here.
# to get list of courses
class CourseList(APIView):
    def get(self, req):
        try:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

# To add new course
class CourseAdd(APIView):
    permission_classes = [IsAdmin] # to protect this route access, only admin can use

    def post(self, req):
        try:
            # Use serializer to validate the data
            serializer = CourseSerializer(data=req.data)
            
            if serializer.is_valid():
                # Save the course if data is valid
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # Return validation errors if data is not valid
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as err:
            return Response({"error": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

# to perform some actions
class CourseAction(APIView):
    permission_classes = [IsAdmin]

    def put(self, req, id):
        try:
            course = Course.objects.get(id=id)
            serializer = CourseSerializer(course, data=req.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({"Error", f"Course does not exist with this ${id}"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error", str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, req, id):
        try:
            course = Course.objects.get(id=id)
            course.delete()
            return Response({
                "message": "Course deleted successfully",
                "success": True
            }, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({"Error": f"Course does not exist with this ${id}"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error", str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)