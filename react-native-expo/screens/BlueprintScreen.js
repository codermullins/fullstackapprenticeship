import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <WebView
          bounces={false}
          scrollEnabled={false} 
          source={{ uri: 'https://drive.google.com/open?id=1xLMpaFIgoq8EDafsU0w0K5KSmcrwlaz1' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});