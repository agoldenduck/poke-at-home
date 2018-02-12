import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'

import { env, features } from './parameters'
import pokeChooser from './pokeChooser'

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject()

// Initial State
const initState = {
  pokemon: [],
  propertyType: '',
  rooms: '',
  yard: '',
  features: [],
  environments: [],
  homeSize: 0,
}

// Redux reducer
const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'COLLECTED_POKEMON': return {
      ...state,
      pokemon: pokeChooser(
        action.payload,
        {
          env: env.filter(en => state.environments.includes(en.type)),
          features: features.filter(feat => state.features.includes(feat.type)),
          homeSize: state.homeSize,
        },
      ),
    }
    case 'SET_PROPERTY_TYPE': return {
      ...state,
      propertyType: action.payload,
      homeSize: (state.rooms + state.yard) * action.payload,
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => state.environments.includes(en.type)),
          features: features.filter(feat => state.features.includes(feat.type)),
          homeSize: (state.rooms + state.yard) * action.payload,
        },
      ),
    }
    case 'SET_ROOMS': return {
      ...state,
      rooms: action.payload,
      homeSize: (action.payload + state.yard) * state.propertyType,
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => state.environments.includes(en.type)),
          features: features.filter(feat => state.features.includes(feat.type)),
          homeSize: (action.payload + state.yard) * state.propertyType,
        },
      ),
    }
    case 'SET_YARD': return {
      ...state,
      yard: action.payload,
      homeSize: (state.rooms + action.payload) * state.propertyType,
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => state.environments.includes(en.type)),
          features: features.filter(feat => state.features.includes(feat.type)),
          homeSize: (state.rooms + action.payload) * state.propertyType,
        },
      ),
    }
    case 'SET_FEATURES': return {
      ...state,
      features: action.payload,
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => state.environments.includes(en.type)),
          features: features.filter(feat => action.payload.includes(feat.type)),
          homeSize: state.homeSize,
        },
      ),
    }
    case 'SET_ENV': return {
      ...state,
      environments: action.payload,
      pokemon: pokeChooser(
        state.pokemon,
        {
          env: env.filter(en => action.payload.includes(en.type)),
          features: features.filter(feat => state.features.includes(feat.type)),
          homeSize: state.homeSize,
        },
      ),
    }
    default:
      return state
  }
}

// Reduxification
const store$ = action$.startWith(initState).scan(reducer)

// Higher order function to send actions to the stream
const actionDispatcher = (func) => (...args) =>
  action$.next(func(...args))

// Example action function
const collectPokemon = actionDispatcher((payload) => ({
  type: 'COLLECTED_POKEMON',
  payload,
}))

const setProperty = actionDispatcher((name, payload) => {
  switch (name) {
    case 'type': return {
      type: 'SET_PROPERTY_TYPE',
      payload,
    }
    case 'rooms': return {
      type: 'SET_ROOMS',
      payload,
    }
    case 'yard': return {
      type: 'SET_YARD',
      payload,
    }
    case 'env': return {
      type: 'SET_ENV',
      payload,
    }
  }
})

const setList = actionDispatcher((list, values) => ({
  type: 'SET_FEATURES',
  payload: list.includes(values) ? list.filter(item => !values.includes(item)) : list.concat(values),
}))

export default store$

export {
  collectPokemon,
  setProperty,
  setList,
}
