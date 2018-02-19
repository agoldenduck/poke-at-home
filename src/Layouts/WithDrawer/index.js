import React from 'react'
import PropTypes from 'prop-types'
import Hidden from 'material-ui/Hidden'
import Drawer from 'material-ui/Drawer'
import { withStyles } from 'material-ui/styles'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class WithDrawer extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const { children, drawerForm, classes, theme } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Hidden implementation='css' mdUp>
            <Drawer
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawerForm}
            </Drawer>
          </Hidden>

          <Hidden smDown implementation='css'>
            <Drawer
              variant='permanent'
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawerForm}
            </Drawer>
          </Hidden>

          <main className={classes.content}>
            {children}
          </main>
        </div>
      </div>
    )
  }
}

WithDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  drawerForm: PropTypes.object,
}

export default withStyles(styles, { withTheme: true })(WithDrawer)
