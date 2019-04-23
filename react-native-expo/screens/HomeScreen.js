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
      loading: true

    }
    this.updateExperience = this.updateExperience.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
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

      await this.fetchEvents();
      await this.fetchProfile(id)
      // await console.log('Profile: ', this.state.profile)

      await this.fetchProduct(this.state.profile.productId);

      // await console.log('Product: ', this.state.product)

      await this.fetchApprenticeship(this.state.profile.apprenticeshipId)
      // await console.log('Apprenticeship: ', this.state.apprenticeship)

      const xp = await this.calculateExperience()

      this.setState({ xp: xp})

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
  
  async fetchEvents() {
    const response = await API.get('events', `/events/bdaad57c-2183-468a-a114-493c19327762`)
    const orderedArray = orderBy(response, function(item) {return item.start})
    this.setState({ events: orderedArray })
  }
  
  async fetchProfile(id) {
    const profile = await API.get('fsa', `/users/${id}`)
    console.log('Length: ', profile.length)
    if (profile.length === 0) {
      this.props.navigation.navigate('CreateProfile', { function: this.updateProfile })
    } else {
      await this.setState({ profile: profile[0] })
    } 
  }

  async fetchProduct(id) {
    const product = await API.get('fsa', `/experience/${id}`)
    await this.setState({ product: product[0] })
  }

  async fetchApprenticeship(id) {
    const apprenticeship = await API.get('fsa', `/experience/${id}`)
    await this.setState({ apprenticeship: apprenticeship[0] })
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
                />
        ) : null
        ))}
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

          <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>My Apprenticeship Trainer</RkText>
                  <RkText rkType='subtitle'>Michael Litchev</RkText>
                </View>
              </View>
              {/* <RkButton rkType='clear'>
              <Icon name="group" style={iconButton} />
               <Text>{'\n'}</Text>
              <Text>Switch Instructor</Text> 

                 <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" /> 

              </RkButton>  */}
            </View>            
          </RkCard>

          {/* <RkCard>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' >Sandbox</RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton style={{ marginRight: 16 }} onPress={() => {this.props.navigation.navigate('SandboxScreen')}}>Click Here</RkButton>
                  <RkButton rkType='clear ' >EXPLORE</RkButton>
                </View>
          </RkCard>   */}

          <Loader loading={this.state.loading} />


          <Text>{'\n'}</Text>
          

          {this.renderEvents(this.state.events)}

          {this.state.profile !== undefined ? (
            <View>
            {/* <Text style={{textAlign: 'center', fontSize: 30, paddingTop: 10, paddingBottom: 15 }}>My Profile</Text> */}
            <RkCard rkType='shadowed'>
            <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {
                xp: this.state.xp,
                profile: this.state.profile
              })}>
              <Image rkCardImg={true} source={require('../assets/profile.png')} />
              </TouchableOpacity>
            </View>
          </RkCard> 
          </View>
          ) : (
            <View>
            <Text style={{textAlign: 'left', paddingLeft: 14, fontSize: 30, paddingTop: 26, paddingBottom: 20}}>Create Profile</Text>

            <RkCard rkType='shadowed'>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateProfile', {
              function: this.updateProfile
            })}>
              <Image rkCardImg={true} source={require('../assets/create.png')} />
              </TouchableOpacity>
          </RkCard> 
          </View>
          )}

          <Text>{'\n'}</Text>
          <Text style={{textAlign: 'center', fontSize: 30, paddingTop: 10, paddingLeft: 14}}>Learn & Earn Experience</Text>
          <Text>{'\n'}</Text>

          <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Start Your Apprenticeship</RkText>
                <RkText rkType='subtitle'>Status: {this.state.apprenticeship.xpEarned.toString()} / 5000 EXP</RkText>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ExperienceScreen', {
                schema: 'apprenticeExperienceSchema',
                experience: this.state.apprenticeship,
                function: this.updateExperience,
                origin: 'Apprentice'
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
                schema: 'apprenticeExperienceSchema',
                experience: this.state.apprenticeship,
                function: this.updateExperience,
                origin: 'Apprentice'

              })}>{this.state.apprenticeship.achievements.toString()}/15 Achievements</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'apprenticeExperienceSchema',
                experience: this.state.apprenticeship,
                function: this.updateExperience,
                origin: 'Apprentice'

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
                <RkText rkType='header'>Portfolio Product</RkText>
                <RkText rkType='subtitle'>Status: {this.state.product.xpEarned.toString()} / 2000 EXP</RkText>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ExperienceScreen', {
                schema: 'productExperienceSchema',
                experience: this.state.product,
                function: this.updateExperience,
                origin: 'Apprentice'


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
                schema: 'productExperienceSchema',
                experience: this.state.product,
                function: this.updateExperience,
                origin: 'Apprentice'

              })}>{this.state.product.achievements.toString()}/15 Achievements</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                schema: 'productExperienceSchema',
                experience: this.state.product,
                function: this.updateExperience,
                origin: 'Apprentice'

              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>View Progress</RkText>
              </RkButton>
            </View>
          </RkCard> 

          <Text>{'\n'}</Text>

        
        



          <Text style={{textAlign: 'center', fontSize: 30, paddingTop: 10, paddingLeft: 14}}>Educational Resources</Text>
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

          <RkCard rkType='heroImage shadowed'>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('BlueprintScreen')}>
              <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
              </TouchableOpacity>
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>The Blueprint</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>Manual covering the tools of our Technical Standard, finding freelance work, building the right portfolio projects and adding structure to the learning process.</RkText>
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
