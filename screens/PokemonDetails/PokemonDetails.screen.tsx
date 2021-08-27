import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {getPokemonsById} from '../../service/pokemonApi';

function getPokemonImageUri (id: number) {
  const imageId = ('00' + id).slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
}

type PokemonInfo = {
  details: {
    types: {
      name: string
    }[]
  }
  info: {
    evolution_chain: {
      species: {
        id: number
        name: string
      }[]
    }
    color: {
      name: string
    }
    habitad: {
      name: string
    }
    name: string
    id: number
  }
}

type Props = {
  pokemonId: number
}

const PokemonDetails = (props: Props) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();
  useEffect(() => {
    getPokemonsById(props.pokemonId).then(data => {
      setPokemonInfo(data);
    });
  }, []);
  if (!pokemonInfo) {
    return <Text>{'Cargando datos...'}</Text>
  }
  return (
    <ScrollView style={{flex: 1}}>
      <Image style={{height: 150, width: 150}} source={{uri: getPokemonImageUri(props.pokemonId)}} />

      <View style={styles.information}>
        <Text>{`N. Pokedex: ${pokemonInfo.info.id}`}</Text>
        <Text>{pokemonInfo.info.name}</Text>
        <Text>{pokemonInfo.info.habitad.name}</Text>
      </View>
      <Text>{'Evoluciones del pokemon: '}</Text>
      <View style={{flexDirection: 'row'}}>
        {pokemonInfo.info.evolution_chain.species.map(pokemon => 
          <View style={{padding: 12}}>
            <Image style={{height: 50, width: 50}} source={{uri: getPokemonImageUri(pokemon.id)}} />
            <Text>{pokemon.name}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  information: {
    alignItems: 'center',
    marginTop: 21,
  }
});