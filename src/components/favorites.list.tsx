// src/components/FavoritesList.tsx
import React from 'react';
import { View, FlatList, Text, Image, Button, StyleSheet } from 'react-native';
import { Product } from '../services/api';

interface FavoritesListProps {
  favorites: Product[];
  onRemoveFavorite: (id: number) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Non ci sono preferiti salvati.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} €</Text>
            <Button title="Rimuovi dai Preferiti" onPress={() => onRemoveFavorite(item.id)} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});

export default FavoritesList;
