import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const PokeCards = ({ data: {loading, error, pokemons} }) => {
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <ul>
      { console.log(pokemons )}
      { pokemons.map(poke => <li key={poke.id}>{poke.name}</li>) }
    </ul>
  )
}

const pokemonQuery = gql`
  query PokemonQuery {
   pokemons(first:20) {
     id
     name
   }
  }
`

const PokeCardsWithData = graphql(pokemonQuery)(PokeCards)

export default PokeCardsWithData