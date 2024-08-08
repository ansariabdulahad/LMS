from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['get', 'post', 'put', 'delete'])
def result(req) :
    if req.method == 'GET' :
        return Response({
            "message": "Get Data"
        })
    elif req.method == 'POST' :
        return Response({
            "message": "Insert Data"
        })
    elif req.method == 'DELETE' :
        return Response({
            "message": "Delete Data"
        })
    elif req.method == 'PUT' :
        return Response({
            "message": "Update Data"
        })