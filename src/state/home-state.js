import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject()

// Initial State
const initState = {
  propertyType: '',
  rooms: '',
  yard: '',
  features: [],
  environments: [],
  homeSize: 0,
  homeReady: false,
}

// Redux reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROPERTY_TYPE': return {
      ...state,
      propertyType: action.payload,
      homeSize: (state.rooms + state.yard) * action.payload,
      homeReady: ((state.rooms + state.yard) * action.payload) !== 0 && !!state.environments.length,
    }
    case 'SET_ROOMS': return {
      ...state,
      rooms: action.payload,
      homeSize: (action.payload + state.yard) * state.propertyType,
      homeReady: ((action.payload + state.yard) * state.propertyType) !== 0 && !!state.environments.length,
    }
    case 'SET_YARD': return {
      ...state,
      yard: action.payload,
      homeSize: (state.rooms + action.payload) * state.propertyType,
      homeReady: ((state.rooms + action.payload) * state.propertyType) !== 0 && !!state.environments.length,
    }
    case 'SET_FEATURES': return {
      ...state,
      features: action.payload,
      homeReady: state.homeSize !== 0 && !!state.environments.length,
    }
    case 'SET_ENV': return {
      ...state,
      environments: action.payload,
      homeReady: state.homeSize !== 0 && !!action.payload.length,
    }
    default:
      return state
  }
}

// Reduxification
const homeStore$ = action$.startWith(initState).scan(reducer)

// Higher order function to send actions to the stream
const actionDispatcher = (func) => (...args) =>
  action$.next(func(...args))

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

export default homeStore$

export {
  setProperty,
  setList,
}
