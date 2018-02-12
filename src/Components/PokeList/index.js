import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import pokeChooser from '../../util/pokeChooser'
import * as param from '../../util/parameters'
import PokeCard from '../PokeCard/index'
import store$, { collectPokemon } from '../../util/state'

const style = {
  container: {
    padding: 24,
    width: '100%',
  },
  card: {
    width: 300,
  },
}

const PokeList = ({ data: {loading, error, pokemons}, classes }) => {
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  const pokemon = pokeChooser(pokemons, param)

  collectPokemon(pokemon)

  store$.subscribe((state) => console.log({...state}))

  return (
    <Grid container justify='center' className={classes.container} spacing={24}>
      { pokemon.map(poke => (
        <Grid key={poke.id} item className={classes.card}>
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
  classes: PropTypes.object.isRequired,
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

export default graphql(POKEMON_QUERY)(withStyles(style)(PokeList))
