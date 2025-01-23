import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue: string) => onCategoryChange(itemValue)}
        style={styles.picker}
      >
      <Picker.Item label="Tutte le categorie" value="" />
      {categories.map((category) => (
        <Picker.Item key={category} label={category} value={category} />
      ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 10, 
    backgroundColor: '#f5f5f5' 
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default FilterBar;
