import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'

import PokeCard from '../PokeCard'

const RenderList = ({ className, pokemon }) => (
  <Grid container justify='center' spacing={24} style={{marginBottom: 24}}>
    { pokemon.map(poke => (
      <Grid key={poke.id} item className={className}>
        <PokeCard
          pokemon={poke}
        />
      </Grid>
    )) }
  </Grid>
)

RenderList.propTypes = {
  className: PropTypes.string,
  pokemon: PropTypes.array.isRequired,
}

export default RenderList
