from django.urls import path
from .views import CategoryList, CategoryDetail
from .views import CategoryTreeView
from .views import ProductListCreateView
from categories.views import ProductDetailView

urlpatterns = [
    path('', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('categories/', CategoryTreeView.as_view(), name='category-tree'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail')
]
