import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, Platform } from 'react-native';
import { Thumbnail } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import PropTypes from 'prop-types';
import emojiUtils from 'emoji-utils';
import SlackMessage from '../components/SlackMessage';

import fsa from '../assets/fsa.jpeg';

class ChatScreen extends Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderMessage(props) {
    //console.log(props)
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: "John Smith",
          avatar: 'https://avatars3.githubusercontent.com/u/15205259?s=400&u=64ad9374b8d98f09dc5709fcc737e5ec4f2447f3&v=4',
        }}
        renderMessage={this.renderMessage}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
