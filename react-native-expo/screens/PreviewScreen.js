import React, {Component} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Container, Header, List, ListItem, Content, Left, Right, Thumbnail, Body, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";


class HomeScreen extends Component
{
    render()
    {
        return (
        <Container>
          <Grid>
            <Col style={{ backgroundColor: '#6200EE', height: 400 }}>
            <View>
            <Text style={{ color: 'white', textAlign: 'left', fontSize: 26, marginTop: 10, marginLeft: 20}}>12/13/2018</Text>
            </View>

            <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/arrow.png')} />
              </Left>
              <Body>
                <Text style={{ color: 'white', fontSize: 16}}>Morning Workout</Text>
                <Text note style={{ color: 'white'}}>Lifting, crunches, take a swim.</Text>
              </Body>
              <Right>
                <Text note style={{ color: 'white', fontSize: 14}}>7am - 8am</Text>
                <Text note style={{ color: 'white', fontSize: 16}}>15 Points</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/arrow.png')} />
              </Left>
              <Body>
                <Text style={{ color: 'white', fontSize: 16}}>Focus Session #1</Text>
                <Text note style={{ color: 'white'}}>Ticket Item: #38</Text>
                <Text note style={{ color: 'white'}}>One 10 minute break.</Text>
              </Body>
              <Right>
                <Text note style={{ color: 'white'}}>9am - 11am</Text>
                <Text note style={{ color: 'white', fontSize: 16}}>20 Points</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/arrow.png')} />
              </Left>
              <Body>
                <Text style={{ color: 'white', fontSize: 16}}>Focus Session #2</Text>
                <Text note style={{ color: 'white'}}>Ticket Item: #38</Text>
                <Text note style={{ color: 'white'}}>One 10 minute break.</Text>
              </Body>
              <Right>
                <Text note style={{ color: 'white'}}>12pm - 2pm</Text>
                <Text note style={{ color: 'white', fontSize: 16}}>20 Points</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Upcoming FSA Events</Text>
            </Col>
            </Grid>
            <Grid>
            <Col style={{ backgroundColor: '#3700B3', height: 300 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, marginTop: 10, textDecorationLine: "underline", paddingBottom: 10}}>GitHub</Text>
            <View></View>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Open Tickets</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16}}>#38 fsa-hub</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16}}>#56 work&rise</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginTop: 20}}>Notifications (12)</Text>
            <Text>{'\n'}</Text>
            <Body>
                <Button block style={{backgroundColor: "white"}}><Text> View Notifications </Text></Button>
            </Body>

            </Col>
            <Col style={{ backgroundColor: '#3f51b5', height: 300 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, marginTop: 10, textDecorationLine: "underline", paddingBottom: 10}}>My Journey</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16}}>Daily Points: 35</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16}}>Weekly Points: 149</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16}}>Monthly Points: 589</Text>
            <Text>{'\n'}</Text>
            <Body>
                <Button block style={{backgroundColor: "white"}}><Text> View Leaderboards </Text></Button>
                <Text>{'\n'}</Text>
                <Button block style={{backgroundColor: "white"}}><Text> Redeem Points </Text></Button>

            </Body>

            </Col>
          </Grid>
      </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    }
})


export default HomeScreen;