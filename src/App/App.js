import React  from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider } from 'material-ui/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import light from '../theme/light'
import WithDrawer from '../Layouts/WithDrawer'
import PokeList from '../Components/PokeList'
import PokeForm from '../Components/PokeForm'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://graphql-pokemon.now.sh' }),
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={light}>
      <Router>
        <div>
          <Route exact path='/' component={PokeList} />
          <Route
            path='/poke'
            render={() => (
              <WithDrawer drawerForm={<PokeForm />}>
                <PokeList />
              </WithDrawer>
            )}
          />
          <Route path='/form' component={PokeForm} />
        </div>
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>
)

export default App
