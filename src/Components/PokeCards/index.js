import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import pokeChooser, {
  averageMaxDimension, maxMaxDimension, minMaxDimension,
  standardDeviationMaxDimension,
} from '../../util/pokeChooser'
import * as param from '../../util/parameters'

const PokeCards = ({ data: {loading, error, pokemons} }) => {
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  // const pokemon = sortPokemonByEnvironments(pokemons, env.filter(en => ['coastal', 'urban'].includes(en.type)))

  return (
    <ul>
      { console.log(
        'Min weight:    ', minMaxDimension(pokemons, 'weight'),
        '\nAverage weight:', averageMaxDimension(pokemons, 'weight'),
        '\nMax weight:    ', maxMaxDimension(pokemons, 'weight'),
        '\nStd Dev weight:', standardDeviationMaxDimension(pokemons, 'weight'),
        '\n\nMin height:    ', minMaxDimension(pokemons, 'height'),
        '\nAverage height:', averageMaxDimension(pokemons, 'height'),
        '\nMax height:    ', maxMaxDimension(pokemons, 'height'),
        '\nStd Dev height:', standardDeviationMaxDimension(pokemons, 'height')
      ) }
      { pokemons.map(poke => <li key={poke.id}>{poke.name}</li>) }
      { console.log(pokeChooser(pokemons, param)) }
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
