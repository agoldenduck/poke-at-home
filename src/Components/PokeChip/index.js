import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'

import theme from '../../theme/light'

const PokeChip = ({ type, overrideClassNames }) => (
  <Chip
    label={type}
    className={overrideClassNames}
    style={{
      backgroundColor: theme.palette[type].main,
      color: theme.palette[type].contrastText,
    }}
  />
)

PokeChip.propTypes = {
  type: PropTypes.string.isRequired,
  overrideClassNames: PropTypes.string,
}

export default PokeChip
