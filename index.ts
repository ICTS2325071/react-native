import { AppRegistry } from 'react-native';
import App from './App'; // Percorso del file principale dell'app
import { name as appName } from './app.json';

// Registra il componente principale
AppRegistry.registerComponent(appName, () => App);
