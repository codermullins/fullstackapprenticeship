import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Container, Content, List, ListItem, Text, Left, Right, Body} from 'native-base';
import NavButton from "../components/NavButton";
import { fullStackApprenticeship, findingWork, cityByCity } from "../directories";

class SubcategoriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            schema: []
        }
    }

    // we want to pass the subcategory through Props as Schema in Nav

    async componentDidMount() {
        const schema = this.props.navigation.getParam('schema', 'None')
        this.determineSchema(schema)
    }

    determineSchema(schema) {
        switch (schema) {
            case 'fullStackApprenticeship':
                this.setState({ schema: fullStackApprenticeship })
                break;
            case 'findingWork':
                this.setState({ schema: findingWork })
                break;
            case 'cityByCity':
                this.setState({ schema: cityByCity })
        }
    }

    renderSubcategories() {
        return(
          <List>
          {this.state.schema.map((list, i) => (
            <ListItem key={i}>
              <Left>
                  <Text style={{fontSize: 24}}>{list.name}{'\n'}<Text style={{fontStyle: "italic"}}>{list.description}</Text></Text>
              </Left>

              <Right >
                <NavButton schema={list.type} navigation={this.props.navigation} route="Content" onPress={() => this.props.navigation.navigate('Content')} text="View" />
              </Right>
            </ListItem>
          )
          )}
          </List>
        )
      }

    render(){
        return (
        <Container>
            <Content>
                { this.renderSubcategories()}
            </Content>
        </Container>
        )
    }
}

export default SubcategoriesScreen;