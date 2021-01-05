import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//AppSync and Apollo libraries
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from 'react-apollo';

//Amplify
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

// Components
import CreateItem from './Components/createItem';
import DisplayItems from './Components/displayItems';

import awsconfig from './aws-exports';

// Amplify init
Amplify.configure(awsconfig);

const GRAPHQL_API_REGION = awsconfig.aws_project_region
console.log("GRAPHQL_API_REGION : ",GRAPHQL_API_REGION);
const GRAPHQL_API_ENDPOINT_URL = awsconfig.aws_appsync_graphqlEndpoint
const AUTH_TYPE = awsconfig.aws_appsync_authenticationType
console.log("AUTH_TYPE : ",AUTH_TYPE)
// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    // Get the currently logged in users credential.
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  // Amplify uses Amazon IAM to authorize calls to Amazon S3. This provides the relevant IAM credentials.
  complexObjectsCredentials: () => Auth.currentCredentials()
});

class App extends Component {

  render() {
    return (
      <div className="App">
         <AmplifySignOut />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">AWS Amplify with AWS AppSync Sample using AWS Cognito Authorization </h1>
        </header>
       
        <div className="App-content">
          <CreateItem />
          <DisplayItems />
        </div>
      </div>
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default () => (
  <ApolloProvider client={client}>
    {/* <Rehydrated> */}
      <AppWithAuth />
    {/* </Rehydrated> */}
  </ApolloProvider>
);