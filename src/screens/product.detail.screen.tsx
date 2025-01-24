import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      {product && (
        <>
          <ProductDetail
            product={product}
            onFavorite={(product) => addFavorite && addFavorite(product)}
          />
          {product.reviews && product.reviews.length > 0 && (
            <>
              <Text style={styles.reviewsTitle}>Recensioni</Text>
              <FlatList
                data={product.reviews}
                keyExtractor={(item) => item.userId.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewRating}>Voto: {item.rating}/5</Text>
                    <Text>{item.comment}</Text>
                  </View>
                )}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewRating: {
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
});

export default ProductDetailScreen;