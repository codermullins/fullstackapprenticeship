import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Container, Header, List, ListItem, Separator, Content, Left, Right, Thumbnail, Body, Button } from "native-base";


class MessagesListScreen extends Component {
    render() {
        const list = [
            {
              name: 'Amy Farha',
              last_message: 'Welcome to FSA!',
              timestamp: '12/12/18'
            },
            {
              name: 'Chris Jackson',
              last_message: 'Welcome to FSA!',
              timestamp: '12/12/18'
            },
          ]

        return (
            <View>
                <List>
                    <FlatList 
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => ( 
                            <ListItem avatar  onPress={() => this.props.navigation.push('Chat', { test: 'test'}) }>
                                <Left>
                                    <Thumbnail source={ require('../assets/fsa.jpeg') }  />
                                </Left>
                                <Body>
                                    <Text style={{ fontSize: 18 }}>{ item.name }</Text>
                                    <Text>{ item.last_message }</Text>
                                    <Text style={{ paddingTop: 10 }}>{ item.timestamp }</Text>
                                </Body>
                            </ListItem>
                        )} 
                    / > 
                </List>
            </View>
        )
    }
}

export default MessagesListScreen;