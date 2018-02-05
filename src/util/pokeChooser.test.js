import {standardDeviationMaxDimension} from './pokeChooser'

const testPokemon = [
  {
    'weight': { 'maximum': '7kg' },
    'height': { 'maximum': '7m' },
    'types': [ 'normal', 'flying' ],
  },
  {
    'weight': { 'maximum': '2kg' },
    'height': { 'maximum': '2m' },
    'types': [ 'poison' ],
  },
  {
    'weight': { 'maximum': '9kg' },
    'height': { 'maximum': '9m' },
    'types': [ 'bug', 'grass' ],
  },
  {
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'ground' ],
  },
  {
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'fighting' ],
  },
  {
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'flying' ],
  },
  {
    'weight': { 'maximum': '5kg' },
    'height': { 'maximum': '5m' },
    'types': [ 'fire' ],
  },
  {
    'weight': { 'maximum': '5kg' },
    'height': { 'maximum': '5m' },
    'types': [ 'water', 'psychic' ],
  },
]

it('returns 2 for the standard deviation of test pokemon weight', () => {
  expect(standardDeviationMaxDimension(testPokemon, 'weight')).toBe(2)
})
