import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Notifications, Permissions } from "expo"
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';
import Event from "../components/Event"
import Loader from "../components/Loader";
import { Header, Left, Body, Right, Button, Title } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { Ionicons } from "@expo/vector-icons"
import orderBy from "lodash.orderby";
import { API, Auth } from "aws-amplify"

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      profile: null,
      product: { xpEarned: 0, achievements: 0 },
      apprenticeship: { xpEarned: 0, achievements: 0 },
      xp: null,
      loading: true,
      apprentices: []

    }
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const session = await Auth.currentSession()  

    
    Platform.OS === 'android' ? Permissions.askAsync(Permissions.NOTIFICATIONS) : console.log('No iOS')

     
    try {
      const username = await session.accessToken.payload.username;
      const token = await session.accessToken.jwtToken;
      const id = await session.accessToken.payload.sub;
      const values = [['accessToken', token], ['username', username], ['id', id]]
      await AsyncStorage.multiSet(values)

    //   await this.fetchProfile(id)

 

    //   const xp = await this.calculateExperience()

    //   this.setState({ xp: xp})

      await this.fetchApprentices();

      await this.stopLoading();

      // const notificationToken = await Notifications.getExpoPushTokenAsync();
      // console.log('Notification Token: ', notificationToken)
      
    } catch(e) {
      // Improve error handling here
      this.setState({ loading: false })
      // alert(e)
      console.log(e)
    }
  }

  async fetchApprentices() {
      const response = await API.get('fsa', `/users/`);
    //   await console.log('Apprentices: ', response)
      await this.setState({ apprentices: response })
  }

  async calculateExperience() {
    let productXP = this.state.product.xpEarned;
    let apprenticeshipXP = this.state.apprenticeship.xpEarned;
    const xp = productXP + apprenticeshipXP;
    return xp;
  }

  async stopLoading() {
    this.setState({ loading: false })
  }

  getAvatar = async (github) => {
    const user = await fetch(`https://api.github.com/users/${github}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const avatar = JSON.parse(user._bodyText);
    const url = avatar.avatar_url;
    return url;
  }

  renderApprentices = (apprentices) => {
      return(
          <View>
              {apprentices.map((apprentice, index) => {
                return (
                  <RkCard rkType='shadowed' key={index}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentProfileScreen', {
                      profile: apprentice
                     
                    })}>
                    <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                {/* <Image source={require('../assets/michael.jpg')} style={styles.avatar} /> */}
                <View style={{}}>
                  <RkText rkType='header'>{apprentice.fName} {apprentice.lName}</RkText>
                  {/* <RkText rkType='subtitle'>6 minutes ago</RkText> */}
                </View>
              </View>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                {/* <Icon name="heart" /> */}
                <RkText rkType='accent'>Rank: {apprentice.technicalRank}</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                {/* <Icon name="comment-o" /> */}
                <RkText rkType='hint'>{apprentice.city}, {apprentice.country}</RkText>
              </RkButton>
            </View>
          </RkCard> 
                    </TouchableOpacity>
                </RkCard> 
              )})
            }
          </View>
      )
  }

    updateExperience(name, obj) {
      if (name === 'Product') {
        this.setState({ product: obj })
      } else {
        this.setState({ apprenticeship: obj})
      }
    }

    updateProfile(obj) {
      this.setState({ profile: obj})
    }


  render() {

    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 24 : 0 }}>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons style={{color: Platform.OS === 'android' ? 'white' : 'black', paddingLeft: 10 }} name="md-menu" size={32} />
            </TouchableOpacity>
          </Left>
          <Body>
            {/* <Title>#fsa206</Title> */}
          </Body>
          <Right>
            <View></View>
          </Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>
          {/* <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>Michael Litchev</RkText>
                  <RkText rkType='subtitle'>Seattle & Bellevue Instructor</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
              <Icon name="group" style={iconButton} />
               <Text>{'\n'}</Text>
              <Text>Switch Instructor</Text> 

                 <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" /> 

              </RkButton> 
            </View>            
          </RkCard> */}

          {/* <RkCard>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' >Sandbox</RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton style={{ marginRight: 16 }} onPress={() => {this.props.navigation.navigate('SandboxScreen')}}>Click Here</RkButton>
                  <RkButton rkType='clear ' >EXPLORE</RkButton>
                </View>
          </RkCard>   */}

<Text style={{textAlign: 'left', fontSize: 30, paddingTop: 10, paddingLeft: 14}}>Create Event</Text>
          <Text>{'\n'}</Text> 

            <RkCard rkType='heroImage shadowed'>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateEventScreen')}>
              <Image rkCardImg={true} source={require('../assets/events.png')} />
              </TouchableOpacity>
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>Create Event</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>Organize your apprentices learning process & alart them through push notifications.</RkText>
                </View>
              </View>
            </View>
          </RkCard> 

          <RkCard>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ReviewResourcesScreen')}>
            <RkText rkType="header xxlarge">View Resources</RkText>
            </TouchableOpacity>
            <View>
              
            </View>
          </View>
          </RkCard>

          <Text>{'\n'}</Text>
          <Text style={{textAlign: 'left', fontSize: 30, paddingTop: 10, paddingLeft: 14}}>My Students</Text>
          <Text>{'\n'}</Text> 

          { this.renderApprentices(this.state.apprentices)}

          <Loader loading={this.state.loading} />

          <Text>{'\n'}</Text>
          

        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12,
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17,
  },
  header: {
    fontSize: 30,
    paddingLeft: 14,
    textAlign: 'left'
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
    backgroundColor: 'purple'
  },
  footerButtons: {
    flexDirection: 'row',
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16,
  },
});
