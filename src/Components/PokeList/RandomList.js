import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'

import PokeCard from '../PokeCard'

const RandomList = ({ className, pokemon }) => (
  <Grid container justify='center' spacing={24}>
    { pokemon.map(poke => (
      <Grid key={poke.id} item className={className}>
        <PokeCard
          pokemon={poke}
        />
      </Grid>
    )) }
  </Grid>
)

RandomList.propTypes = {
  className: PropTypes.string,
  pokemon: PropTypes.array.isRequired,
}

export default RandomList
