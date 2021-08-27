import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screens/Home/PokemonHome.screen';
import PokemonDetails from '../screens/PokemonDetails/PokemonDetails.screen';

export function registerScreen () {
  Navigation.registerComponent('Home', () => HomeScreen);
  Navigation.registerComponent('Details', () => PokemonDetails);
}

export function init() {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Home',
              },
            },
          ]
        }
      }
    });
  });
}