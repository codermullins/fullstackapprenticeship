import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';

class SettingsScreen extends Component {
  signOut = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
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
