import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/favorites.context';
import { Product } from '../services/api';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addFavorite } = useContext(FavoritesContext) ?? {};

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Button title="Aggiungi ai Preferiti" onPress={() => addFavorite && addFavorite(item)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 16 },
});

export default ProductList;
