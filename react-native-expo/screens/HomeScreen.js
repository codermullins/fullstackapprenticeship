import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text
} from 'react-native';
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';
import Event from "../components/Event"
import { TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Button, Title } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { Ionicons } from "@expo/vector-icons"
// import { ImageIcon } from '../components/ImageIcon';
import orderBy from "lodash.orderby";
import { API } from "aws-amplify"


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
    try {
      // const user = await Auth.currentUserInfo()
      // const id = user.attributes.sub;
      const response = await API.get('eventscrud', `/events/f6060e36-38ad-452a-a1f8-3bedbddca28d`)
      // console.log('List of events: ', response)
      const orderedArray = orderBy(response, function(item) {return item.date})
      this.setState({ events: orderedArray })
    } catch(e) {
      console.log(e)
    }
  }

  renderEvents = (events) => {
    return(
      <View>
      {events.map((event, i) => (
          <Event
                key={i} 
                name={event.name}
                description={event.description}
                date={event.date}
                start={event.start}
                end={event.end}
                // avatar={require('../assets/Apprentice.png')}
                />
        ))}
        </View>
      )
    }

  render() {
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="md-menu" size={32} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>FSA Feed</Title>
          </Body>
          <Right>
            <Button hasText transparent>
              <Text>Hello World</Text>
            </Button>
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
              <RkButton rkType='clear'>
              <Icon name="group" style={iconButton} />
              {/* <Text>{'\n'}</Text>
              <Text>Switch Instructor</Text> */}

                {/* <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" /> */}

              </RkButton>
            </View>            
          </RkCard>
          <Text>{'\n'}</Text>
          <RkCard rkType='heroImage shadowed'>
            <View>
              <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <View style={{ marginBottom: 20 }}>
                  <RkText rkType='header xxlarge' style={{ color: 'white' }}>The FSA Blueprint</RkText>
                  <RkText rkType='subtitle' style={{ color: 'white' }}>60 page manual covering the tools of our Technical Standard, finding freelance work, building the right portfolio projects and adding structure to the learning process.</RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton rkType='clear' style={{ marginRight: 16 }} onPress={() => {navigation.navigate('BlueprintScreen')}}>READ NOW</RkButton>
                  {/* <RkButton rkType='clear ' >EXPLORE</RkButton> */}
                </View>
              </View>
            </View>
          </RkCard> 

          <Text>{'\n'}</Text>
          <RkCard>
          <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Payment Request</RkText>
                {/* <RkText rkType='subtitle'>{moment(this.props.date).format('MMMM Do YYYY, h:mm:ss a').split(",")[0]} | {this.props.start} - {this.props.end}</RkText> */}
                <RkText rkType='subtitle'>from Michael Litchev</RkText>
              </View>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="dollar" style={likeStyle} />
                <RkText rkType='accent'>120.00</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="clock-o" style={iconButton} />
                <RkText rkType='hint'>3 Hours</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => navigation.navigate('PaymentScreen')}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>Pay Here</RkText>
              </RkButton>
            </View>
          </RkCard>
          <Text>{'\n'}</Text>

          {this.renderEvents(this.state.events)}
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
