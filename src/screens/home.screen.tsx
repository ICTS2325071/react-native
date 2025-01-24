import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { fetchProducts, Product } from '../services/api';
import ProductList from '../components/product.list';
import { HomeStackParamList } from '../navigation/app.navigator';

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <View style={styles.container}>
      <ProductList products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#ffffff' },
});

export default HomeScreen;