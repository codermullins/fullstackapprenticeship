import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import { Auth } from "aws-amplify";
import { Container, Header, Content, Form, Item, Input, Label, Button, DatePicker } from 'native-base';


class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      confirm: false,
      code: "",
      user: {},
      fName: "",
      lName: "",
      chosenDate: []
    }
  }

  register = async () => {
    const attributes = {
      birthdate: "01/28/1994",
      name: this.state.fName,
      email: this.state.email, 
      family_name: this.state.lName,
    }

    const user = await Auth.signUp({
      password: this.state.password,
      username: this.state.email,
      attributes: attributes,
    });

    // console.log('USER OBJECT: ', JSON.stringify(user))
    // console.log('Username: ', user.username)

    await AsyncStorage.setItem('userToken', 'fsa');
    
    this.setState({ confirm: true, user: user })
  };

  confirm = async () => {
    await Auth.confirmSignUp(this.state.email, this.state.code);

    await AsyncStorage.setItem('userToken', 'fsa');

    this.props.navigation.navigate('App');
  };

  renderConfirmation() {
    return(
      <Container>
         <Content>
          <Form>
            <Item floatingLabel>
              <Label>code</Label>
              <Input
              placeholder="Type Here"
              returnKeyType="search"
              value={this.state.code}
              onChangeText={(code) => this.setState({ code })} 
              autoCapitalize="none"
              />
            </Item>
            <Text>{'\n'}</Text>
            <Text style={{textAlign: 'center', fontSize: 14}}>Please check your email for a 6 digit confirmation code.</Text>
            <Text>{'\n'}</Text>
        <Button block style={{backgroundColor: "#6200EE", color: "white"}} onPress={() => this.confirm()}><Text style={{color: "white"}}>Complete Registration</Text></Button>
          </Form>
        </Content>
      </Container>
    )
  }

  renderRegister() {
    return(
    <Container>
    <Content>
          <Form>
          <Item floatingLabel>
              <Label>First Name</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.fName}
              onChangeText={(fName) => this.setState({fName})}
              autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.lName}
              onChangeText={(lName) => this.setState({lName})}
              autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Primary Email</Label>
              <Input
              placeholder=""
              returnKeyType="search"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })} 
              autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password})}
              autoCapitalize="none"
              />
            </Item>
            <Text>{'\n'}</Text>
            <Text style={{textAlign: 'center', fontSize: 14}}>Password must include at least 1 capital, 1 lowercase letter, 1 number and 1 special character.</Text>
            <Text>{'\n'}</Text>
{
  this.state.email.length > 0 && this.state.password.length > 0 && this.state.fName.length > 0 && this.state.lName.length > 0 ?
  (
    <Button full style={{backgroundColor: "#6200EE", color: "white", height: 80}} onPress={() => this.register()}><Text style={{color: "white", fontSize: 20}}>Sign Up</Text></Button>
    ) : (
    <Button full disabled><Text style={{color: "white"}}>Sign Up</Text></Button>

  )
}
          </Form>
        </Content>
    </Container>
    )
  }

  render() {
    return (
      <Container>
        {this.state.confirm === false ?
        this.renderRegister() : this.renderConfirmation()  
      }
      </Container> 
    );
  }
}

export default SignUpScreen;
