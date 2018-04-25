from django.core import serializers
from django.shortcuts import render
from django.templatetags.static import static

import json
import os

from .models import Item, SoldItem, Transaction

# Create your views here.

def index(request):
    return render(request, 'start_selling/index.html')

def sales_grid(request):
    items = Item.objects.all()
    for item in items:
        item.image = static(item.image.url)
    data = {'items':serializers.serialize('json', items)}
    return render(request, 'start_selling/sales-grid.html', context=data)
