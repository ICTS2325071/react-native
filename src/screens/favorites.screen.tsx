import React, { useContext } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/favorites.context';

const FavoritesScreen: React.FC = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext) ?? {};

  return (
    <View style={styles.container}>
      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price} €</Text>
              <Button
                title="Rimuovi dai Preferiti"
                onPress={() => removeFavorite && removeFavorite(item.id)}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Nessun preferito salvato.</Text>
      )}
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
  emptyText: { textAlign: 'center', fontSize: 16, color: 'gray', marginTop: 20 },
});

export default FavoritesScreen;
