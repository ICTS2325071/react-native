// src/components/FilterBar.tsx
import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';

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
        onValueChange={(itemValue) => onCategoryChange(itemValue)}
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
  container: { padding: 10, backgroundColor: '#f5f5f5' },
});

export default FilterBar;
