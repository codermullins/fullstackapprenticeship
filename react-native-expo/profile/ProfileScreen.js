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
      profile: {},
      xp: null,
      avatar: 'none',
      url: null
    }
  }

  async componentDidMount() {
    const xp = this.props.xp;
    const profile = this.props.profile;
    const url = await this.getAvatar(profile.github)
    await this.setState({ profile: profile, xp: xp, url: url })
  }

  async getAvatar(github) {
    const user = await fetch(`https://api.github.com/users/${github}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const avatar = JSON.parse(user._bodyText);
    const url = avatar.avatar_url;
    this.setState({ url: url })
    return url;
  }

  render() {
    const progressPercent = this.state.xp / 50;
    return (
      <Container>
        <Content>
          <Card style={{flex: 1, flexDirection: 'column'}}>
          <Text>{`\n`}</Text>
            <View style={styles.container}>

                {this.state.url !== null ? (
                <Thumbnail round large source={{uri: this.state.url}} style={{height: 200, width: '50%', paddingBottom: 40}} /> ) :
                (
                  null
                )   
              }
                <Right style={{paddingRight: 40}}>
                <Text style={{fontSize: 20, paddingBottom: 20, paddingLeft: 5}}>{this.state.profile.fName} {this.state.profile.lName}</Text>
                <ProgressCircle
                  percent={progressPercent}
                  radius={50}
                  borderWidth={8}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor="#fff"
              >
                  <Text style={{ fontSize: 18}}>{progressPercent}%</Text>
              </ProgressCircle>
              <Text style={{paddingTop: 15, paddingLeft: 5}}>{this.state.xp} / 5000 EXP</Text>
                </Right>
              </View>

            <CardItem>
            <Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.props.navigation.navigate('EditProfile', { type: 'EDIT', profile: this.state.profile, editProfile: this.props.editProfile})}>
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
              <Right>
              <Button transparent textStyle={{color: '#87838B'}}>
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
    paddingBottom: 20
  },
  header: {
    flexDirection: 'column'
  }
});

export default ProfileScreen;
