import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {getPokemons} from '../../service/pokemonApi';

type Pokemon = {
  name: string
  id: number
  color: {
    name: string
  }
}

function getPokemonImageUri (id: number) {
  const imageId = ('00' + id).slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
}

const HomeScreen = (props: any) => {
  const goToDetails = (pokemon: Pokemon) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Details',
        passProps: {pokemonId: pokemon.id},
        options: {
          topBar: {
            title: {
              text: pokemon.name,
              color: 'white'
            },
            background: {
              color: pokemon.color.name
            }
          }
        }
      }
    });
  }

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const renderPokemonInfo = ({item}: {item: Pokemon}) =>
  <TouchableOpacity onPress={() => {goToDetails(item)}} style={cardStyles.shadow}>
    <View style={[cardStyles.container, {margin: 10}]}>
      <Image style={{height: 100, width: 100}} source={{uri: getPokemonImageUri(item.id)}} />
      <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>

  getPokemons(25).then((data: any) => {
    setPokemons(data.pokemons);
  })
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={pokemons}
        renderItem={renderPokemonInfo}
      />
    </View>
  );
};

export default HomeScreen;

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  shadow: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});