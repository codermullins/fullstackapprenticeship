import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, Card, Header, Title, CardItem, Thumbnail, Text, Button, Left, Body, Right } from "native-base";
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API } from "aws-amplify"
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';

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
    }
    this.fetchProduct = this.fetchProduct.bind(this);
    this.fetchApprenticeship = this.fetchApprenticeship.bind(this);
    this.updateExperience = this.updateExperience.bind(this);
  }

  async componentDidMount() {
    const profile = this.props.navigation.getParam('profile', 'Null')
    const instructor = this.props.navigation.getParam('instructor');
    // console.log(profile)
    await this.setState({ profile: profile, instructor: instructor })
    await this.fetchProduct(profile.productId)
    await this.fetchApprenticeship(profile.apprenticeshipId)

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


  render() {
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    return (
      <ScrollView>
        <Container>
          <Content>
            <RkCard>
              <View rkCardHeader={true}>
                <View>
                  <RkText rkType='header'>{this.state.profile.fName} {this.state.profile.lName} - {this.state.profile.technicalRank}</RkText>
                  <Text>{'\n'}</Text>
                  <RkText rkType='subtitle'>Apprenticeship Status: {this.state.apprenticeship.xpEarned.toString()} / 5000 EXP</RkText>
                </View>
              </View>
     
              <View rkCardFooter={true}>
                <RkButton rkType='clear link'>
                  <Icon name="check" style={likeStyle} />
                  <RkText rkType='accent' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                    schema: 'apprenticeExperienceSchema',
                    experience: this.state.apprenticeship,
                    function: this.updateExperience,
                    profile: this.state.instructor
                  })}>
                    {this.state.apprenticeship.achievements.toString()}/15 Achievements
              </RkText>
                </RkButton>
                <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                  schema: 'apprenticeExperienceSchema',
                  experience: this.state.apprenticeship,
                  function: this.updateExperience,
                  profile: this.state.instructor
                })}>
                  <Icon name="send-o" style={iconButton} />
                  <RkText rkType='hint'>View Progress</RkText>
                </RkButton>
              </View>
            </RkCard>

            <RkCard>
              <View rkCardHeader={true}>
                <View>
                  <RkText rkType='subtitle'>Portfolio Product Status: {this.state.product.xpEarned.toString()} / 2000 EXP</RkText>
                </View>
              </View>
              <View rkCardFooter={true}>
                <RkButton rkType='clear link'>
                  <Icon name="check" style={likeStyle} />
                  <RkText rkType='accent' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                    schema: 'productExperienceSchema',
                    experience: this.state.product,
                    function: this.updateExperience,
                    profile: this.state.instructor
                  })}>
                    {this.state.product.achievements.toString()}/15 Achievements
              </RkText>
                </RkButton>
                <RkButton rkType='clear link' onPress={() => this.props.navigation.navigate('ExperienceScreen', {
                  schema: 'productExperienceSchema',
                  experience: this.state.product,
                  function: this.updateExperience,
                  profile: this.state.instructor
                })}>
                  <Icon name="send-o" style={iconButton} />
                  <RkText rkType='hint'>View Progress</RkText>
                </RkButton>
              </View>
            </RkCard>

            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>

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
