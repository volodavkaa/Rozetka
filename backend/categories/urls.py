from django.urls import path
from .views import CategoryList, CategoryDetail
from .views import CategoryTreeView
from .views import ProductListCreateView
urlpatterns = [
    path('', CategoryList.as_view(), name='category-list'),
    path('<int:pk>/', CategoryDetail.as_view(), name='category-detail'),  
    path('categories/', CategoryTreeView.as_view(), name='category-tree'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
]
