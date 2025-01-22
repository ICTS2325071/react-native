// src/App.tsx
import React from 'react';
import AppNavigator from './navigation/app.navigator';
import { FavoritesProvider } from './context/favorites.context';

const App: React.FC = () => (
  <FavoritesProvider>
    <AppNavigator />
  </FavoritesProvider>
);

export default App;
