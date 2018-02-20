import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardMedia, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import PokeChip from '../PokeChip'

const styles = theme => ({
  card: {
    cursor: 'pointer',
  },
  media: {
    height: 280,
  },
  chipContainer: {
    marginLeft: -theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
})

const PokeCard = ({ pokemon, classes }) => (
  <Card className={classes.card}>
    <CardMedia
      image={pokemon.image}
      title={pokemon.name}
      className={classes.media}
    />

    <CardContent>
      <Typography variant='headline' component='h2'>
        { pokemon.name }
      </Typography>

      <div className={classes.chipContainer}>
        { pokemon.types.map((type, i) => <PokeChip key={i} type={type} overrideClassNames={classes.chip} />) }
      </div>
    </CardContent>
  </Card>
)

PokeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  pokemon: PropTypes.object.isRequired,
}

export default withStyles(styles)(PokeCard)
