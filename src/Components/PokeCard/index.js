import React from 'react'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const PokeCard = props => (
  <Card>
    <CardContent>
      <Typography>
        { props.children }
      </Typography>
    </CardContent>
  </Card>
)

export default PokeCard
