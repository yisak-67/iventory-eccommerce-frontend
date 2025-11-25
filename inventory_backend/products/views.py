from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer

def build_json_filter(key, value):
    parts = key.split('.')
    lookup = "__".join(['attributes', *parts])
    return Q(**{lookup: value})
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


    @action(detail=False, methods=['get'])
    def search(self, request):
        json_filters = Q()
        for key, value in request.query_params.items():
            if key in ['page', 'page_size', 'name', 'price_min', 'price_max']:
                continue
            json_filters &= build_json_filter(key, value)
     
        if json_filters:
            queryset = queryset.filter(json_filters)
        
        # Handle regular field searches
        name_query = query_params.get('name', '')
        if name_query:
            queryset = queryset.filter(name__icontains=name_query)
        
        price_min = query_params.get('price_min')
        price_max = query_params.get('price_max')
        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)