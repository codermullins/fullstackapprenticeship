import React, { Component } from 'react'
import { API, Auth } from 'aws-amplify'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Picker
} from 'native-base'
import Loader from '../components/Loader'
import { Notifications } from 'expo'
import { Text, View, AsyncStorage } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
// import Toast from 'react-native-simple-toast'

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fName: `${this.props.navigation.state.params.profile.fName}`,
      lName: `${this.props.navigation.state.params.profile.lName}`,
      city: `${this.props.navigation.state.params.profile.city}`,
      country: `${this.props.navigation.state.params.profile.country}`,
      expo: `${this.props.navigation.state.params.profile.expo}`,
      github: `${this.props.navigation.state.params.profile.github}`,
      dob: '',
      mbriggs: '',
      loading: false,
      cca2: 'US',
      mentors: [],
      mentor: `${this.props.navigation.state.params.profile.mentor}`,
      session: {},
      email: ""
    }
  }

  async componentDidMount() {
    const mentors = await API.get('pareto', '/mentors')
    this.setState({ mentors: mentors })
    const session = await Auth.currentSession()
    this.setState({ email: session.idToken.payload.email })
    const notificationToken = await Notifications.getExpoPushTokenAsync()
    this.setState({ expo: notificationToken })
  }

  renderMentors(mentors) {
    let mentorList = mentors.map((mentor, i) => {
      return (
        <Picker.Item
          key={i}
          label={`${mentor.fName} ${mentor.lName}`}
          value={mentor.id}
        />
      )
    })
    return mentorList
  }

  onMentorChange = value => {
    this.setState({
      mentor: value
    })
  }

  editProfile = async () => {
    this.setState({ loading: true })
    const id = await AsyncStorage.getItem('id')
    const update = this.props.navigation.getParam('editProfile', 'none')
    const body = {
      fName: this.state.fName,
      lName: this.state.lName,
      email: this.state.email,
      city: this.state.city,
      country: this.state.country,
      tRank: 'Developer',
      github: this.state.github,
      expo: this.state.expo,
      mentor: this.state.mentor
    }
    try {
      const updatedProfile = await API.put('pareto', `/users/${id}`, { body })
      update(updatedProfile)
      this.setState({ loading: false })
      // Toast.show('Profile saved');
    } catch (e) {
      console.log('ERROR: ', e)
      // Toast.show('An error occurred');
    }
    this.setState({
      attribute: ''
    })
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <Content>
          <Loader loading={this.state.loading} />
          <Form>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input
                returnKeyType="search"
                value={this.state.fName}
                onChangeText={fName => this.setState({ fName })}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input
                returnKeyType="search"
                value={this.state.lName}
                onChangeText={lName => this.setState({ lName })}
                autoCapitalize="none"
              />
            </Item>
            <Item stackedLabel>
              <Label>City</Label>
              <Input
                returnKeyType="search"
                value={this.state.city}
                onChangeText={city => this.setState({ city })}
                autoCapitalize="none"
              />
            </Item>
            <Text>{`\n`}</Text>
            <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
              <Text>Tap flag to Select Country: </Text>
              <CountryPicker
                onChange={value =>
                  this.setState({ country: value.name, cca2: value.cca2 })
                }
                cca2={this.state.cca2}
                translation="eng"
              />
            </View>
            <Text style={{ paddingLeft: 15 }}>{this.state.country}</Text>

            <Text>{'\n'}</Text>
            {/* <Text style={{ paddingLeft: 15 }}>Your Mentor</Text>
            <Picker
              mode="dropdown"
              header="Mentor"
              selectedValue={this.state.mentor}
              onValueChange={this.onMentorChange}
              placeholder="Select Here"
            >
              {this.renderMentors(this.state.mentors)}
            </Picker> */}

            <Item stackedLabel>
              <Label>GitHub Username</Label>
              <Input
                returnKeyType="search"
                value={this.state.github}
                onChangeText={github => this.setState({ github })}
                autoCapitalize="none"
              />
            </Item>
            <Text>{`\n`}</Text>
            <Button
              full
              style={{ backgroundColor: '#6200EE' }}
              onPress={this.editProfile}
            >
              <Text style={{ color: 'white' }}>Save Changes</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
