from rest_framework import generics
from .serializers import ProduceSerializer
from .models import Produce
# Create your views here.

class ProduceList(generics.ListCreateAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer

class ProduceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer
