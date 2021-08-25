import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

const httpLink = createHttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

const GET_POKEMONS = gql`
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
}`;

export const fetchOnePokemon = async (limit: number, offset: number = 0): Promise<any | null> => {
  const res = await client
    .query({
      query: GET_POKEMONS,
      variables: { 
        limit,
        offset,
      },
    })
    .catch((e) => console.error(e));
  if (res && res.data) {
    return res.data;
  }
  return null;
};