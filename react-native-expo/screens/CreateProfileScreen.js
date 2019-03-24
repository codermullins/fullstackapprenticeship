import React, { Component } from 'react';
import { API, Auth } from "aws-amplify";
import { Container, Content, Form, Item, Input, Label, Button, Header } from 'native-base';
import uuidv4 from "uuid";
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';

export default class CreateProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: "",
            name: "",
            city: "",
            region: "",
            country: "",
            tRank: "",
            cRank: "",
            github: "",
            dob: "",
            mbriggs: "",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false

        }
    }

    async componentDidMount() {
        await console.log('Create Profile Mounted')
    }
     
      createProfile = async () => {
        const id = await AsyncStorage.getItem('id')

          const prodId = uuidv4();
          const body = {
            id: id,
            name: this.state.name,
            xp: "0",
            city: this.state.city,
            region: this.state.region,
            country: this.state.country,
            mentor: '1ef9e44b-17d7-4ca5-8fc6-81bcd01bc2e3',
            tRank: "Apprentice",
            github: this.state.github,
            product: prodId,
            createdAt: new Date(),
            }

            const apprentice = {
                apprenticeId: id,
            }

            const product = {
                developerId: id,
                productId: prodId
            }

            try {
                await console.log('Body for create profile: ', body)
                const response = await API.post('profile', '/profile', {body})
                console.log('Lambda Response: ', response)
                // const apprenticeship = await API.post('apprenticeship', '/apprenticeship', {apprentice});
                // console.log('Apprenticeship: ', apprenticeship)
                // const productResponse = await API.post('product', '/product', {product})
                // console.log('Product response: ', productResponse)
            } catch (e) {
                console.log('ERROR: ', e)
            }
            this.setState({
                name: "",
                city: "",
                region: "",
                country: "",
                github: "",
           
            })
            this.props.navigation.navigate('Profile')
        }

        

    render() {
        return(
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                        <Label>Name</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name})}
                            autoCapitalize="none"
                            />
                        </Item> 
                       


                        <Item floatingLabel>
                        <Label>City</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.city}
                            onChangeText={(city) => this.setState({city})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Item floatingLabel>
                        <Label>Region</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.region}
                            onChangeText={(region) => this.setState({region})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Item floatingLabel>
                        <Label>Country</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.country}
                            onChangeText={(country) => this.setState({country})}
                            autoCapitalize="none"
                            />
                        </Item> 


                        <Item floatingLabel>
                        <Label>GitHub Username</Label>
                            <Input 
                            returnKeyType="search"
                            value={this.state.github}
                            onChangeText={(github) => this.setState({github})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Text>{`\n`}</Text>


                        
                <Button full style={{backgroundColor: "#6200EE"}} onPress={this.createProfile}>
                        <Text style={{color: 'white'}}>Create Profile</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}

