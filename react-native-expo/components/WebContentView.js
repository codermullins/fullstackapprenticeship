import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';

class WebContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      showWebView: null,
      item: {}
    }
  }

  render() {
    const url = this.props.navigation.getParam('url', 'none')
    return (
      <Container>
        <WebView
            source={{ uri: url }}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            style={{ flex: 1 }}
        />
      </Container>
    )
  }
}

export default WebContentView;