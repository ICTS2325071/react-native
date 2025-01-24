import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ProductDetail from '../components/product.detail';
import { fetchProductDetails, Product } from '../services/api';
import { HomeStackParamList } from '../navigation/app.navigator';
import { FavoritesContext } from '../context/favorites.context';

type ProductDetailScreenProps = StackScreenProps<HomeStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite } = useContext(FavoritesContext) ?? {};

  useEffect(() => {
    fetchProductDetails(route.params.id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [route.params.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {product && (
        <ProductDetail
          product={product}
          onFavorite={(product) => addFavorite && addFavorite(product)}
        />
      )}
    </View>
  );
};

export default ProductDetailScreen;