import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from 'material-ui-icons/Menu'
import EditIcon from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
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
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  pos: {
    color: theme.palette.text.secondary,
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
      position: 'fixed',
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
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      display: 'none',
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

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />

        <Divider />

        {/* <List>navListGoesHere</List> */}

        {/* <Divider /> */}

        {drawerForm}

      </div>
    )

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>

              <div>
                <Typography variant='title' color='inherit' noWrap>
                  Pok&eacute; @ Home
                </Typography>

                <Typography color='inherit' noWrap>
                  Find the perfect Pok&eacute;mon for your home
                </Typography>
              </div>
            </Toolbar>
          </AppBar>

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
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>

          <main className={classes.content}>
            {children}
          </main>

          <Button
            onClick={this.handleDrawerToggle}
            variant='fab'
            color='secondary'
            aria-label='edit'
            className={classes.fab}
          >
            <EditIcon />
          </Button>
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
