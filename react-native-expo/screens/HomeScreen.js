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
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';
import Event from "../components/Event"
import { Header, Left, Body, Right, Button, Title, ActionSheet } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { Ionicons } from "@expo/vector-icons"
import { ImageIcon } from '../components/ImageIcon';
import orderBy from "lodash.orderby";
import { API, Auth } from "aws-amplify"
import NavIcon from "../components/NavIcon";

var BUTTONS = [
  { text: "Taban Cosmos", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Dave Parker", icon: "analytics", iconColor: "#f42ced" },
  { text: "Nick Ellingson", icon: "aperture", iconColor: "#ea943b" },
  // { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#fa213b" }
];
// var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const session = await Auth.currentSession()    
    try {
      const username = await session.accessToken.payload.username;
      const token = await session.accessToken.jwtToken;
      const id = await session.accessToken.payload.sub;
      const values = [['accessToken', token], ['username', username], ['id', id]]
      await AsyncStorage.multiSet(values)
      
      const response = await API.get('eventscrud', `/events/1ef9e44b-17d7-4ca5-8fc6-81bcd01bc2e3`)
      // console.log('List of events: ', response)
      const orderedArray = orderBy(response, function(item) {return item.date})
      this.setState({ events: orderedArray })

      const profile = await API.get('profile', `/profile/${id}`)
      await this.setState({ profile: profile[0] })
      await console.log(this.state.profile)

    } catch(e) {
      console.log(e)
    }
  }

  renderEvents = (events) => {
    return(
      <View>
      {events.map((event, i) => (
        new Date().getTime() < new Date(event.start).getTime() ? (
          <Event
                key={i} 
                name={event.name}
                description={event.description}
                date={event.date}
                start={event.start}
                end={event.end}
                link={event.link}
                // avatar={require('../assets/Apprentice.png')}
                />
        ) : <View key={i}></View>
        ))}
        </View>
      )
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
              <Ionicons style={{color: Platform.OS === 'android' ? 'white' : 'black' }} name="md-menu" size={32} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{textAlign: 'center'}}>#fsahub</Title>
          </Body>
          <Right>
            { this.state.profile === undefined ? (
              <Button hasText onPress={() => navigation.navigate('CreateProfile')} transparent>
              <Text style={{color: Platform.OS === 'android' ? 'white' : 'black'}}>Create Profile</Text>
            </Button>
            ) : (
              <Button hasText onPress={() => navigation.navigate('Profile')} transparent>
              <Text style={{color: Platform.OS === 'android' ? 'white' : 'black'}}>My Profile</Text>
            </Button>
            )

            }
            
          </Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>
          <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>Michael Litchev</RkText>
                  {/* <RkText rkType='subtitle'>Your FSA Instructor</RkText> */}
                  <RkText rkType='subtitle'>Seattle & Bellevue</RkText>

                </View>
              </View>
              {/* <RkButton rkType='clear'>
              <Icon name="group" style={iconButton} onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Switch Instructors"
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}/>
               <Text>{'\n'}</Text>
              <Text>Switch Instructor</Text> 

                 <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" /> 

              </RkButton> */}
            </View>            
          </RkCard>
          <Text>{'\n'}</Text>

          {/* <RkCard>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' >Sandbox</RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton style={{ marginRight: 16 }} onPress={() => {this.props.navigation.navigate('SandboxScreen')}}>Click Here</RkButton>
                  <RkButton rkType='clear ' >EXPLORE</RkButton>
                </View>
          </RkCard>   */}

          <Text style={{textAlign: 'center', fontSize: 20}}>Upcoming Events</Text>
          <Text>{'\n'}</Text>

          {this.renderEvents(this.state.events)}
          {/* <Text>{'\n'}</Text> */}


          <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 10}}>Learn & Earn Experience</Text>
          <Text>{'\n'}</Text>

          <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Portfolio Product</RkText>
                <RkText rkType='subtitle'>Status: 0 / 2000 EXP</RkText>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ExperienceScreen', {
                schema: 'productExperienceSchema'
              })}>
            <Image rkCardImg={true} source={require('../assets/product.png')} />
              </TouchableOpacity>
            <View rkCardContent={true}>
              <RkText rkType='cardText'>
                In 15 steps, you will go from a blank canvas to a scalable, performant & useful product in a production environment.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <RkButton rkType='clear link'>
                <Icon name="check" style={likeStyle} />
                <RkText rkType='accent' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'productExperienceSchema'
              })}>0/15 Achievements</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'productExperienceSchema'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>View Progress</RkText>
              </RkButton>
            </View>
          </RkCard> 

          <Text>{'\n'}</Text>

        
        <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Apprentice => Developer</RkText>
                <RkText rkType='subtitle'>Status: 0 / 5000 EXP</RkText>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ExperienceScreen', {
                schema: 'apprenticeExperienceSchema'
              })}>
            <Image rkCardImg={true} source={require('../assets/exp.png')} />
            </TouchableOpacity>
            <View rkCardContent={true}>
              <RkText rkType='cardText'>
                Work through these 15 tasks to achieve certified status as an FSA Developer.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <RkButton rkType='clear link'>
                <Icon name="check" style={likeStyle} />
                <RkText rkType='accent' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'apprenticeExperienceSchema'
              })}>0/15 Achievements</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'apprenticeExperienceSchema'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>View Progress</RkText>
              </RkButton>
            </View>
          </RkCard> 

          <Text>{'\n'}</Text>

          <Text style={{textAlign: 'center', fontSize: 20}}>Educational Resources</Text>
          <Text>{'\n'}</Text>

          <RkCard rkType='heroImage shadowed'>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('BlueprintScreen')}>
              <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
              </TouchableOpacity>
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>The Blueprint</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>60 page manual covering the tools of our Technical Standard, finding freelance work, building the right portfolio projects and adding structure to the learning process.</RkText>
                </View>
              </View>
            </View>
          </RkCard> 


          
          <Text>{'\n'}</Text>


          
          <RkCard rkType='shadowed'>
            <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Subcategories', {
            schema: "findingWork"
          })}>
              <Image rkCardImg={true} source={require('../assets/post4.png')} />
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <RkText rkType='header xxlarge' style={{ color: 'white' }}>Getting Paid</RkText>
              </View>
              </TouchableOpacity>

            </View>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType='subtitle'>Freelancing, Full-Time, Start-ups</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
                Curated resources including document templates for freelancing agreements, start-up formation advice, job boards for finding fulfilling work at a top organization.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
               
              </View>
            </View>
          </RkCard> 

          <Text>{'\n'}</Text>

          
          <RkCard rkType='shadowed'>
            <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Subcategories', {
            schema: "fullStackApprenticeship"
          })}>
              <Image rkCardImg={true} source={require('../assets/javascript.jpg')} />
              <View rkCardImgOverlay={true} />
              </TouchableOpacity>
            </View>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType='header xxlarge'>FSA Technical Standard</RkText>
                <RkText rkType='subtitle'>Curated Knowledge Base</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
                The top tutorials, articles & videos on Node.js, React, AWS & everything else needed to build scalable, performant applications.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>

              </View>
            </View>
          </RkCard>

          <Text>{'\n'}</Text>

          <RkCard>
          <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Technical Training Membership (Premium)</RkText>
                {/* <RkText rkType='subtitle'>{moment(this.props.date).format('MMMM Do YYYY, h:mm:ss a').split(",")[0]} | {this.props.start} - {this.props.end}</RkText> */}
                <RkText rkType='subtitle'>Includes 4 sprints</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>Membership Includes:{'\n'}{'\n'}
              - Experience system & online leaderboards to track progress towards certification as a competent Developer, which comes with lifetime membership to our React, Node, AWS focused member directory to connect you with economic opportunity.{'\n'}{'\n'}
              - Weekly Sprint Planning Meeting (Saturday/Sunday) to plan & estimate the work to be done throughout the duration of the sprint.{'\n'}{'\n'}
              - Daily Stand-up Meeting (Morning or After-Work) to check-in with your teacher/teammates on what you've done - what's you are stuck on - and what you are working on that day. {'\n'}{'\n'}
              - Weekly Sprint Retrospective Meeting (Friday) to review the work that was accomplished, compare our time to our original time estimates, & learn how we can more effectively operate as a team. {'\n'}{'\n'}
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="dollar" style={likeStyle} />
                <RkText rkType='accent'>400.00</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="clock-o" style={iconButton} />
                <RkText rkType='hint'>1 Month</RkText>
              </RkButton>
              {/* <RkButton rkType='clear link' onPress={() => navigation.navigate('PaymentScreen', {
                amount: '245'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>Pay Here</RkText>
              </RkButton> */}
            </View>
          </RkCard>
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
