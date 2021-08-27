import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first"
    }
  }
});

const GET_POKEMON = gql`
  query getPokemon($limit: Int, $offset: Int) {
  pokemons: pokemon_v2_pokemonspecies(
    limit: $limit,
    offset: $offset,
    order_by: {id: asc}
  ){
    id
    name
    color: pokemon_v2_pokemoncolor {
      name
    }
  }
  total_counter: pokemon_v2_pokemonspecies_aggregate{
      aggregate{
        count
      }
    }
}
`;

const GET_POKEMON_BY_ID = gql`
query getPokemonById($id: Int!) {
  info: pokemon_v2_pokemonspecies_by_pk(id: $id) {
    id
    name
    description: pokemon_v2_pokemonspeciesflavortexts(where: {id: {_eq: $id}}){
      flavor_text,
      version: pokemon_v2_version{
        name
      }
    }
    habitad: pokemon_v2_pokemonhabitat{
      name
    }
    color: pokemon_v2_pokemoncolor {
      name
    }
    evolution_chain: pokemon_v2_evolutionchain {
      species: pokemon_v2_pokemonspecies {
        id
        name
        color: pokemon_v2_pokemoncolor {
          name
        }
      }
    }
  }
  details: pokemon_v2_pokemon_by_pk(id: $id) {
    types: pokemon_v2_pokemontypes(
      where: { pokemon_id: { _eq: $id } }
    ) {
      type: pokemon_v2_type {
        name
      }
    }
    stats: pokemon_v2_pokemonstats {
      base_stat
      effort
      stat_id
    }
  }
}
`;

export const getPokemons = async (limit: number, offset: number = 0) : Promise<any | null> => {
  const res = await client.query({
    query: GET_POKEMON,
    variables: {
      limit,
      offset
    }
  }).catch((e) => {
    console.log(e);
  });
  if (res && res.data) {
    return res.data;
  }
  return null;
}

export const getPokemonsById = async (id: number) : Promise<any | null> => {
  const res = await client.query({
    query: GET_POKEMON_BY_ID,
    variables: {
      id
    }
  }).catch((e) => {
    console.log(e);
  });
  if (res && res.data) {
    console.log('-->', res.data);
    return res.data;
  }
  return null;
}
