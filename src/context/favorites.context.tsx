import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../services/api';

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Funzione per caricare i preferiti da AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Errore durante il caricamento dei preferiti:', error);
    }
  };

  // Funzione per salvare i preferiti su AsyncStorage
  const saveFavorites = async (newFavorites: Product[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Errore durante il salvataggio dei preferiti:', error);
    }
  };

  // Aggiunge un prodotto ai preferiti
  const addFavorite = (product: Product) => {
    if (!favorites.find((item) => item.id === product.id)) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites); // Salva i preferiti aggiornati
    }
  };

  // Rimuove un prodotto dai preferiti
  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites); // Salva i preferiti aggiornati
  };

  // Carica i preferiti all'avvio
  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
