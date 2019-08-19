import React, { Component } from 'react';
import { WebView, StyleSheet, Button } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Right, Body } from 'native-base';
import sanity from "../sanity";

class ContentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      showWebView: null,
      item: {}
    }
  }

  async componentDidMount() {
    const schema = this.props.navigation.getParam('schema', 'None')
    const query = `*[_type == '${schema}']{type, _type, text, title, url, _id}`
    const links = await sanity.fetch(query);
    this.setState({ links })
  }

  renderContentItems() {
    return (
      <Content>
        <List>
          {this.state.links.map((link, i) => (
            <ListItem key={i} onPress={() => this.setState({ showWebView: true, item: link.url })}>
              <Left>
                <Text>{link.title}</Text>
              </Left>
            </ListItem>
          )
          )}
        </List>
      </Content>
    )
  }

  renderContent = () => {
    return (
      <WebView
        source={{ uri: this.state.item }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    )
  }

  render() {
    return (
      <Container>
        {this.state.showWebView === null
          ? this.renderContentItems()
          : this.renderContent()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ContentScreen;