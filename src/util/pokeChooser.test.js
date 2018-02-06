import { standardDeviationMaxDimension } from './pokeChooser'
import * as env from './parameters'

const testPokemon = [
  {
    'name': 'Spearow',
    'weight': { 'maximum': '7kg' },
    'height': { 'maximum': '7m' },
    'types': [ 'Normal', 'Flying' ],
  },
  {
    'name': 'Ekans',
    'weight': { 'maximum': '2kg' },
    'height': { 'maximum': '2m' },
    'types': [ 'Poison' ],
  },
  {
    'name': 'Paras',
    'weight': { 'maximum': '9kg' },
    'height': { 'maximum': '9m' },
    'types': [ 'Bug', 'Grass' ],
  },
  {
    'name': 'Sandshrew',
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'Ground' ],
  },
  {
    'name': 'Mankey',
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'Fighting' ],
  },
  {
    'name': 'Butterfree',
    'weight': { 'maximum': '4kg' },
    'height': { 'maximum': '4m' },
    'types': [ 'Flying', 'Bug' ],
  },
  {
    'name': 'Charmander',
    'weight': { 'maximum': '5kg' },
    'height': { 'maximum': '5m' },
    'types': [ 'Fire' ],
  },
  {
    'name': 'Slowpoke',
    'weight': { 'maximum': '5kg' },
    'height': { 'maximum': '5m' },
    'types': [ 'Water', 'Psychic' ],
  },
]

it('returns 2 for the standard deviation of test pokemon weight', () => {
  expect(standardDeviationMaxDimension(testPokemon, 'weight')).toBe(2)
})

// it(`returns 'Butterfree' as happiest in 'polar', 'urban' environment`, () => {
//   const newPokemon = sortPokemonByEnvironments(testPokemon, env.default.filter(en => ['polar', 'urban'].includes(en.type)))
//   expect(newPokemon[0].name).toBe('Butterfree')
// })
