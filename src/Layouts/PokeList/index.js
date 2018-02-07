import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Grid from 'material-ui/es/Grid'

import pokeChooser from '../../util/pokeChooser'
import * as param from '../../util/parameters'
import PokeCard from '../../Components/PokeCard'

const PokeList = ({ data: {loading, error, pokemons} }) => {
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  const pokemon = pokeChooser(pokemons, param)

  console.log(pokemon)

  return (
    <Grid container justify='center' spacing={24}>
      { pokemon.map(poke => (
        <Grid key={poke.id} item xs={12} sm={3}>
          <PokeCard
            pokemon={poke}
          />
        </Grid>
      )) }
    </Grid>
  )
}

PokeList.propTypes = {
  data: PropTypes.object.isRequired,
}

const POKEMON_QUERY = gql`
  query PokemonQuery {
    pokemons(first:151) {
      id
      name
      image
      weight {
        maximum
      }
      types
    }
  }
`

export default graphql(POKEMON_QUERY)(PokeList)
