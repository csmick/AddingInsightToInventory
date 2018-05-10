from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('start_selling/', views.sales_grid, name='sales'),
	path('checkout/', views.checkout, name='checkout'),
]
