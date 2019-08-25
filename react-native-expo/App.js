import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import Amplify, { Auth, API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { Platform } from 'react-native'
import { Font, AppLoading, Notifications, Permissions } from 'expo'
import { Root } from 'native-base'
import AppNavigator from './config/navigation'
import config from './config/config'
import awsmobile from './aws-exports'
import orderBy from 'lodash.orderby'

Amplify.configure(awsmobile)

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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fontLoaded: false,

      events: [],
      profile: null,
      product: { xpEarned: 0, achievements: 0 },
      apprenticeship: { xpEarned: 0, achievements: 0 },
      xp: null,
      loading: true
    }
  }

  localNotificationExample() {
    Expo.Notifications.presentLocalNotificationAsync({
      title: 'New Event',
      body: 'Event Posted',
      android: {
        channelId: 'events'
      }
    })
  }

  expoApiObjectExample() {
    const batch = [
      {
        to: 'ExponentPushToken[xxxxxx]',
        title: 'test',
        priority: 'high',
        body: 'test',
        sound: 'default', // android 7.0 , 6, 5 , 4
        channelId: 'chat-messages' // android 8.0 later
      }
    ]
  }

  signOut() {
    Auth.signOut()
      .then(() => {
        props.onStateChange('signedOut', null)
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
      })
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
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ fontLoaded: true })
    let androidToken
    let iPhoneToken

    // Need to update default notification alert settings
    Platform.OS === 'android'
      ? (androidToken = await Notifications.getExpoPushTokenAsync())
      : console.log('No iOS Notifications')

    const session = await Auth.currentSession()

    try {
      const username = await session.accessToken.payload.username
      const token = await session.accessToken.jwtToken
      const id = await session.accessToken.payload.sub
      const values = [
        ['accessToken', token],
        ['username', username],
        ['id', id]
      ]

      await AsyncStorage.multiSet(values)

      await this.fetchProfile(id)
      // await console.log('Profile: ', this.state.profile)

      //   await this.fetchProduct(this.state.profile.productId)

      //   // await console.log('Product: ', this.state.product)

      //   await this.fetchApprenticeship(this.state.profile.apprenticeshipId)
      //   // await console.log('Apprenticeship: ', this.state.apprenticeship)

      //   const xp = await this.calculateExperience()

      //   this.setState({ xp: xp })

      await this.fetchEvents()
      //   await this.stopLoading()

      // const notificationToken = await Notifications.getExpoPushTokenAsync();
      // console.log('Notification Token: ', notificationToken)
    } catch (e) {
      console.log('TCL: App -> componentDidMount -> e', e)
    }
  }

  async fetchProfile(id) {
    const profile = await API.get('pareto', `/users/${id}`)

    if (profile.length === 0) {
      this.props.navigation.navigate('CreateProfile', {
        function: this.updateProfile,
        experience: this.updateExperience
      })
      this.setState({ loading: false })
    } else {
      await this.setState({ profile: profile[0] })
      // console.log('TCL: App -> fetchProfile -> profile', profile)
    }
  }

  fetchEvents = async () => {
    const response = await API.get(
      'events',
      `/events/${this.state.profile.mentor}`
    )
    const orderedArray = orderBy(response, function(item) {
      return item.start
    })
    // console.log('TCL: App -> orderedArray -> orderedArray', orderedArray)
    this.setState({ events: orderedArray })
  }

  render() {
    return this.state.fontLoaded ? (
      <Root>
        <AppNavigator screenProps={{ ...this.props, ...this.state }} />
      </Root>
    ) : null
  }
}

const signUpConfig = {
  signUpFields: [{ label: 'Email', key: 'username', displayOrder: 1 }],
  hiddenDefaults: ['username', 'email', 'phone_number']
}

export default withAuthenticator(App, { signUpConfig })
