import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ProductDetail from '../components/product.detail';
import { fetchProductDetails, Product } from '../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/app.navigator';
import { FavoritesContext } from '../context/favorites.context';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { params } = useRoute<ProductDetailScreenRouteProp>();
  const { addFavorite } = useContext(FavoritesContext) ?? {};

  useEffect(() => {
    fetchProductDetails(params.id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [params.id]);

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
