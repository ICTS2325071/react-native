import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/home.screen';
import FavoritesScreen from '../screens/favorites.screen';
import ProductDetailScreen from '../screens/product.detail.screen';

export type RootTabParamList = {
  HomeStack: undefined;
  Favorites: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'Prodotti' }} 
    />
    <HomeStack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen} 
      options={{ title: 'Dettaglio Prodotto' }} 
    />
  </HomeStack.Navigator>
);

const AppNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';
        if (route.name === 'HomeStack') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'heart' : 'heart-outline';
        }
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen 
      name="HomeStack" 
      component={HomeStackNavigator} 
      options={{ title: 'Prodotti' }} 
    />
    <Tab.Screen 
      name="Favorites" 
      component={FavoritesScreen} 
      options={{ title: 'Preferiti' }} 
    />
  </Tab.Navigator>
);

export default AppNavigator;