import React, {Component} from 'react';
import Amplify, { Auth, API } from "aws-amplify";
import awsmobile from "./aws-exports"
import config from "./config";
import { Font, AppLoading } from "expo";

import AppNavigator from './config/navigation'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    async componentDidMount() {
        await this.configure()
        console.log('Export info: ', awsmobile)
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
          });

    }

    async configure() {
        const result = await Amplify.configure({
          Auth: {
              mandatorySignIn: false,
              region: config.cognito.REGION,
              userPoolId: config.cognito.USER_POOL_ID,
              identityPoolId: config.cognito.IDENTITY_POOL_ID,
              userPoolWebClientId: config.cognito.APP_CLIENT_ID
          },
        //   Storage: {
        //       region: config.s3.REGION,
        //       bucket: config.s3.BUCKET,
        //       identityPoolId: config.cognito.IDENTITY_POOL_ID
        //   },
        //   API: {
        //       endpoints: [
        //           {
        //               name: "fsa",
        //               endpoint: config.apiGateway.URL,
        //               region: config.apiGateway.REGION
        //           },
        //       ]
        //   }
      });
    //   console.log('Result: ', result);
      }

    render() {
        return (
          <AppNavigator/>
        );
    }
}

export default App;
