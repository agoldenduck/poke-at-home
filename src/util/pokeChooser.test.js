import pokeChooser, { extractNumber, getStandardDeviation } from './pokeChooser'
import * as param from '../json/parameters'

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

it('returns 4 for maximum weight of Mankey', () => {
  const Mankey = testPokemon.filter(poke => poke.name === 'Mankey')[0]
  expect(extractNumber(Mankey.weight.maximum)).toBe(4)
})

it('returns 2 for the standard deviation of test pokemon weight', () => {
  expect(getStandardDeviation(testPokemon.map(poke => extractNumber(poke.weight.maximum)))).toBe(2)
})

it(`returns 'Spearow' as happiest in all environments`, () => {
  const newPokemon = pokeChooser(testPokemon, param)
  expect(newPokemon[0].name).toBe('Spearow')
})
