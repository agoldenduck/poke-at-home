import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'

import homeState$ from './home-state'
import { shuffle } from '../util'
import pokeChooser from '../util/pokeChooser'
import { env, features } from '../json/parameters'

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject()

// Initial State
const initState = {
  pokemon: [],
}

// Redux reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'COLLECTED_POKEMON': return {
      pokemon: action.payload,
    }
    case 'UPDATED_HOME': return {
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => action.payload.environments.includes(en.type)),
          features: features.filter(feat => action.payload.features.includes(feat.type)),
          homeSize: action.payload.homeSize,
        },
      ),
    }
    default:
      return state
  }
}

// Reduxification
const pokeStore$ = action$.startWith(initState).scan(reducer)

// Higher order function to send actions to the stream
const actionDispatcher = (func) => (...args) =>
  action$.next(func(...args))

// Example action function
const collectPokemon = actionDispatcher((payload) => ({
  type: 'COLLECTED_POKEMON',
  payload: shuffle(payload),
}))

const updatePokemon = state => ({
  type: 'UPDATED_HOME',
  payload: state,
})

homeState$.subscribe((state) => state.homeReady && action$.next(updatePokemon(state)))

export default pokeStore$

export {
  collectPokemon,
}
