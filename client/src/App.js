import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import  TestComponent  from './components/TestComponent';


const client = new ApolloClient({
  uri: 'https://localhost:4000/graphql'
})

class App extends Component{
  render(){
    return (
      <ApolloProvider client={client}>
            <div id="main">
              <h1> KGVC </h1>
            </div>
            <TestComponent />
      </ApolloProvider>
    )
  }
}


export default App;
