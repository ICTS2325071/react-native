// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/context/favorites.context';
import AppNavigator from './src/navigation/app.navigator';

const App: React.FC = () => (
  <FavoritesProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </FavoritesProvider>
);

export default App;