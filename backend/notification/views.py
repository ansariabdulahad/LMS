from rest_framework.response import Response
from rest_framework.decorators import api_view

# Fetch function for fetching the data
def fetch(req) :
    return Response({
        'message': 'Data has been fetched'
    })

# create function to add the data
def create(req) :
    return Response({
        'message': 'Data has been created'
    })

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