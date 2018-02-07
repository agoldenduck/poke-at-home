import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider } from 'material-ui/styles'

import light from '../theme/light'
import PokeList from '../Layouts/PokeList'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://graphql-pokemon.now.sh' }),
  cache: new InMemoryCache(),
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={light}>
          <PokeList />
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
