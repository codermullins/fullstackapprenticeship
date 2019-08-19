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
import { UtilStyles } from '../style/styles';
import { Ionicons, Entypo } from "@expo/vector-icons"
import orderBy from "lodash.orderby";
import { API, Auth } from "aws-amplify"

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      profile: { instructor: false},
      product: { xpEarned: 0, achievements: 0 },
      apprenticeship: { xpEarned: 0, achievements: 0 },
      xp: null,
      loading: true,
      apprentices: [],
      instructor: false

    }
    this.updateProfile = this.updateProfile.bind(this)
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const session = await Auth.currentSession()  
    console.log('Instructor screen session: ', session)

    
    Platform.OS === 'android' ? Permissions.askAsync(Permissions.NOTIFICATIONS) : console.log('No iOS')

     
    try {
      const username = await session.accessToken.payload.username;
      const token = await session.accessToken.jwtToken;
      const id = await session.accessToken.payload.sub;
      const values = [['accessToken', token], ['username', username], ['id', id]]
      await AsyncStorage.multiSet(values)

      await this.fetchProfile(id)

      await this.fetchApprentices(id);

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

  async fetchProfile(id) {
    const profile = await API.get('pareto', `/users/${id}`)
    console.log('Profile: ', profile[0])
    if (profile[0].instructor === false) {
      console.log('Not an instructor')
    } else {
      await this.setState({ profile: profile[0], instructor: true })
    } 
  }

  updateProfile(obj) {
    this.setState({ profile: obj})
  }

  async fetchApprentices(id) {
      const response = await API.get('pareto', `/mentor/${id}`);
      await this.setState({ apprentices: response })
      let apprenticeKeys = []
      response.forEach(function(apprentice) {
        apprenticeKeys.push(apprentice.expo)
      })
      this.setState({ apprenticeKeys: apprenticeKeys })
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
                  <RkText rkType='header'>{apprentice.fName} {apprentice.lName}</RkText>
                  <RkText rkType='subtitle'>{apprentice.technicalRank}</RkText>
            </View>
            <View rkCardFooter={true}>
            <Left>

              <RkText rkType='header'><Entypo name="github" size={24} /> {apprentice.github}</RkText>
            </Left>
            <Right>

              <RkText>{apprentice.city}, {apprentice.country}</RkText>
            </Right>
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
            <Title>Instructor</Title>
          </Body>
          <Right>
            <View></View>
          </Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>
          
          { this.state.profile.instructor === false ? (
            <RkCard rkType='heroImage shadowed'>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('InstructorRegistrationScreen', {
              function: this.updateProfile
            })}>
              <Image rkCardImg={true} source={require('../assets/mentors.png')} />
              </TouchableOpacity>
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>Become an Instructor</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>Apply to become a senior member of the FSA, and mentor the next generation of full-stack developers.</RkText>
                </View>
              </View>
            </View>
          </RkCard> 
          ) : (
            <View>
            <RkCard rkType='heroImage shadowed'>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateEventScreen', {keys: this.state.apprenticeKeys})}>
              <Image rkCardImg={true} source={require('../assets/calendar.png')} />
              </TouchableOpacity>
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>Create Event</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>Organize your apprentices learning process & alart them through push notifications.</RkText>
                </View>
              </View>
            </View>
          </RkCard> 
          <Text>{'\n'}</Text>

          <Text style={{textAlign: 'left', fontSize: 30, paddingTop: 10, paddingLeft: 14}}>My Students</Text>
          <Text>{'\n'}</Text> 

          { this.renderApprentices(this.state.apprentices)}
          </View>
          )
        }
          <Loader loading={this.state.loading} />
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
    marginHorizontal: 20,
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
