import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Chip from 'material-ui/Chip'
import Checkbox from 'material-ui/Checkbox'
import { ListItemText } from 'material-ui/List'

import { setProperty } from '../../state/home-state'
import { withStyles } from 'material-ui/styles/index'

const style = {
  select: {
    width: '100%',
  },
}

const MultiSelect = props => {
  const { selectedItems, items, classes } = props

  return (
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
      value={selectedItems}
      name='environments'
      label='Environments'
      onChange={e => setProperty('env', e.target.value)}
      className={classes.select}
    >
      <MenuItem key='disabled' disabled>Select all that appply</MenuItem>

      {items.map(item => (
        <MenuItem
          key={item}
          value={item}
          style={{
            fontWeight:
              selectedItems.includes(item) ? 'bold' : 'normal',
          }}
        >
          <Checkbox color='secondary' checked={selectedItems.includes(item)} />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </TextField>
  )
}

MultiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
}

export default withStyles(style)(MultiSelect)
