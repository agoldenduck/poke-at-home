import React from 'react'
import PropTypes from 'prop-types'
import ObservableComponent from 'rxjs-react-component'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ShuffleIcon from 'material-ui-icons/Shuffle'
import SentimentVerySatisfiedIcon from 'material-ui-icons/SentimentVerySatisfied'
import SentimentSatisfiedIcon from 'material-ui-icons/SentimentSatisfied'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import pokeStore$, { collectPokemon } from '../../state/pokemon-state'
import RenderList from './RenderList'
import { shuffle } from '../../util'
import { getStandardDeviation } from '../../util/pokeChooser'
import Loading from '../Loading'

const style = theme => ({
  container: {
    width: 296,
    margin: 'auto',
    marginBottom: theme.spacing.unit,
    display: 'flex',

    '@media screen and (min-width: 664px)': {
      width: 616,
    },
    '@media screen and (min-width: 1224px)': {
      width: 936,
    },
    '@media screen and (min-width: 1544px)': {
      width: 1256,
    },
    '@media screen and (min-width: 1864px)': {
      width: 1576,
    },
    '@media screen and (min-width: 2184px)': {
      width: 1896,
    },
    '@media screen and (min-width: 2504px)': {
      width: 2216,
    },
    '@media screen and (min-width: 2824px)': {
      width: 2536,
    },
  },
  card: {
    width: 320,
  },
  icon: {
    marginRight: theme.spacing.unit,
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
    const { data: { error }, classes, theme, randomOnly } = this.props
    const { pokemon, homeReady } = this.state

    if (error) return <p>{error.message}</p>

    if (pokemon.length === 0) return <Loading />

    if (randomOnly || !homeReady) {
      return (
        <div>
          { !randomOnly && (
            <div>
              <div className={classes.container}>
                <ShuffleIcon className={classes.icon} />

                <Typography variant='title'>
                  Randomised Pok&eacute;mon
                </Typography>
              </div>

              <Typography paragraph className={classes.container}>
                To see which Pok&eacute;mon are best suited to your lifestyle and environment, tell us about your home.
              </Typography>
            </div>
          ) }

          <RenderList pokemon={shuffle(pokemon)} className={classes.card} />
        </div>
      )
    }

    const { featureScore: maxFS, envScore: maxES, etv: minETV } = pokemon[0]
    const etvSD = getStandardDeviation(pokemon.map(poke => poke.etv))

    const happyPokemon = pokemon.slice(0, pokemon.findIndex(poke =>
      (poke.etv - minETV) > (etvSD / 2) || poke.featureScore < maxFS || poke.envScore < maxES
    ))

    const contentPokemon = pokemon.slice(happyPokemon.length, pokemon.findIndex(poke =>
      (poke.etv - minETV) > etvSD || poke.featureScore < 0 || poke.envScore < 0
    ))

    return (
      <div>
        <div className={classes.container}>
          <SentimentVerySatisfiedIcon className={classes.icon} style={{color: theme.palette.happy.main}} />

          <Typography variant='title'>
            <span style={{color: theme.palette.happy.main}}>Happy</span> Pok&eacute;mon
          </Typography>
        </div>

        <Typography paragraph className={classes.container}>
          These Pok&eacute;mon will love living with you at your home. Tap each Pok&eacute;mon to find out more about it and what it will love about your home.
        </Typography>

        <RenderList pokemon={happyPokemon} className={classes.card} />

        <div className={classes.container}>
          <SentimentSatisfiedIcon className={classes.icon} />

          <Typography variant='title'>
           Satisfied Pok&eacute;mon
          </Typography>
        </div>

        <Typography paragraph className={classes.container}>
          These Pok&eacute;mon will like living with you at your home. Tap each Pok&eacute;mon to find out more about it and what it will love about your home.
        </Typography>

        <RenderList pokemon={contentPokemon} className={classes.card} />
      </div>
    )
  }
}

PokeList.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
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

export default graphql(POKEMON_QUERY)(withStyles(style, { withTheme: true })(PokeList))
