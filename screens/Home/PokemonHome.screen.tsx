import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MyText from '../../components/MyText.component';
import {getPokemons} from '../../service/pokemonApi';
import colors from '../../Utils/colors';

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
  const [offtet, setOffset] = useState(25);
  const renderPokemonInfo = ({item}: {item: Pokemon}) =>
  <TouchableOpacity onPress={() => {goToDetails(item)}} style={cardStyles.shadow}>
    <View style={[cardStyles.container, {margin: 10, flexDirection: 'row'}]}>
      <Image style={{height: 100, width: 100}} source={{uri: getPokemonImageUri(item.id)}} />
      <View style={{marginLeft: 12}}>
        <MyText size='big' title={item.name} />
        <MyText size='small' color={colors.lightGray} title={`#${item.id}`} />
      </View>
    </View>
  </TouchableOpacity>

  const getMorePokemons = () => {
    getPokemons(25, offtet).then((data: any) => {
      setPokemons([...pokemons, ...data.pokemons.results]);
      setOffset(offtet + 25);
    }).catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    getPokemons(25).then((data: any) => {
      setPokemons(data.pokemons.results);
    }).catch(e => {
      console.log(e);
    })
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderPokemonInfo}
        onEndReached={getMorePokemons}
        onEndReachedThreshold={10}
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