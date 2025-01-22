// src/screens/HomeScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { fetchProducts, Product } from '../services/api';
import { FavoritesContext } from '../context/favorites.context';

const HomeScreen: React.FC = () => {
  const { addFavorite } = useContext(FavoritesContext) ?? {}; // Accesso al contesto dei preferiti
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts); // Carica i prodotti dall'API
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} €</Text>
            <Button
              title="Aggiungi ai Preferiti"
              onPress={() => addFavorite && addFavorite(item)} // Aggiunge ai preferiti
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#ffffff' },
  item: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'gray', marginBottom: 5 },
});

export default HomeScreen;
