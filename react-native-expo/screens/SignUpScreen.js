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
      phone: "+1",
      confirmPassword: "",
      confirm: false,
      code: "",
      user: {},
      fName: "",
      lName: "",
      chosenDate: [],
      username: ""
    }
  }

  register = async () => {
    const attributes = {
      // birthdate: "01/28/1994",
      // name: this.state.fName,
      email: this.state.email, 
      phone_number: this.state.phone
      // family_name: this.state.lName,
    }

    try {
      const user = await Auth.signUp({
        password: this.state.password,
        username: this.state.email,
        attributes: attributes,
      });

      await console.log('Auth: ', user)
  
      // console.log('USER OBJECT: ', JSON.stringify(user))
      // console.log('Username: ', user.username)
  
      // await AsyncStorage.setItem('userToken', 'fsa');
      
      this.setState({ confirm: true })
    } catch(e) {
      console.log('Auth error: ', e)
    }

    
  };

  confirm = async () => {
    try {

      await Auth.confirmSignUp(this.state.email, this.state.code); 
      this.props.navigation.navigate('SignIn');
    } catch(e) {
      console.log('SignUp error: ', e)
    }
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
          {/* <Item floatingLabel>
              <Label>Sign-In Username</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
              autoCapitalize="none"
              />
            </Item> */}
            {/* 
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.lName}
              onChangeText={(lName) => this.setState({lName})}
              autoCapitalize="none"
              />
            </Item> */}
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
            <Item floatingLabel>
              <Label>Phone</Label>
              <Input 
              placeholder=""
              returnKeyType="search"
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
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
  this.state.email.length > 0 && this.state.password.length > 7 ?
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
