import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import logo from '../logo.svg'
import './App.css'
import PokeCardsWithData from '../Components/PokeCards'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://graphql-pokemon.now.sh' }),
  cache: new InMemoryCache(),
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to React</h1>
          </header>

          <PokeCardsWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
