import React from 'react';
import { View, FlatList, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../services/api';

interface FavoritesListProps {
  favorites: Product[];
  onRemoveFavorite: (id: number) => void;
  onProductPress: (id: number) => void; // Aggiunta la prop per navigare alla pagina di dettaglio
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemoveFavorite, onProductPress }) => {
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
        <TouchableOpacity onPress={() => onProductPress(item.id)}> {/* Aggiunto TouchableOpacity */}
          <View style={styles.listContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price} €</Text>
              <Button title="Rimuovi dai Preferiti" onPress={() => onRemoveFavorite(item.id)} />
            </View>
          </View>
        </TouchableOpacity>
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
  listContainer: {
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a135',
  },
});

export default FavoritesList;
