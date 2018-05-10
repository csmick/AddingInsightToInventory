from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('start_selling/', views.sales_grid, name='sell'),
    path('past_sales/', views.past_sales, name='sales'),
]
