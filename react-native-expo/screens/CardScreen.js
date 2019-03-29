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
import { TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Button, Title } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { Ionicons } from "@expo/vector-icons"
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
              <Text></Text>
            </Button>
          </Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>
           <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
            <View rkCardContent={true}>
              <RkText rkType='cardText'>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <RkButton rkType='clear link'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>18 Likes</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>2 Comments</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>6 Shares</RkText>
              </RkButton>
            </View>
          </RkCard> 
      <Text>{'\n'}</Text> 
         <RkCard>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            {/* <Image rkCardImg={true} source={require('../assets/post2.png')} /> */}
            <View rkCardContent={true}>
              <RkText rkType='cardText'>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>18</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>2</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>6</RkText>
              </RkButton>
            </View>
          </RkCard> 
          <Text>{'\n'}</Text> 
          <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>Elena Zhukova</RkText>
                  <RkText rkType='subtitle'>6 minutes ago</RkText>
                </View>
              </View>
              <RkButton rkType='clear'>
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
              </RkButton>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='cardText'>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle} />
                <RkText rkType='accent'>18</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton} />
                <RkText rkType='hint'>2</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>6</RkText>
              </RkButton>
            </View>
          </RkCard>
          <Text>{'\n'}</Text>
          <RkCard rkType='shadowed'>
            <View>
              <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
              <View rkCardImgOverlay={true} />
            </View>
            <RkButton rkType='circle accent-bg' style={styles.floating}>
            </RkButton>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType='header xxlarge'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
                <RkButton rkType='clear action' style={{ marginRight: 16 }}>SHARE</RkButton>
                <RkButton rkType='clear action'>EXPLORE</RkButton>
              </View>
            </View>
          </RkCard>
          <Text>{'\n'}</Text>
          <RkCard rkType='shadowed'>
            <View>
              <Image rkCardImg={true} source={require('../assets/blueprint.jpg')} />
              <View rkCardImgOverlay={true} style={styles.overlay}>
                <RkText rkType='header xxlarge' style={{ color: 'white' }}>Header</RkText>
              </View>
            </View>
            <RkButton rkType='circle accent-bg' style={styles.floating}>
            </RkButton>
            <View rkCardHeader={true} style={{ paddingBottom: 2.5 }}>
              <View>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind texts.
              </RkText>
            </View>
            <View rkCardFooter={true}>
              <View style={styles.footerButtons}>
                <RkButton rkType='clear action' style={{ marginRight: 16 }}>SHARE</RkButton>
                <RkButton rkType='clear action'>EXPLORE</RkButton>
              </View>
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
