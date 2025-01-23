import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Product } from '../services/api';

interface ProductDetailProps {
  product: Product;
  onFavorite: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onFavorite }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Button title="Aggiungi ai Preferiti" onPress={() => onFavorite(product)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: { width: '100%', height: 200 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  description: { fontSize: 14, color: 'gray', marginVertical: 10 },
  price: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
});

export default ProductDetail;
