import React from 'react'
import ObservableComponent from 'rxjs-react-component'
import PropTypes from 'prop-types'
import { FormLabel, FormControlLabel, FormGroup, FormHelperText } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import MultiSelect from '../MultiSelect'
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

  closeMultiSelect () {
    this.setState({

    })
  }

  render () {
    const { classes } = this.props
    const { propertyType, rooms, yard, environments, features } = this.state
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
            value={propertyType}
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
            value={rooms}
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
            value={yard}
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

        <MultiSelect
          items={param.env.map(env => env.type)}
          selectedItems={environments}
        />

        <FormHelperText>Select all that apply</FormHelperText>

        <FormLabel className={classes.legend} component='legend'>Residence Features</FormLabel>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={features.includes('balcony')}
                onChange={e => setList(features, e.target.value)}
                value='balcony'
              />
            }
            label='Balcony'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={features.includes('pool')}
                onChange={e => setList(features, e.target.value)}
                value='pool'
              />
            }
            label='Pool'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={features.includes('fire')}
                onChange={e => setList(features, e.target.value)}
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
