import React from 'react'
import PropTypes from 'prop-types'
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
      { console.log(pokemons) }
      { pokemons.map(poke => <li key={poke.id}>{poke.name}</li>) }
    </ul>
  )
}

PokeCards.propTypes = {
  data: PropTypes.object.required,
}

const pokemonQuery = gql`
  query PokemonQuery {
   pokemons(first:151) {
     id
     name
   }
  }
`

const PokeCardsWithData = graphql(pokemonQuery)(PokeCards)

export default PokeCardsWithData
