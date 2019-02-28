import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';

export default class BluePrintScreen extends React.Component {
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
    backgroundColor: '#ecf0f1',
  },
});