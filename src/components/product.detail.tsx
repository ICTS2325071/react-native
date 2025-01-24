import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { Product } from '../services/api';

interface ProductDetailProps {
  product: Product;
  onFavorite: (product: Product) => void;
}

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

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onFavorite }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.productInfoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        
        {/* Product Type/Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Tipo di Prodotto: </Text>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        
        {/* Rating Display */}
        <View style={styles.ratingContainer}>
          {renderStars(product.rating.rate)}
          <Text style={styles.ratingText}>
            ({product.rating.rate.toFixed(1)}) - {product.rating.count} recensioni
          </Text>
        </View>
        
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
        
        <Button title="Aggiungi ai Preferiti" onPress={() => onFavorite(product)} />
      </View>
      
      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsSectionTitle}>Recensioni</Text>
          {product.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewRating}>Voto: {review.rating}/5</Text>
                <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9',
  },
  image: { 
    width: '100%', 
    height: 300, 
    resizeMode: 'cover' 
  },
  productInfoContainer: {
    padding: 15,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  categoryText: {
    color: '#333',
    textTransform: 'capitalize',
  },
  ratingContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  starFull: {
    color: '#FFD700',
    fontSize: 20,
  },
  starHalf: {
    color: '#FFD700',
    fontSize: 20,
  },
  starEmpty: {
    color: '#CCCCCC',
    fontSize: 20,
  },
  ratingText: {
    color: '#666',
  },
  description: { 
    fontSize: 16, 
    color: '#666', 
    marginVertical: 10 
  },
  price: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#007bff',
    marginBottom: 15,
  },
  reviewsSection: {
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  reviewsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewRating: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewComment: {
    color: '#333',
  },
});

export default ProductDetail;