from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Notification
from .serializers import NoitificationSerializer



# Fetch function for fetching the data
def fetch(req) :
    allData = Notification.objects.all()
    res = NoitificationSerializer(allData, many=True)

    return Response(res.data, status=status.HTTP_200_OK)

# create function to add the data
def create(req) :
    try :
        data = req.data

        newNotification = Notification(
            title = data['title'],
            color = data['color']
        )
        newNotification.save()
        res = NoitificationSerializer(newNotification)

        return Response(
            res.data,
            status=status.HTTP_200_OK
        )
    except Exception as err :
        return Response(
            {
                'error': str(err)
            },
            status=status.HTTP_424_FAILED_DEPENDENCY
        )

# update function to update the data
def update(req) :
    return Response({
        'message': 'Data has been updated'
    })

# trash function to trash the data
def trash(req) :
    return Response({
        'message': 'Data has been deleted'
    })


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def main(req) :
    if req.method == 'GET' : return fetch(req)
    elif req.method == 'POST' : return create(req)
    elif req.method == 'PUT' : return update(req)
    else : return trash(req)