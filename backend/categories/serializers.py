from rest_framework import serializers
from .models import Category, Product

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())  # Перевіряє категорію

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category']


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    products = ProductSerializer(many=True, read_only=True)  # Додати продукти до категорій

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'subcategories', 'products']

    def get_subcategories(self, obj):
        subcategories = obj.subcategories.all()
        return CategorySerializer(subcategories, many=True).data

