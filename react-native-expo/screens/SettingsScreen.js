import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import { Auth } from "aws-amplify"

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  signOut = async () => {
    AsyncStorage.clear();
    Auth.signOut()
    .then(() => {
      this.props.screenProps.onStateChange('signedOut', null);
      })
      .catch(err => {
      console.log('err: ', err)
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button title={'Sign Out'} onPress={this.signOut} />
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

export default SettingsScreen;
