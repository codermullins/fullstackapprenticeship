import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Tex,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.loadApp();
  }

  loadApp = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Token: ', accessToken)

    this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
