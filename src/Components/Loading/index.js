import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

const Loading = ({ classes }) => (
  <Grid container className={classes.container}>
    <CircularProgress
      className={classes.progress}
      size={50}
      color='secondary'
    />
  </Grid>
)

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loading)
