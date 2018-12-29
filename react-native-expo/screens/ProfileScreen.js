import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, Header, Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from "native-base";
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';



class ProfileScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
            <View style={styles.container}>

            <Thumbnail round large source={{uri: 'https://avatars3.githubusercontent.com/u/15205259?s=400&u=64ad9374b8d98f09dc5709fcc737e5ec4f2447f3&v=4'}} style={{height: 200, width: 200, flex: 1, alignContent: 'center', alignItems: 'center'}} />
            {/* <Text style={{paddingTop: 10}}><Icon type="FontAwesome" name="map-pin" />Currently in - Seattle</Text> */}
              <Left>
              <Text style={{fontSize: 24, fontStyle: "italic", paddingBottom: 10}}>{`\nMichael Litchev`}</Text>
              </Left>
            <CardItem>
                <Left style={{alignContent: "center"}}>
                  <Text style={{fontSize: 20}}>Developer{"\n"}<Text note>Technical Rank</Text></Text>
                </Left>
                <Right style={{alignContent: "right"}}>
                  <Text style={{fontSize: 20}}>Organizer{"\n"}<Text note>Community Rank</Text></Text>
                </Right>
            </CardItem>
            <Text style={{textAlign: "center"}}>{`\nI'm a self-taught developer who specializes in React Web & Native development, using Node.js, serverless computing & Amazon Web Services to deliver value to my clients & employers. `}</Text>
          </View>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Entypo name="new-message" size={24} />
                  <Text>Send Message</Text>
                </Button>
              </Left>
              <Right>
              <Button transparent textStyle={{color: '#87838B'}}>
                  <Entypo name="archive" size={24} />
                  <Text>View Resume</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 20,

    
  },
});

export default ProfileScreen;
