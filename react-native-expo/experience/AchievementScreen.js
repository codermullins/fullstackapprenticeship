import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText, RkButton
} from 'react-native-ui-kitten';
import { Button, Text, Item, Input, Label, Form } from "native-base";
import { API } from "aws-amplify";
const BlockContent = require('@sanity/block-content-to-react')

export default class AchievementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: "",
      review: "",
      grade: "",
      strengths: [],
      weaknesses: [],
      completed: 'boolean',
      approved: 'boolean',
      origin: 'Apprentice'
    }
  }

  componentWillMount() {
    const origin = this.props.navigation.getParam('origin', 'none');
    this.setState({ origin: origin })
  }

  handlePressStudent = async (achievement) => {
    const schema = this.props.navigation.getParam('schema', 'None')
    const update = this.props.navigation.getParam('function', 'none')
    const origin = this.props.navigation.getParam('origin', 'none');

    let key = schema.list.priority;
    let id = schema.experience.id;

    const body = {
      [key]: {
        completed: true,
        approved: false,
        github: this.state.github,
      },
      xpEarned: schema.experience.xpEarned + parseInt(schema.list.amount, 10),
      achievements: schema.experience.achievements + 1
    }
    try {
      console.log('Request body: ', body)
      const result = await API.put('pareto', `/experience/${id}`, { body })
      console.log(result)
      await update(schema.experience.type, result)

    } catch (e) {
      console.log('ERROR: ', e)
    }
    if (origin === 'Instructor') {
      this.props.navigation.navigate('InstructorScreen')
    } else {
      this.props.navigation.navigate('HomeScreen')
    }
  }

  handlePressInstructor = async (achievement) => {
    const schema = this.props.navigation.getParam('schema', 'None')
    const update = this.props.navigation.getParam('function', 'none')
    const origin = this.props.navigation.getParam('origin', 'none')

    let key = schema.list.priority;
    let id = schema.experience.id;
    let currentState = schema.complete

    const body = {
      [key]: {
        completed: true,
        approved: true,
        review: this.state.review,
        grade: this.state.grade,
        github: schema.complete.github,
        strengths: [],
        weaknesses: []
      },
      // xpEarned: schema.experience.xpEarned + parseInt(schema.list.amount, 10),
      // achievements: schema.experience.achievements + 1
    }
    try {
      console.log('Request body: ', body)
      const result = await API.put('pareto', `/experience/${id}`, { body })
      console.log(result)
      await update(schema.experience.type, result)

    } catch (e) {
      console.log('ERROR: ', e)
    }
    if (origin === 'Instructor') {
      this.props.navigation.navigate('InstructorScreen')
    } else {
      this.props.navigation.navigate('HomeScreen')
    }
  }

  render() {
    const schema = this.props.navigation.getParam('schema', 'None')
    const profile = this.props.navigation.getParam('profile', 'none');
    const overview = schema.list.overview;
    const complete = schema.complete;
    console.log(complete)
    return (
      <ScrollView>
        <TouchableOpacity
          delayPressIn={70}
          activeOpacity={0.8}>
          <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={require('../assets/blueprint.jpg')} />
            <View rkCardHeader style={styles.content}>
              <RkText style={{ fontSize: 24 }} rkType='header4'>{schema.list.title}</RkText>
              <RkText style={{ fontSize: 18 }} rkType='header4'>{schema.list.amount} EXP</RkText>

            </View>
            <View rkCardContent>
              <View>
                <BlockContent blocks={overview} />
                <RkText>{'\n'}</RkText>
              </View>
            </View>
          </RkCard>

          {/* We need to have alternative views depending on whether their instructor value is false or not */}

          {this.state.origin === 'Apprentice' ? (
            <React.Fragment>
              {complete.completed === false ? (
                <React.Fragment>
                  <Form>

                    <Item floatingLabel>
                      <Label>Enter GitHub Pull-Request</Label>
                      <Input
                        // placeholder="Name"
                        returnKeyType="search"
                        value={this.state.github}
                        onChangeText={(github) => this.setState({ github })}
                        autoCapitalize="none"
                      />
                    </Item>
                  </Form>
                  <Text>{`\n`}</Text>
                  <Button full style={{ backgroundColor: "#6200EE" }} onPress={this.handlePressStudent}>
                    <Text>Mark Complete</Text></Button>
                </React.Fragment>

              ) : (
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <Text>Instructor Review: {complete.review}</Text>
                    <Text>Instructor Grade: {complete.grade}</Text>
                    <Text>{`\n`}</Text>
                    <Button full onPress={() => this.props.navigation.navigate('GithubView', {
                      url: complete.github
                    })}><Text>View Pull Request</Text></Button>
                    <Text>{`\n`}</Text>

                    <Button full disabled style={{ backgroundColor: "gray" }}><Text>Achievement Unlocked</Text></Button>
                  </View>
                )
              }
            </React.Fragment>
          ) : (
              <React.Fragment>
                {complete.completed === true ? (
                  <React.Fragment>
                <Text style={{paddingLeft: 15, paddingRight: 15}}>Instructor Grading</Text>
                {complete.approved !== true ? (
                  <React.Fragment>
                    <Form>
                  <Item floatingLabel>
                    <Label>Review Work</Label>
                    <Input
                      // placeholder="Name"
                      returnKeyType="search"
                      value={this.state.review}
                      onChangeText={(review) => this.setState({ review })}
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>Grade Score</Label>
                    <Input
                      // placeholder="Name"
                      returnKeyType="search"
                      value={this.state.grade}
                      onChangeText={(grade) => this.setState({ grade })}
                      autoCapitalize="none"
                    />
                  </Item>
                </Form>
                <Text>{`\n`}</Text>

                <Button full onPress={() => this.props.navigation.navigate('GithubView', {
                        url: complete.github
                      })}><Text>View Pull Request</Text></Button>
                  <Text>{`\n`}</Text>

                <Button full style={{ backgroundColor: "#6200EE" }} onPress={this.handlePressInstructor}>
                  <Text>Mark Complete</Text></Button>
                  </React.Fragment>
                ) : (
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                      <Text>Instructor Review: {complete.review}</Text>
                      <Text>Instructor Grade: {complete.grade}</Text>
                      <Text>{`\n`}</Text>
                      <Button full onPress={() => this.props.navigation.navigate('GithubView', {
                        url: complete.github
                      })}><Text>View Pull Request</Text></Button>
                      <Text>{`\n`}</Text>
                  </View>
                )}
                
              </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text style={{paddingLeft: 15, paddingRight: 15}}>Achievement has not yet been submitted for review.</Text>
                </React.Fragment>
              )}
  </React.Fragment>
            )}


          <Text>{'\n'}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}

const styles = RkStyleSheet.create(theme => ({
  // container: {
  //   backgroundColor: theme.colors.screen.scroll,
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,
  // },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
