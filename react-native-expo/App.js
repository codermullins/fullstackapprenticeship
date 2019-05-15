import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import Amplify, { Auth, API } from "aws-amplify";
import { Platform } from "react-native";
import { Font, AppLoading, Notifications, Permissions } from "expo";
import { Root } from "native-base";
import AppNavigator from './config/navigation';
import config from './config/config';


Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: "fsa",
                endpoint: config.sls.URL,
                region: config.sls.REGION
            },
            {
                name: "events",
                endpoint: config.amplify.URL,
                region: config.amplify.REGION
            },
            {
                name: "payments",
                endpoint: config.amplify.URL,
                region: config.amplify.REGION
            },
            {
                name: 'leaders',
                endpoint: config.amplify.URL,
                region: config.amplify.REGION
            }
        ]
    }
  });

const INITIAL_STATE = {
    user: {},
    id: "uuid"
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return { ...state, ...action.state };
    }
};

const store = createStore(reducer, {});

const mapStateToProps = state => {
    return { ...state };
};



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false
        }
    }

    localNotificationExample() {
        Expo.Notifications.presentLocalNotificationAsync({
            title: 'New Event',
            body: 'Event Posted',
            android: {
              channelId: 'events',
            },
          });
          
    }

    expoApiObjectExample() {
        const batch = [{
            "to": "ExponentPushToken[xxxxxx]",
            "title":"test",
            "priority":"high",
            "body": "test",
            "sound":"default", // android 7.0 , 6, 5 , 4
            "channelId": "chat-messages", // android 8.0 later
           }]
           
    }

    setupNotifications() {
        if (Platform.OS === 'android') {
            Expo.Notifications.createChannelAndroidAsync('events', {
              name: 'Events',
              sound: true,
              vibrate: [0, 250, 250, 250],
              priority: 'max'
            });
            // Expo.Notifications.createChannelAndroidAsync('exp', {
            //     name: 'Experience',
            //     sound: true,
            //   });
            //   Expo.Notifications.createChannelAndroidAsync('payments', {
            //     name: 'Payments',
            //     sound: true,
            //   });
          }
          
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
          });
          this.setState({ fontLoaded: true })

          // Need to update default notification alert settings
          Platform.OS === 'android' ? await Notifications.getExpoPushTokenAsync() : console.log('No iOS Notifications')
          
    }

    
    render() {
        return (
            // <Provider store={store}>
                this.state.fontLoaded ? 
                <Root>
                    <AppNavigator screenProps={{...this.props}}/>
                </Root> 
                : null
            // </Provider>
        );
    }
}

export default App;
