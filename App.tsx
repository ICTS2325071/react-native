import React from 'react';
import { FavoritesProvider } from './src/context/favorites.context';
import AppNavigator from './src/navigation/app.navigator';

const App: React.FC = () => (
  <FavoritesProvider>
    <AppNavigator />
  </FavoritesProvider>
);

export default App;
