import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import { Button } from "native-base";

class WelcomeScreen extends Component {
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem('accessToken')
    // await console.log('Token: ', token)
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={{ fontSize: 40, paddingTop: 10, paddingBottom: 10}}>Refresh Your Life</Text>
        <Image source={require('../assets/blueprint.jpg')} rounded />
        <Text style={{ fontSize: 36, fontStyle: 'italic', padding: 15}}>#thehub</Text>
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          full
          light
          style={{ backgroundColor: '#9c27b0', height: 80 }}

        ><Text style={{color: 'white', fontSize: 20}}>Sign In</Text></Button>
        {/* <Text>{'\n'}</Text> */}
        <Button
          onPress={() => this.props.navigation.navigate('SignUp')}
          full
          light
          style={{ backgroundColor: "#6200EE", height: 80 }}
        ><Text style={{color: 'white', fontSize: 20}}>Register</Text></Button>
      </View>
      </ScrollView>
      
    );
  }
}

// main: "#6200EE"
//             main: '#9c27b0'
//             main: '#3700B3'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40
  },

});

export default WelcomeScreen;
