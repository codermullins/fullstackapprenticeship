import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Container, Content, List, ListItem, Text, Left, Right, Body} from 'native-base';
import NavButton from "../components/NavButton";
import sanity from "../sanity"
import orderBy from "lodash.orderby"

class ExperienceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            schema: [],
            experience: []
        }
    }

    async componentDidMount() {
        const schema = this.props.navigation.getParam('schema', 'None')
        const experience = this.props.navigation.getParam('experience', 'none')
        console.log('Props Experience: ', experience)
        this.setState({ experience: experience })
        await this.sanityQuery(schema)
      }
  
      async sanityQuery(schema) {
        const query = `*[_type == '${schema}']`
        const links = await sanity.fetch(query);
        this.setState({ links })
      }

    renderExperience(experience) {
        const orderedLinks = orderBy(this.state.links, function(item) { return item.priority})
        const update = this.props.navigation.getParam('function', 'none')
        return(
          <List>
          {orderedLinks.map((list, i) => {
            const achievementNumber = list.priority;
            const complete = experience[achievementNumber];
            const obj = {
              list: list,
              experience: experience,
              update: update,
              complete: complete
            }
            return (
            <ListItem key={i}>
              <Left>
                  <Text style={{fontSize: 24, paddingRight: 10}}>{list.title}{'\n'}<Text>Complete: {`${complete}`}</Text></Text>
              </Left>

              <Right>
                <NavButton navigation={this.props.navigation} route="AchievementScreen" schema={obj} function={update} text={`${list.amount}XP`} />
              </Right>
            </ListItem>
          )}
          )}
          </List>
        )
      }

    render(){
        return (
        <Container>
            <Content>
                { this.renderExperience(this.state.experience)}
            </Content>
        </Container>
        )
    }
}

export default ExperienceScreen;