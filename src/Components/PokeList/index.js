import React from 'react'
import PropTypes from 'prop-types'
import ObservableComponent from 'rxjs-react-component'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import PokeCard from '../PokeCard/index'
import pokeStore$, { collectPokemon } from '../../state/pokemon-state'

const style = {
  container: {},
  card: {
    width: 300,
  },
}

class PokeList extends ObservableComponent {
  componentWillMount$ () {
    return pokeStore$
  }

  componentWillReceiveProps (nextProps) {
    const { data: { pokemons } } = nextProps

    if (typeof pokemons !== 'undefined') collectPokemon(pokemons)
  }

  render () {
    const { data: { loading, error }, classes } = this.props
    const { pokemon } = this.state

    if (loading) return <p>loading</p>
    if (error) return <p>{error.message}</p>

    console.log(pokemon)

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
