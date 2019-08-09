import React from 'react';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { UserProvider } from './context/UserContext';

import { Routerm } from './CP/components/Router/Router';
import HomeMain from './CP/components/homeComponents/homeMain';
import "./index.css";



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


const App = () =>(
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <UserProvider>
             <Routerm />
          </UserProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
);


export default App;


