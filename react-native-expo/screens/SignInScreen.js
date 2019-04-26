import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import { Auth } from "aws-amplify";
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    }
  }
  signIn = async () => {
    await Auth.signIn(this.state.username, this.state.password);
    await AsyncStorage.setItem('userToken', 'fsa');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
              placeholder=""
              returnKeyType="search"
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} 
              autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              secureTextEntry
              value={this.state.password}
              onChangeText={(password) => this.setState({ password})}
              autoCapitalize="none"
              secureTextEntry={true}
              />
            </Item>
            <Text>{'\n'}</Text>
            {
              this.state.username.length > 0 && this.state.password.length > 0 ?
              (
                <Button full style={{backgroundColor: "#6200EE"}} onPress={() => this.signIn()}><Text style={{color: "white"}}>Sign In</Text></Button>
              ) : (
                <Button full disabled><Text style={{color: "white"}}>Sign In</Text></Button>

              )
            }
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignInScreen;
