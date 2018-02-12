import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'

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
}

// Redux reducer
const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'COLLECTED_POKEMON': return {
      ...state,
      pokemon: action.payload,
    }
    case 'SET_PROPERTY_TYPE': return {
      ...state,
      propertyType: action.payload,
    }
    case 'SET_ROOMS': return {
      ...state,
      rooms: action.payload,
    }
    case 'SET_YARD': return {
      ...state,
      yard: action.payload,
    }
    case 'SET_FEATURES': return {
      ...state,
      features: action.payload,
    }
    case 'SET_ENV': return {
      ...state,
      environments: action.payload,
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

const setList = actionDispatcher((list, value) => ({
  type: 'SET_FEATURES',
  payload: list.includes(value) ? list.filter(item => item !== 'value') : list.concat(value),
}))

export default store$

export {
  collectPokemon,
  setProperty,
  setList,
}
