import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

import './style.css'
import BooksQuery from './BooksQuery'


const client = new ApolloClient({
  uri: "https://deeply-crown.glitch.me/"
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <BooksQuery />
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'));
