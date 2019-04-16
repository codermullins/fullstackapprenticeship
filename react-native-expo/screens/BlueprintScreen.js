import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import {Container, Content, List, ListItem, Text, Left, Right, Body} from 'native-base';
import NavButton from "../components/NavButton"
import orderBy from "lodash.orderby"
import sanity from "../sanity";

export default class BluePrintScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: []
    }
  }

  async componentDidMount() {
    await this.downloadBlueprint()
  }

  async downloadBlueprint() {
    const query = `*[_type == 'blueprintSchema']{title, subtitle, overview, chapter, _id}`
      const chapters = await sanity.fetch(query);
      this.setState({ chapters })
  }

  renderChapters() {
    const orderedChapters = orderBy(this.state.chapters, function(chapter) { return chapter.chapter})
 
    return(
      <List>
      {orderedChapters.map((list, i) => (
        <ListItem key={i} onPress={() => this.props.navigation.navigate('ChapterScreen', {
          schema: list,
          // book: this.state.chapters
        })}>
              <Text style={{fontSize: 24}}>{list.title}{'\n'}<Text style={{fontStyle: "italic"}}>{list.subtitle}</Text></Text>       
        </ListItem>
        )
      )}
      </List>
    )
  }


  render() {
    return (
      <Container>
        <Content>
          {this.renderChapters()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});