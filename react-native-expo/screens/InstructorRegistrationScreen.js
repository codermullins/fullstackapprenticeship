import React, { Component } from 'react';
import { API } from "aws-amplify";
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import Loader from "../components/Loader";
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';

export default class InstructorRegistrationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
 
            code: "",
            mbriggs: "",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            loading: false

        }
    }
     
        editProfile = async () => {
            const updateProfile = this.props.navigation.getParam('function', 'none')
            console.log(updateProfile)
            const id = await AsyncStorage.getItem('id')
            const body = {
                instructor: true
                }
              try {
                  const profile = await API.put('fsa', `/users/${id}`, {body})
                  console.log(profile)
                  await updateProfile(profile)
                //   console.log(update)

              } catch (e) {
                  console.log('ERROR: ', e)
              }
              
              this.props.navigation.goBack()
          }

    render() {
        return(
            <Container>
                <Content>

                    <Form>
                    <Item floatingLabel>
                        <Label>Instructor Access Code</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.code}
                            onChangeText={(code) => this.setState({code})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Text>{`\n`}</Text>
                        {this.state.code !== 'learntobuild' ? (

                        <Button full disabled style={{backgroundColor: "gray"}}>
                            <Text style={{color: 'white'}}>Please Enter Code</Text>
                        </Button>
                            
                        ) : 
                            ( <Button full style={{backgroundColor: "#6200EE"}} onPress={this.editProfile}>
                            <Text style={{color: 'white'}}>Ready to Submit</Text>
                            </Button> )
                        }
                        
                    </Form>
                </Content>
            </Container>
        )
    }
}

