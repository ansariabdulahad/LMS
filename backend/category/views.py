from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from package.permissions import IsAdmin
from .models import Category
from .serializers import CategorySerializer

# to get list of categories
class CategoryList(APIView):
    def get(self, req):
        try:
            category = Category.objects.all()
            serializer = CategorySerializer(category, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# to add categories
class CategoryAdd(APIView):
    permission_classes = [IsAdmin]

    def post(self, req):
        try:
            serializer = CategorySerializer(data=req.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as err:
            return Response({"Error": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# to perform actions
class CategoryAction(APIView):
    permission_classes = [IsAdmin]

    def put(self, req):
        try:
            category = Category.objects.get(id=id)
            serializer = CategorySerializer(category, data=req.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response({"Error": "Category does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, req, id):
        try:
            category = Category.objects.get(id=id)
            category.delete()
            return Response({
                "message": "Category deleted successfully",
                "success": True
            }, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({"Error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as err:
            return Response({"Error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)