import React, { Component } from 'react'
import { API } from 'aws-amplify'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  Container,
  Content,
  Picker,
} from 'native-base'

import {
  RkText,
  RkTextInput,
  RkButton,
  RkCard,
  RkTheme
} from 'react-native-ui-kitten'

import uuidv4 from 'uuid'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'

export default class CreateSprintScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      start: '',
      end: '',
      link: 'Pareto',
      mentorId: 'b245324f-39d5-4d27-a1a4-e31358ebdb84',
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      test: "bleh",
      planning: {start: '', end: ''},
      standup1: {start: '', end: ''},
      standup2: {},
      standup3: {},
      standup4: {},
      standup5: {},
      retro: {start: '', end: ''},
      init: true,
      standup: false,
      finit: false, 
      mentor: {},
      mentee: {},
      apprentices: []
    }
  }

  async componentDidMount() {
    const mentor = this.props.navigation.getParam('mentor', 'none');
    const apprentices = this.props.navigation.getParam('apprentices', 'none');
    this.setState({
      mentor: mentor, apprentices: apprentices
    })
  }

  onMenteeChange = value => {
    this.setState({
      mentee: value
    })
  }

  showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true })

  showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true })

  hideStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: false })

  hideEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: false })

  handleStartDatePicked = date => {
    this.setState({ start: date })
    this.hideStartDateTimePicker()
  }

  handleEndDatePicked = date => {
    this.setState({ end: date })
    this.hideEndDateTimePicker()
  }

  savePlanning = () => {
    try {
      this.setState({ init: false, standup: true, start: '', end: '', planning: { start: this.state.start, end: this.state.end} })
    } catch(e) {
      console.log('Saving planning ', e)
    }
  }

  saveStandup = () => {
    try {
      this.setState({ standup: false, finit: true, start: '', end: '', standup1: { start: this.state.start, end: this.state.end}   })
    } catch(e) {
      console.log('Saving planning ', e)
    }
  }

  anotherStandup = () => {
    try {
      this.setState({ start: '', end: ''  })
    } catch(e) {
      console.log('Saving planning ', e)
    }
  }

  saveRetro = async () => {

    let retro = {
      end: this.state.end,
      start: this.state.start,
      name: 'Sprint Retrospective',
      createdAt: Date.now(),
      description: 'The meeting where we review the estimates we created at the Sprint Planning meeting, comparing them to how much time it actually took to complete those ticket items.',
      link: uuidv4(),
      type: 'Appr'
    }

    let planning = {
      end: this.state.planning.start,
      start: this.state.planning.end,
      name: 'Sprint Planning',
      createdAt: Date.now(),
      description: 'The meeting where we review the product backlog, and determine what ticket items we work on this week. We then estimate how many items each developer can accomplish, based on estimated length or through story points.',
      link: uuidv4(),
      type: 'Appr'
    }

    let standup1 = {
      end: this.state.standup1.start,
      start: this.state.standup1.end,
      name: 'Standup Meeting',
      createdAt: Date.now(),
      description: 'A quick 15 minute for us to check in, explaining what we accomplished yesterday and what we will work on today. A time to share what may be blocking you in your work, leading to conversations after the meeting to resolve those issues. ',
      link: uuidv4(),
      type: 'Appr'
    }

    let body = {
      id: uuidv4(),
      menteeId: this.state.mentee,
      mentorId: this.state.mentor.id,
      startDate: this.state.planning.start,
      endDate: this.state.planning.end,
      events: [planning, standup1, retro],
      studySessions: [],
      createdAt: Date.now()
    }
    try {
      this.setState({ retro: { start: this.state.start, end: this.state.end} })
      const response = await API.post('pareto', '/sprints', {body})
    } catch(e) {
      console.log('Saving planning ', e)
    }
    this.props.navigation.goBack()
  }

  renderMentees(mentee) {
    let menteeList = mentee.map((mentor, i) => {
      return (
        <Picker.Item
          key={i}
          label={`${mentor.fName} ${mentor.lName}`}
          value={mentor.id}
        />
      )
    })
    return menteeList
  }
  

  render() {
    return (
      <Container>
        <Content>
        <Text
                style={{
                  textAlign: 'left',
                  fontSize: 30,
                  paddingTop: 10,
                  paddingLeft: 14
                }}
              >
                Sprint Scheduling
              </Text>
              <Text style={{
                  textAlign: 'left',
                  fontSize: 14,
                  paddingLeft: 14,

                }}>Sprint Participant</Text>
                <Picker
                  mode="dropdown"
                  header="Mentor"
                  selectedValue={this.state.mentee}
                  onValueChange={this.onMenteeChange}
                  placeholder="Choose Mentee"
                >
                  {this.renderMentees(this.state.apprentices)}
                </Picker>
          {this.state.init === true ? (
            <React.Fragment>
              <View style={{ paddingLeft: 15, paddingTop: 10 }}>
              <TouchableOpacity onPress={this.showStartDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select Start Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                mode="datetime"
              />
              <Text>Start: {this.state.start.toString()}</Text>
            </View>

            <Text>{`\n`}</Text>

            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={this.showEndDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select End Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode="datetime"
              />
              <Text>End: {this.state.end.toString()} </Text>
            </View>
            <Text>{'\n'}</Text>
              <RkButton rkType="xlarge" onPress={this.savePlanning}>Submit</RkButton>
            </React.Fragment>
          ) : (
            <React.Fragment>

              <Text style={{ paddingLeft: 15 }}>Planning Meeting Time: {this.state.planning.start.toString()}</Text>
              <Text style={{ paddingLeft: 15 }}>Planning Meeting End: {this.state.planning.end.toString()}</Text>
            </React.Fragment>
          )}

          {this.state.standup === true ? (
            <React.Fragment>
              <View style={{ paddingLeft: 15, paddingTop: 10 }}>
              <TouchableOpacity onPress={this.showStartDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select Start Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                mode="datetime"
              />
              <Text style={{ paddingLeft: 15 }}>Start: {this.state.start.toString()}</Text>
            </View>

            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={this.showEndDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select End Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode="datetime"
              />
              <Text>End: {this.state.end.toString()} </Text>
            </View>
              {/* <RkButton>Schedule Another Standup</RkButton> */}
              <RkButton rkType="xlarge" onPress={this.saveStandup}>Save Standup Meeting</RkButton>

            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.standup1.start.toString().length > 0 ? (

                <Text style={{ paddingLeft: 15 }}>Standup Time: {this.state.standup1.start.toString()}</Text>
              ) : (
                null
              )}
            </React.Fragment>
          )}

          {this.state.finit === true ? (
            <React.Fragment>
              <View style={{ paddingLeft: 15, paddingTop: 10 }}>
              <TouchableOpacity onPress={this.showStartDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select Start Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                mode="datetime"
              />
              <Text style={{ paddingLeft: 15 }}>Start: {this.state.start.toString()}</Text>
            </View>

            <Text>{`\n`}</Text>

            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={this.showEndDateTimePicker}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Select End Time
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode="datetime"
              />
              <Text style={{ paddingLeft: 15 }}>End: {this.state.end.toString()} </Text>
            </View>
              <RkButton rkType="xlarge" onPress={this.saveRetro}>Schedule Sprint Retrospective</RkButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text></Text>
            </React.Fragment>
          )}
        </Content>
      </Container>
    )
  }
}
