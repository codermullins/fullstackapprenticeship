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
const blueprint = require('../assets/blueprint.jpg');
const aws = require('../assets/aws.png')
const ci = require('../assets/ci.png')
const cognito = require('../assets/cognito.png')
const freelance = require('../assets/freelance.jpg')
const github = require('../assets/github.png')
const hw = require('../assets/hw.png')
const logic = require('../assets/logic.jpg')
const meetup = require('../assets/meetup.png')
const mvp = require('../assets/mvp.jpg')
const nodeschool = require('../assets/nodeschool.png')
const onboarding = require('../assets/onboarding.jpg')
const pr = require('../assets/pr.png')
const react = require('../assets/react.png')
const seo = require('../assets/seo.png')
const stages = require('../assets/stages.png')
const state = require('../assets/state.png')
const swagger = require('../assets/swagger.png')
const testing = require('../assets/testing.png')
const ui = require('../assets/ui.png')
const ux = require('../assets/ux.jpeg')
const xss = require('../assets/xss.png')
const stack1 = require('../assets/stack1.png')

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
      origin: 'Apprentice',
      image: ""
    }
  }

  selectImage(id) {
    switch(id) {
      case "Serverless-Stack Part 1":
        return stack1; 
      case "Read 'The Blueprint'":
        return blueprint;
      case "Serverless-Stack Part 2":
        return stack1;
      case "NodeSchool Module 2":
        return nodeschool;
      case "NodeSchool Module 1":
        return nodeschool;
      case "My First Freelance Gig!":
        return freelance;
      case "Create GitHub Account":
        return github;
      case "Full-Stack JumpStart":
        return blueprint;
      case "Create AWS Account & Configure CLI":
        return aws;
      case "Set-Up Development Environment":
        return github;
      case "My First Meetup!":
        return meetup;
      case "My First Sprint!":
        return react;
      case "My First Pull-Request!":
        return pr;
      case "Hello World!":
        return hw;
      case "Static UI Components (Completion Check-In)":
        return ui;
      case "Onboarding Documentation":
        return onboarding;
      case "Top 20% Test Coverage":
        return testing;
      case "Implement Navigation":
        return react;
      case "Login / Registration":
        return cognito;
      case "Swagger Document":
        return swagger;
      case "State Management Implementation":
        return state;
      case "Business Logic":
        return logic;
      case "Test & Production Deployments":
        return stages;
      case "Continuous Integration":
        return ci;
      case "Security Audit":
        return xss;
      case "Architecture Diagram":
        return react;
      case "SEO Audit - SSR Implementation":
        return seo;
      case "MVP Launch":
        return mvp;
      case "UX Re-Implementation/Audit":
        return ux;
      default:
        return blueprint;
    
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
    let img = this.selectImage(schema.list.title)
    return (
      <ScrollView>
        {/* <TouchableOpacity
          delayPressIn={70}
          activeOpacity={0.8}> */}
          <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={img} />
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


        {/* </TouchableOpacity> */}
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
    marginVertical: 0,
  },
  userInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
