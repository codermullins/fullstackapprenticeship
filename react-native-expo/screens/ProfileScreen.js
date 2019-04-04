import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Card, Header, Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from "native-base";
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { API } from "aws-amplify"

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }
  }

  async componentDidMount() {
    const id = await AsyncStorage.getItem('id')
    await console.log(id)
    const profile = await API.get('fsa', `/users/${id}`)
    await this.setState({ profile: profile[0] })
    await console.log(this.state.profile)
  }
  render() {

    const progressPercent = parseInt(this.state.profile.xp) / 5000;

    return (
      <Container>
        <Content>
          <Card style={{flex: 1, flexDirection: 'column'}}>
          <Text>{`\n`}</Text>
            <View style={styles.container}>
              <Thumbnail round large source={{uri: 'https://avatars3.githubusercontent.com/u/15205259?s=400&u=64ad9374b8d98f09dc5709fcc737e5ec4f2447f3&v=4'}} style={{height: 200, width: '50%', paddingBottom: 40}} />
                <Right style={{paddingRight: 30}}>
                <Text style={{fontSize: 20}}>{this.state.profile.fName} {this.state.profile.lName}</Text>
                <ProgressCircle
                  percent={progressPercent}
                  radius={50}
                  borderWidth={8}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor="#fff"
              >
                  <Text style={{ fontSize: 18 }}>{progressPercent}%</Text>
              </ProgressCircle>
              <Text>{parseInt(this.state.profile.xp)}/5000 EXP</Text>
                </Right>
              </View>

            <CardItem>
            <Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.props.navigation.navigate('EditProfile', { type: 'EDIT', profile: this.state.profile})}>
                  <Entypo name="new-message" size={24} />
                  <Text>Edit Profile</Text>
                </Button>
              </Left>  
                <Right>
                <Text style={{fontSize: 20}}>{this.state.profile.technicalRank}{"\n"}<Text note>Technical Rank</Text></Text>
                </Right>
            </CardItem>
            <Text style={{textAlign: 'center'}}>I'm a self-taught developer who specializes in React Web & Native development, using Node.js, serverless computing & Amazon Web Services to deliver value to my clients & employers.</Text>
            
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Entypo name="github" size={24} />
                  <Text>{this.state.profile.github}</Text>
                </Button>
              </Left>
              {/* <Body>
              <Button transparent textStyle={{color: '#87838B'}}>
                  <Entypo name="map" size={24} />
                  <Text>{this.state.profile.region}</Text>
                </Button>
              </Body> */}
              <Right>
              <Button transparent textStyle={{color: '#87838B'}}>
                  {/* <Entypo name="archive" size={24} /> */}
                  <Text>{this.state.profile.city}, {this.state.profile.country}</Text>
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
    flexDirection: 'row',
    // alignItems: 'left',
    // alignContent: 'left',
    // justifyContent: 'left',
    // paddingTop: '20', 
  },
  header: {
    flexDirection: 'column'
  }
});

export default ProfileScreen;
