from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Notification
from .serializers import NoitificationSerializer

class NotificationList(APIView) :
    def get(self, req) :
        data = Notification.objects.all()
        serialize = NoitificationSerializer(data, many=True)
        return Response(serialize.data, status=status.HTTP_200_OK)

    def post(self, req) :
        try :
            data = req.data
            newNotification = Notification(**data)
            newNotification.save()
            serialize = NoitificationSerializer(newNotification)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as err :
            return Response({ "error" : str(err) }, status=status.HTTP_424_FAILED_DEPENDENCY)

class NotificationDetail(APIView) :
    # Practice for geting data by id
    """def get(self, req, id) :
        try : data = Notification.objects.get(id=id)
        except Notification.DoesNotExist :
            return Response({ "error" : F"{id} Id not found" }, status=status.HTTP_404_NOT_FOUND)
        
        serialize = NoitificationSerializer(data)
        return Response(serialize.data, status=status.HTTP_200_OK)"""
    
    def put(self, req, id) :
        try : data = Notification.objects.get(id=id)
        except Notification.DoesNotExist :
            return Response({ "error" : F"{id} Id does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        serialize = NoitificationSerializer(data, data=req.data, partial=True)

        if serialize.is_valid() :
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)

        return Response({ "error" : 'Notification update failed' }, status=status.HTTP_424_FAILED_DEPENDENCY)

    def delete(self, req, id) :
        try : data = Notification.objects.get(id=id)
        except Notification.DoesNotExist :
            return Response({ "error" : F"{id} Id does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        data.delete()

        return Response(
            {
                "message": "Notification deleted successfully",
                "success": True
            },
            status=status.HTTP_200_OK
        )