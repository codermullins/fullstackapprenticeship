import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Text } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { API } from "aws-amplify"
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';
import { TouchableOpacity } from 'react-native-gesture-handler';

class StudentProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      instructor: {},
      xp: null,
      avatar: 'none',
      url: null,
      product: { xpEarned: '?', achievements: '?' },
      apprenticeship: { xpEarned: '?', achievements: '?' },
      origin: 'Instructor',
      mentorship: {tasks: []}
    }
    this.fetchProduct = this.fetchProduct.bind(this);
    this.fetchApprenticeship = this.fetchApprenticeship.bind(this);
    this.updateExperience = this.updateExperience.bind(this);
  }

  async componentDidMount() {
    const profile = this.props.navigation.getParam('profile', 'Null')
    const instructor = this.props.navigation.getParam('instructor');
    const origin = this.props.navigation.getParam('origin', 'none')
    await this.setState({ profile: profile, instructor: instructor, origin: origin, mentorshipId: `${instructor.id}_${profile.id}` })
    await this.fetchProduct(profile.productId)
    await this.fetchApprenticeship(profile.apprenticeshipId)
    await this.fetchMentorship(profile.id)

  }

  updateEvents = (newMentorship) => {
    this.setState({ mentorship: newMentorship})
  }

  async fetchMentorship(id) {
    const relationship = await API.get('pareto', `/relationship/mentee/${id}`)
    // console.log('Relationship: ', relationship)
    this.setState({ mentorship: relationship[0]})
  }

  async fetchProduct(id) {
    const product = await API.get('pareto', `/experience/${id}`)
    // console.log('Product: ', product)
    await this.setState({ product: product[0] })
  }

  async fetchApprenticeship(id) {
    const apprenticeship = await API.get('pareto', `/experience/${id}`)
    // console.log('Apprenticeship: ', apprenticeship)
    await this.setState({ apprenticeship: apprenticeship[0] })
  }

  updateExperience(name, obj) {
    if (name === 'Product') {
      this.setState({ product: obj })
    } else {
      this.setState({ apprenticeship: obj })
    }
  }

  renderTasks(mentorship) {
    return mentorship.tasks.map((task, i) => {
      return (
        <View key={i}>
          <RkCard rkType="shadowed">
                  <RkCard>
                    <View rkCardHeader={true}>
                      <RkText rkType="header">
                        {task.title}
                      </RkText>
                      {/* <RkText>Edit</RkText> */}
              
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


  render() {
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    return (
      <ScrollView>
        <Container>
          <Content>
            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                  <Text style={{fontSize: 30, paddingTop: 10, paddingLeft: 14}}>
               {this.state.profile.fName} {this.state.profile.lName}
              </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskScreen', {
                mentorshipId: this.state.mentorshipId,
                tasks: this.state.mentorship.tasks,
                updateEvents: this.updateEvents
              })}>
                
              <Text style={{fontSize: 24, paddingTop: 10, paddingRight: 14}} >+ Add Task</Text>
              </TouchableOpacity>
            </View>
              <Text>{'\n'}</Text>
              <RkCard>
              <View rkCardHeader={true}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                  schema: 'apprenticeExperienceSchema',
                  experience: this.state.apprenticeship,
                  function: this.updateExperience,
                  profile: this.state.instructor,
                  origin: this.state.origin
                })}>
                <View style={{ flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
        
                    color:'#fff',
                    // backgroundColor:'gray',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'blue',
                    padding: 6
                    }}>
                  <RkText style={{fontSize: 24}}>Apprenticeship </RkText>
                  <RkText>{this.state.apprenticeship.xpEarned.toString()} / 5000 EXP</RkText>
                  <RkButton rkType='clear link'>
                  <Icon name="check" style={likeStyle} />
                  <RkText rkType='accent'>
                    {this.state.apprenticeship.achievements.toString()}/15 Achievements
              </RkText>
                </RkButton>
                <RkButton rkType='clear link' >
                  {/* <Icon name="send-o" style={iconButton} /> */}
                  <RkText rkType='hint'>View Progress</RkText>
                </RkButton>
                </View>
              </TouchableOpacity >



              <TouchableOpacity onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                    schema: 'productExperienceSchema',
                    experience: this.state.product,
                    function: this.updateExperience,
                    profile: this.state.instructor,
                    origin: this.state.origin
                  })}>

                <View>
                <View style={{ flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color:'#fff',
                    // backgroundColor:'gray',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'blue',
                    padding: 6}}>
                  <RkText style={{fontSize: 24}}>Portfolio</RkText>
                  <RkText>{this.state.product.xpEarned.toString()} / 2000 EXP</RkText>
                  <RkButton rkType='clear link'>
                  <Icon name="check" style={likeStyle} />
                  <RkText rkType='accent' >
                    {this.state.product.achievements.toString()}/15 Achievements
              </RkText>
                </RkButton>
                <RkButton rkType='clear link' >
                  {/* <Icon name="send-o" style={iconButton} /> */}
                  <RkText rkType='hint'>View Progress</RkText>
                </RkButton>
                </View>
                </View>
              </TouchableOpacity>
              </View>     
            </RkCard>
              {this.renderTasks(this.state.mentorship)}

          
          </Content>
        </Container>
      </ScrollView>
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

export default StudentProfileScreen;
