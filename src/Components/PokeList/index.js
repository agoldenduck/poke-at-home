import React from 'react'
import PropTypes from 'prop-types'
import ObservableComponent from 'rxjs-react-component'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import PokeCard from '../PokeCard/index'
import pokeStore$, { collectPokemon } from '../../state/pokemon-state'
import RandomList from './RandomList'
import { shuffle } from '../../util'

const style = theme => ({
  container: {
    width: 936,
    margin: 'auto',
    marginBottom: theme.spacing.unit,
  },
  card: {
    width: 320,
  },
})

class PokeList extends ObservableComponent {
  componentWillMount$ () {
    return pokeStore$
  }

  componentWillReceiveProps (nextProps) {
    const { data: { pokemons } } = nextProps

    if (typeof pokemons !== 'undefined') collectPokemon(pokemons)
  }

  render () {
    const { data: { loading, error }, classes, randomOnly } = this.props
    const { pokemon, homeReady } = this.state

    if (loading) return <p>loading</p>
    if (error) return <p>{error.message}</p>

    if (randomOnly || !homeReady) {
      return (
        <RandomList pokemon={shuffle(pokemon)} className={classes.card} />
      )
    }

    return (
      <div>
        <Typography className={classes.container} variant='title'>Happy Pok&eacute;mon</Typography>

        <Grid container justify='center' spacing={24}>
          { pokemon.filter(poke => poke.etv < 5).map(poke => (
            <Grid key={poke.id} item className={classes.card}>
              <PokeCard
                pokemon={poke}
              />
            </Grid>
          )) }
        </Grid>
      </div>
    )
  }
}

PokeList.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  randomOnly: PropTypes.bool,
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
