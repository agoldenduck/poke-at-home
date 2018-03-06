import { createMuiTheme } from 'material-ui/styles'

const defaultTheme = createMuiTheme()

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
    secondary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
      contrastText: '#fff',
    },
    happy: {
      main: '#4caf50',
    },
    'Bug': {
      main: '#8bc34a',
      contrastText: defaultTheme.palette.getContrastText('#8bc34a'),
    },
    'Dark': {
      main: '#5d4037',
      contrastText: defaultTheme.palette.getContrastText('#5d4037'),
    },
    'Dragon': {
      main: '#5e35b1',
      contrastText: defaultTheme.palette.getContrastText('#5e35b1'),
    },
    'Electric': {
      main: '#ffeb3b',
      contrastText: defaultTheme.palette.getContrastText('#ffeb3b'),
    },
    'Fairy': {
      main: '#f8bbd0',
      contrastText: defaultTheme.palette.getContrastText('#f8bbd0'),
    },
    'Fighting': {
      main: '#f44336',
      contrastText: defaultTheme.palette.getContrastText('#f44336'),
    },
    'Fire': {
      main: '#ff5722',
      contrastText: defaultTheme.palette.getContrastText('#ff5722'),
    },
    'Flying': {
      main: '#ab47bc',
      contrastText: defaultTheme.palette.getContrastText('#ab47bc'),
    },
    'Ghost': {
      main: '#b39ddb',
      contrastText: defaultTheme.palette.getContrastText('#b39ddb'),
    },
    'Grass': {
      main: '#43a047',
      contrastText: defaultTheme.palette.getContrastText('#43a047'),
    },
    'Ground': {
      main: '#ffe082',
      contrastText: defaultTheme.palette.getContrastText('#ffe082'),
    },
    'Ice': {
      main: '#4fc3f7',
      contrastText: defaultTheme.palette.getContrastText('#4fc3f7'),
    },
    'Normal': {
      main: '#d7ccc8',
      contrastText: defaultTheme.palette.getContrastText('#d7ccc8'),
    },
    'Poison': {
      main: '#7b1fa2',
      contrastText: defaultTheme.palette.getContrastText('#7b1fa2'),
    },
    'Psychic': {
      main: '#ec407a',
      contrastText: defaultTheme.palette.getContrastText('#ec407a'),
    },
    'Rock': {
      main: '#795548',
      contrastText: defaultTheme.palette.getContrastText('#795548'),
    },
    'Steel': {
      main: '#9e9e9e',
      contrastText: defaultTheme.palette.getContrastText('#9e9e9e'),
    },
    'Water': {
      main: '#2196f3',
      contrastText: defaultTheme.palette.getContrastText('#2196f3'),
    },
  },
})
