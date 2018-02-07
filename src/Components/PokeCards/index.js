import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import pokeChooser from '../../util/pokeChooser'
import * as param from '../../util/parameters'

const PokeCards = ({ data: {loading, error, pokemons} }) => {
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  const pokemon = pokeChooser(pokemons, param)

  console.log(pokemon)

  return (
    <ul>
      { pokemon.map(poke => <li key={poke.id}>{poke.name}</li>) }
    </ul>
  )
}

PokeCards.propTypes = {
  data: PropTypes.object.isRequired,
}

const POKEMON_QUERY = gql`
  query PokemonQuery {
    pokemons(first:151) {
      id
      name
      weight {
        maximum
      }
      height {
        maximum
      }
      types
    }
  }
`

const PokeCardsWithData = graphql(POKEMON_QUERY)(PokeCards)

export default PokeCardsWithData
