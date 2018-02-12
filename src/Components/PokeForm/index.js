import React from 'react'
import ObservableComponent from 'rxjs-react-component'
import PropTypes from 'prop-types'
import { FormLabel, FormControlLabel, FormGroup } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import store$, { setList, setProperty } from '../../util/state'
import * as param from '../../util/parameters'

const style = {
  container: {
    padding: 24,
    width: 'calc(100% - 48px)',
  },
  select: {
    width: '100%',
  },
  paper: {
    padding: 24,
  },
  legend: {
    marginTop: 24,
  },
}

class PokeForm extends ObservableComponent {
  componentWillMount$ () {
    return store$
  }

  render () {
    const { classes } = this.props
    console.log(this.state)
    return (
      <div className={classes.container}>
        <Typography variant='title'>Describe your home</Typography>

        <FormLabel className={classes.legend} component='legend'>Residence Size</FormLabel>

        <FormGroup>
          <TextField
            select
            margin='normal'
            label='Property type'
            name='type'
            value={this.state.propertyType}
            onChange={e => setProperty('type', e.target.value)}
            className={classes.select}
          >
            <MenuItem value={1}>
                  Apartment
            </MenuItem>

            <MenuItem value={1.5}>
                  House
            </MenuItem>
          </TextField>
        </FormGroup>

        <FormGroup>
          <TextField
            select
            margin='normal'
            label='Bedrooms'
            name='rooms'
            value={this.state.rooms}
            onChange={e => setProperty('rooms', e.target.value)}
            className={classes.select}
          >
            <MenuItem value={1}>
                  1
            </MenuItem>

            <MenuItem value={2}>
                  2
            </MenuItem>

            <MenuItem value={3}>
                  3
            </MenuItem>

            <MenuItem value={4}>
                  4
            </MenuItem>

            <MenuItem value={5}>
                  5+
            </MenuItem>
          </TextField>
        </FormGroup>

        <FormGroup>
          <TextField
            select
            margin='normal'
            label='Yard size'
            name='yard'
            value={this.state.yard}
            onChange={e => setProperty('yard', e.target.value)}
            className={classes.select}
          >
            <MenuItem value={0}>
                  No yard
            </MenuItem>

            <MenuItem value={2}>
                  Small yard
            </MenuItem>

            <MenuItem value={4}>
                  Big yard
            </MenuItem>

            <MenuItem value={6}>
                  Paddocks
            </MenuItem>
          </TextField>
        </FormGroup>

        <FormLabel className={classes.legend} component='legend'>Residence Environments</FormLabel>

        <TextField
          select
          margin='normal'
          SelectProps={{
            multiple: true,
            renderValue: selected => (
              <div>
                {selected.map(value => <Chip key={value} label={value} />)}
              </div>
            ),
          }}
          value={this.state.environments}
          name='environments'
          label='Environments'
          onChange={e => setProperty('env', e.target.value)}
          className={classes.select}
        >
          {param.env.map(env => (
            <MenuItem
              key={env.type}
              value={env.type}
              style={{
                fontWeight:
                      this.state.environments.includes(env.type) ? 'bold' : 'normal',
              }}
            >
              {env.type}
            </MenuItem>
          ))}
        </TextField>

        <FormLabel className={classes.legend} component='legend'>Residence Features</FormLabel>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.features.includes('balcony')}
                onChange={e => setList(this.state.features, e.target.value)}
                value='balcony'
              />
            }
            label='Balcony'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.features.includes('pool')}
                onChange={e => setList(this.state.features, e.target.value)}
                value='pool'
              />
            }
            label='Pool'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.features.includes('fire')}
                onChange={e => setList(this.state.features, e.target.value)}
                value='fire'
              />
            }
            label='Working fireplace'
          />
        </FormGroup>
      </div>
    )
  }
}

PokeForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(style)(PokeForm)
