import React, { Component } from 'react';
import { API } from "aws-amplify";
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import uuidv4 from "uuid";
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';

export default class EditProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
 
            fName: `${this.props.navigation.state.params.profile.fName}`,
            lName: `${this.props.navigation.state.params.profile.lName}`,
            city: `${this.props.navigation.state.params.profile.city}`,
            // region: `${this.props.navigation.state.params.profile.region}`,
            country: `${this.props.navigation.state.params.profile.country}`,
            expo: `${this.props.navigation.state.params.profile.expo}`,
            // tRank: props.navigation.state.params.tRank,
            cRank: "",
            github: `${this.props.navigation.state.params.profile.github}`,
            dob: "",
            mbriggs: "",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            xp: `${this.props.navigation.state.params.profile.xp}`,

        }
    }
     
        editProfile = async () => {
            const id = await AsyncStorage.getItem('id')
            await console.log('Id: ', id)
            const body = {
                // id: id,
                // mentor: 'f6060e36-38ad-452a-a1f8-3bedbddca28d',
                fName: this.state.fName,
                lName: this.state.lName,
                city: this.state.city,
                country: this.state.country,
                tRank: "Developer",
                github: this.state.github,
                expo: this.state.expo
                }
              try {
                  const response = await API.put('fsa', `/users/${id}`, {body})
                  console.log('Lambda Response: ', response)
              } catch (e) {
                  console.log('ERROR: ', e)
              }
              this.setState({
                  attribute: "",
                  
             
              })
              this.props.navigation.navigate('Profile')
          }

    render() {
        return(
            <Container>
                <Content>
                    <Form>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.fName}
                            onChangeText={(fName) => this.setState({fName})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Item floatingLabel>
                        
                        <Label>Last Name</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.lName}
                            onChangeText={(lName) => this.setState({lName})}
                            autoCapitalize="none"
                                />
                        </Item>                  
                        <Text>{`\n`}</Text>
                        <Item stackedLabel>
                        <Label>City</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.city}
                            onChangeText={(city) => this.setState({city})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        {/* <Text>{`\n`}</Text> */}
                        {/* <Item stackedLabel>
                        <Label>Region</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.region}
                            onChangeText={(region) => this.setState({region})}
                            autoCapitalize="none"
                            />
                        </Item>  */}
                        <Text>{`\n`}</Text>
                        <Item stackedLabel>
                        <Label>Country</Label>
                            <Input 
                            placeholder={this.state.country}
                            returnKeyType="search"
                            value={this.state.country}
                            onChangeText={(country) => this.setState({country})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Text>{`\n`}</Text>
                        <Item stackedLabel>
                        <Label>GitHub Username</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.github}
                            onChangeText={(github) => this.setState({github})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Text>{`\n`}</Text>

                        <Button full style={{backgroundColor: "#6200EE"}} onPress={this.editProfile}>
                        <Text style={{color: 'white'}}>Edit Name</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

