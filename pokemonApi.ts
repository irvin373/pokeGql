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
  }
  total_counter: pokemon_v2_pokemonspecies_aggregate{
      aggregate{
        count
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
