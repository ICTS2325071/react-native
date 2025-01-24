import React, { useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FavoritesStackParamList } from '../navigation/app.navigator';
import { FavoritesContext } from '../context/favorites.context';
import { Product } from '../services/api';

type FavoritesScreenProps = StackScreenProps<FavoritesStackParamList, 'Favorites'>;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { favorites, removeFavorite } = useContext(FavoritesContext) ?? {};

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={styles.starFull}>★</Text>
        ))}
        {halfStar === 1 && <Text style={styles.starHalf}>½</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={styles.starEmpty}>★</Text>
        ))}
      </View>
    );
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { id: product.id });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productContainer} 
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.ratingPriceContainer}>
          {renderStars(item.rating.rate)}
          <Text style={styles.productPrice}>{item.price.toFixed(2)} €</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeFavorite && removeFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>Rimuovi dai Preferiti</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nessun preferito salvato.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
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
  productCategory: {
    color: '#666',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starFull: {
    color: '#FFD700',
    fontSize: 16,
  },
  starHalf: {
    color: '#FFD700',
    fontSize: 16,
  },
  starEmpty: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a135',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default FavoritesScreen;