import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import * as Permissions from 'expo-permissions'
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten'
import Event from '../components/Event'
import Loader from '../components/Loader'
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Segment,
  Content,
  Container,
  Tabs,
  Tab
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { UtilStyles } from '../style/styles'
import { Ionicons } from '@expo/vector-icons'
import orderBy from 'lodash.orderby'
import { API, Auth } from 'aws-amplify'
import ProfileScreen from '../profile/ProfileScreen'
// import Toast from 'react-native-simple-toast'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      profile: {
        instructor: false
      },
      product: { xpEarned: 0, achievements: 0 },
      apprenticeship: { xpEarned: 0, achievements: 0 },
      xp: null,
      loading: true,
      sprints: [{ 
        events: [],
      }],
      mentorship: [{tasks: []}]
    }
    this.updateExperience = this.updateExperience.bind(this)
    this.fetchEvents = this.fetchEvents.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }
  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    const session = await Auth.currentSession()

    Platform.OS === 'android'
      ? Permissions.askAsync(Permissions.NOTIFICATIONS)
      : console.log('No iOS')

    try {
      const username = await session.accessToken.payload.username
      const token = await session.accessToken.jwtToken
      const id = await session.accessToken.payload.sub
      const values = [
        ['accessToken', token],
        ['username', username],
        ['id', id]
      ]
      await AsyncStorage.multiSet(values)

      await this.fetchProfile(id)
      // await console.log('Profile: ', this.state.profile)

      await this.fetchProduct(this.state.profile.productId)

      // await console.log('Product: ', this.state.product)

      await this.fetchApprenticeship(this.state.profile.apprenticeshipId)
      // await console.log('Apprenticeship: ', this.state.apprenticeship)

      await this.fetchSprints(id);

      await this.fetchMentorship(id);


      const xp = await this.calculateExperience()

      this.setState({ xp: xp })


      // await this.fetchEvents()
      await this.stopLoading()

      // const notificationToken = await Notifications.getExpoPushTokenAsync();
      // console.log('Notification Token: ', notificationToken)
    } catch (e) {
      // Improve error handling here
      console.log('This is the error: ', e)
    }
  }

  fetchEvents = async () => {
    const response = await API.get(
      'events',
      `/events/${this.state.profile.mentor}`
    )
    const orderedArray = orderBy(response, function(item) {
      return item.start
    })
    this.setState({ events: orderedArray })
  }

  async fetchSprints(id) {
    const response = await API.get('pareto', `/sprints/mentee/${id}`);
    console.log('Sprints Request: ', response)
    this.setState({ sprints: response })
  }

  async fetchMentorship(id) {
    const response = await API.get('pareto', `/relationship/mentee/${id}`);
    console.log('Mentorship: ', response);
    this.setState({ mentorship: response})
  }

  async fetchProfile(id) {
    const profile = await API.get('pareto', `/users/${id}`)
    if (profile.length === 0) {
      this.props.navigation.navigate('CreateProfile', {
        function: this.updateProfile,
        experience: this.updateExperience
      })
      this.setState({ loading: false })
    } else {
      await this.setState({ profile: profile[0] })
    }
  }

  async fetchProduct(id) {
    const product = await API.get('pareto', `/experience/${id}`)
    await this.setState({ product: product[0] })
  }

  async fetchApprenticeship(id) {
    const apprenticeship = await API.get('pareto', `/experience/${id}`)
    await this.setState({ apprenticeship: apprenticeship[0] })
  }

  async calculateExperience() {
    let productXP = this.state.product.xpEarned
    let apprenticeshipXP = this.state.apprenticeship.xpEarned
    const xp = productXP + apprenticeshipXP
    return xp
  }

  async stopLoading() {
    this.setState({ loading: false })
  }

  renderEvents = events => {
    return (
      <React.Fragment>
        {events.length < 1 ? (<Text>Your Mentor has not scheduled any upcoming meetings. Click here to ping them and remind them!</Text>) : (
          <View style={{ padding: 12 }}>
            {events.map((event, i) =>
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
            )}
          </View> 
               )}
      </React.Fragment>
    )
  }

  markComplete(index) {
    try {
      console.log('API request goes here');
    } catch(e) {
      console.log(e)
    }
  }

  renderTasks(mentorship) {
    return mentorship.tasks.map((task, i) => {
      return (
        <View>
          <RkCard rkType="shadowed" key={i}>
                  <RkCard>
                    <View rkCardHeader={true}>
                      <RkText rkType="header">
                        {task.title}
                      </RkText>
                      {/* <RkText>Edit</RkText> */}
                      <RkButton onPress={() => markComplete(i)}>Mark Complete</RkButton>
                    </View>
                    <View rkCardFooter={true} style={{display: 'flex', flexDirection: 'column'}}>
                    <RkText rkType="subtitle">
                          {task.details}
                        </RkText>
                        <RkText>Due Date: {task.dueDate}</RkText>
                    </View>
                  </RkCard>
              </RkCard>
            </View>

      )
    })
  }

  updateExperience(name, obj) {
    if (name === 'Product') {
      this.setState({ product: obj })
    } else {
      this.setState({ apprenticeship: obj })
    }
  }

  updateProfile(obj) {
    this.setState({ profile: obj })
  }

  render() {
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }]
    const iconButton = [
      styles.buttonIcon,
      { color: RkTheme.current.colors.text.hint }
    ]
    const { navigation } = this.props;
    console.log('Mentee sprints: ', this.state.sprints)

    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 24 : 0 }}>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                style={{
                  color: Platform.OS === 'android' ? 'white' : 'black',
                  paddingLeft: 10
                }}
                name="md-menu"
                size={32}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>{'<Pareto />'}</Title>
          </Body>
          <Right>{/* <Text>v 0.94</Text> */}</Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}
        >
          <Loader loading={this.state.loading} />
          <Tabs>
            {this.state.profile.instructor === false ? (

            <Tab heading="Mentor">
                {this.renderTasks(this.state.mentorship[0])}
                {this.renderEvents(this.props.screenProps.events)}
                {this.renderEvents(this.state.sprints[0].events)}
            </Tab>
            ) : (
              null
            )}
            <Tab heading="Experience">
              <RkCard>
                <View rkCardHeader={true}>
                  <View>
                    <RkText rkType="header">Start Your Apprenticeship</RkText>
                    <RkText rkType="subtitle">
                      Status: {this.state.apprenticeship.xpEarned.toString()} /
                      5000 EXP
                    </RkText>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ExperienceScreen', {
                      schema: 'apprenticeExperienceSchema',
                      experience: this.state.apprenticeship,
                      function: this.updateExperience,
                      origin: 'Apprentice',
                      profile: this.state.profile
                    })
                  }
                >
                  <Image
                    rkCardImg={true}
                    source={require('../assets/exp.png')}
                  />
                </TouchableOpacity>
                <View rkCardContent={true}>
                  <RkText rkType="cardText">
                    Work through these 15 tasks to achieve certified status as
                    an junior Full-Stack Developer.
                  </RkText>
                </View>
                <View rkCardFooter={true}>
                  <RkButton rkType="clear link">
                    <Icon name="check" style={likeStyle} />
                    <RkText
                      rkType="accent"
                      onPress={() =>
                        this.props.navigation.navigate('ExperienceScreen', {
                          schema: 'apprenticeExperienceSchema',
                          experience: this.state.apprenticeship,
                          function: this.updateExperience,
                          origin: 'Apprentice',
                          profile: this.state.profile
                        })
                      }
                    >
                      {this.state.apprenticeship.achievements.toString()}/15
                      Achievements
                    </RkText>
                  </RkButton>
                  <RkButton
                    rkType="clear link"
                    onPress={() =>
                      this.props.navigation.navigate('ExperienceScreen', {
                        schema: 'apprenticeExperienceSchema',
                        experience: this.state.apprenticeship,
                        function: this.updateExperience,
                        origin: 'Apprentice',
                        profile: this.state.profile
                      })
                    }
                  >
                    <Icon name="send-o" style={iconButton} />
                    <RkText rkType="hint">View Progress</RkText>
                  </RkButton>
                </View>
              </RkCard>

              <Text>{'\n'}</Text>

              <RkCard>
                <View rkCardHeader={true}>
                  <View>
                    <RkText rkType="header">Portfolio Product</RkText>
                    <RkText rkType="subtitle">
                      Status: {this.state.product.xpEarned.toString()} / 2000
                      EXP
                    </RkText>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ExperienceScreen', {
                      schema: 'productExperienceSchema',
                      experience: this.state.product,
                      function: this.updateExperience,
                      origin: 'Apprentice',
                      profile: this.state.profile
                    })
                  }
                >
                  <Image
                    rkCardImg={true}
                    source={require('../assets/product.png')}
                  />
                </TouchableOpacity>
                <View rkCardContent={true}>
                  <RkText rkType="cardText">
                    In 15 steps, you will go from a blank canvas to a scalable,
                    performant & useful product in a production environment.
                  </RkText>
                </View>
                <View rkCardFooter={true}>
                  <RkButton rkType="clear link">
                    <Icon name="check" style={likeStyle} />
                    <RkText
                      rkType="accent"
                      onPress={() =>
                        this.props.navigation.navigate('ExperienceScreen', {
                          schema: 'productExperienceSchema',
                          experience: this.state.product,
                          function: this.updateExperience,
                          origin: 'Apprentice',
                          profile: this.state.profile
                        })
                      }
                    >
                      {this.state.product.achievements.toString()}/15
                      Achievements
                    </RkText>
                  </RkButton>
                  <RkButton
                    rkType="clear link"
                    onPress={() =>
                      this.props.navigation.navigate('ExperienceScreen', {
                        schema: 'productExperienceSchema',
                        experience: this.state.product,
                        function: this.updateExperience,
                        origin: 'Apprentice',
                        profile: this.state.profile
                      })
                    }
                  >
                    <Icon name="send-o" style={iconButton} />
                    <RkText rkType="hint">View Progress</RkText>
                  </RkButton>
                </View>
              </RkCard>
            </Tab>
            <Tab heading="Learning">
              <RkCard rkType="shadowed">
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Subcategories', {
                        schema: 'fullStackApprenticeship'
                      })
                    }
                  >
                    <Image
                      rkCardImg={true}
                      source={require('../assets/javascript.jpg')}
                    />
                    <View rkCardImgOverlay={true} />
                  </TouchableOpacity>
                </View>
                <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
                  <View>
                    <RkText rkType="header xxlarge">
                      The Pareto Stack
                    </RkText>
                    <RkText rkType="subtitle">Curated Knowledge Base</RkText>
                  </View>
                </View>
                <View rkCardContent={true}>
                  <RkText rkType="compactCardText">
                    The top tutorials, articles & videos on Node.js, React, AWS
                    & everything else needed to build scalable, performant
                    applications.
                  </RkText>
                </View>
                <View rkCardFooter={true}>
                  <View style={styles.footerButtons} />
                </View>
              </RkCard>

             

              <Text>{'\n'}</Text>

              <RkCard rkType="shadowed">
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Subcategories', {
                        schema: 'findingWork'
                      })
                    }
                  >
                    <Image
                      rkCardImg={true}
                      source={require('../assets/post4.png')}
                    />
                    <View rkCardImgOverlay={true} style={styles.overlay}>
                      <RkText
                        rkType="header xxlarge"
                        style={{ color: 'white' }}
                      >
                        Getting Paid
                      </RkText>
                    </View>
                  </TouchableOpacity>
                </View>
                <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
                  <View>
                    <RkText rkType="subtitle">
                      Freelancing, Full-Time, Start-ups
                    </RkText>
                  </View>
                </View>
                <View rkCardContent={true}>
                  <RkText rkType="compactCardText">
                    Curated resources including document templates for
                    freelancing agreements, start-up formation advice, job
                    boards for finding fulfilling work at a top organization.
                  </RkText>
                </View>
                <View rkCardFooter={true}>
                  <View style={styles.footerButtons} />
                </View>
              </RkCard>
              <Text>{'\n'}</Text>

              <RkCard rkType="heroImage shadowed">
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('BlueprintScreen')}
                  >
                    <Image
                      rkCardImg={true}
                      source={require('../assets/blueprint.jpg')}
                    />
                  </TouchableOpacity>
                  <View rkCardImgOverlay={true} style={styles.overlay}>
                    <View style={{ marginBottom: 20 }}>
                      <RkText
                        rkType="header xxlarge"
                        style={{ color: 'white' }}
                      >
                        The Blueprint
                      </RkText>
                      <RkText rkType="subtitle" style={{ color: 'white' }}>
                        Manual covering the tools of our Technical Standard,
                        finding freelance work, building the right portfolio
                        projects and adding structure to the learning process.
                      </RkText>
                    </View>
                  </View>
                </View>
              </RkCard>
            </Tab>
            <Tab heading="Profile">
              <ProfileScreen
                xp={this.state.xp}
                navigation={this.props.navigation}
                profile={this.state.profile}
                updateProfile={this.updateProfile}
              />
            </Tab>
          </Tabs>
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5'
    // padding: 12
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7
  },
  footer: {
    marginHorizontal: 16
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17
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
    marginVertical: 10
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
    flexDirection: 'row'
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16
  }
})
