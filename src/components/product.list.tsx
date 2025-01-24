import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/favorites.context';
import { Product } from '../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/app.navigator';

interface ProductListProps {
  products: Product[];
}

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addFavorite } = useContext(FavoritesContext) ?? {};
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>          
          <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price} €</Text>
              <Button title="Aggiungi ai Preferiti" onPress={() => addFavorite && addFavorite(item)} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50, 
    marginRight: 10,
    borderRadius: 5,
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
    marginVertical: 5,
  },
});

export default ProductList;
