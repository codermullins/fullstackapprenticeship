import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import Amplify, { Auth, API } from "aws-amplify";
import { withAuthenticator } from 'aws-amplify-react-native';
import { Platform } from "react-native";
import { Font, AppLoading, Notifications, Permissions } from "expo";
import { Root } from "native-base";
import AppNavigator from './config/navigation';
import config from './config/config';
import awsmobile from './aws-exports';


Amplify.configure(awsmobile);

API.configure({
    endpoints: [
        {
            name: 'pareto',
            endpoint: config.mongo.URL,
            region: config.mongo.REGION
        },
        {
            name: 'events',
            endpoint: 'https://7fhgyy03p7.execute-api.us-east-1.amazonaws.com/prod',
            region: 'us-east-1'
        }
    ]
})

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
            "title": "test",
            "priority": "high",
            "body": "test",
            "sound": "default", // android 7.0 , 6, 5 , 4
            "channelId": "chat-messages", // android 8.0 later
        }]

    }

    signOut() {
        Auth.signOut()
          .then(() => {
            props.onStateChange('signedOut', null);
          })
          .catch(err => {
            console.log('err: ', err)
          })
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
        let androidToken;
        let iPhoneToken;

        // Need to update default notification alert settings
        Platform.OS === 'android' ? androidToken = await Notifications.getExpoPushTokenAsync() : console.log('No iOS Notifications')


    }


    render() {
        return (
            // <Provider store={store}>
            this.state.fontLoaded ?
                <Root>
                    <AppNavigator screenProps={{ ...this.props }} />
                </Root>
                : null
            // </Provider>
        );
    }
}

const signUpConfig = {
    signUpFields: [
        { label: 'Email', key: 'username', displayOrder: 1}
    ],
    hiddenDefaults: ['username', 'email', 'phone_number']
}

export default withAuthenticator(App, { signUpConfig });
