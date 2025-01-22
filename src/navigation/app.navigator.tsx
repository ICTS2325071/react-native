// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home.screen';
import FavoritesScreen from '../screens/favorites.screen';

export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Prodotti' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Preferiti' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
