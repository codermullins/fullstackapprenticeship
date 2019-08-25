import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RkText, RkCard } from "react-native-ui-kitten"
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
    const query = `*[_type == '${schema}']{type, _type, text, summary, title, url, _id}`
    const links = await sanity.fetch(query);
    this.setState({ links })
  }

  render() {
    return (
      <Container>
        <RkCard>
          <View rkCardHeader={true}>
            <View>
            <RkText rkType="header">
                Tap an article below to view it.
              </RkText> 
            </View>
          </View>
        </RkCard>
        <Content>
        <List>
          {this.state.links.map((link, i) => (
            <ListItem key={i} onPress={() => this.props.navigation.navigate('WebContentView', {
              url: link.url
            })}>
              <Text style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{link.title}</Text>
                <Text>{"\n"}</Text>
                <Text>{link.summary}</Text> 
              </Text>
            </ListItem>
          )
          )}
        </List>
      </Content>
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