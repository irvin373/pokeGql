import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {getPokemons} from './pokemonApi';
import { Card } from 'react-native-material-ui';

function getPokemonImageUri (id: number) {
  const imageId = ('00' + id).slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
}

// style={{flex: 1, borderColor: '000', borderWidth: 1, padding: 16, alignItems: 'center', margin: 8, borderRadius: 20}}

const HomeScreen = (props) => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const renderPokemonInfo = ({item}: {item: any}) =>
  <View>
    <Card>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Image style={{height: 100, width: 100}} source={{uri: getPokemonImageUri(item.id)}} />
    </Card>
  </View>

  getPokemons(25).then((data) => {
    setPokemons(data.pokemons);
  })
  return (
    <View style={[styles.root]}>
      <FlatList
        data={pokemons}
        renderItem={renderPokemonInfo}
      />
    </View>
  );
};
Navigation.registerComponent('Home', () => HomeScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});