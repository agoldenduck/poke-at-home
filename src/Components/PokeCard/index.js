import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardMedia, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = {
  media: {
    height: 300,
  },
}

const PokeCard = ({ pokemon, classes }) => (
  <Card>
    <CardMedia
      image={pokemon.image}
      title={pokemon.name}
      className={classes.media}
    />

    <CardContent>
      <Typography>
        { pokemon.name }
      </Typography>
    </CardContent>
  </Card>
)

PokeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  pokemon: PropTypes.object.isRequired,
}

export default withStyles(styles)(PokeCard)
