import React, { Component } from 'react';
import { Notifications } from "expo";
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
            endDateTimePickerVisible: false,
            expoToken: ""

        }
    }

    async componentDidMount() {
        const notificationToken = await Notifications.getExpoPushTokenAsync();
        console.log('Notification Token: ', notificationToken)
        this.setState({ expoToken: notificationToken})
    }

    async createUser(user) {
        const body = user;
        const response = await API.post('fsa', '/users', {body})
        await console.log('User Creation Response: ', response)
    }

    async createApprenticeship(apprenticeship) {
        const body = apprenticeship;
        await console.log(JSON.stringify(body))
        const response = await API.post('fsa', '/experience', {body})
        await console.log('Apprenticeship creation response: ', response);
    }

    async createProduct(product) {
        const body = product;
        const response = await API.post('fsa', '/experience', {body});
        await console.log('Product creation response: ', response)
    }
     
      createProfile = async () => {
        const id = await AsyncStorage.getItem('id')
        const productId = uuidv4();
        const apprenticeshipId = uuidv4();
        const masteryId = uuidv4();

        const user = {
            id: id,
            fName: this.state.fName,
            lName: this.state.lName,
            mentor: 'bdaad57c-2183-468a-a114-493c19327762',
            xp: 0,
            city: this.state.city,
            country: this.state.country,
            communityRank: 'Outsider',
            technicalRank: "Apprentice",
            experience: "Incomplete",
            linkedIn: "Incomplete",
            instructor: "Incomplete",
            stripe: "Incomplete",
            paypal: "Incomplete",
            github: this.state.github,
            instructor: false,
            productId: productId,
            apprenticeshipId: apprenticeshipId,
            masteryId: masteryId,
            expo: this.state.expoToken,
            createdAt: new Date(),
        }

        const apprenticeship = {
            id: apprenticeshipId,
            xp: 3000,
            xpEarned: 0,
            achievements: 0,
            memberId: id,  
            type: 'Apprenticeship',
            approved: false,
            title: 'Apprenticeship',
            description: 'The process of becoming a developer.',
            _1: false,
            _1_approved: false,
            _2: false,
            _2_approved: false,
            _3: false,
            _3_approved: false,
            _4: false,
            _4_approved: false,
            _5: false,
            _5_approved: false,
            _6: false,
            _6_approved: false,
            _7: false,
            _7_approved: false,
            _8: false,
            _8_approved: false,
            _9: false,
            _9_approved: false,
            _10: false,
            _10_approved: false,
            _11: false,
            _11_approved: false,
            _12: false,
            _12_approved: false,
            _13: false,
            _13_approved: false,
            _14: false,
            _14_approved: false,
            _15: false,
            _15_approved: false,
        }

        const product = {
            id: productId,
            xp: 2000,
            xpEarned: 0,
            achievements: 0,
            memberId: id,  
            type: 'Product',
            approved: false,
            title: 'Please give your product a name',
            description: "Please write a description of your project.",
            github: "Incomplete",
            _1: false,
            _1_approved: false,
            _2: false,
            _2_approved: false,
            _3: false,
            _3_approved: false,
            _4: false,
            _4_approved: false,
            _5: false,
            _5_approved: false,
            _6: false,
            _6_approved: false,
            _7: false,
            _7_approved: false,
            _8: false,
            _8_approved: false,
            _9: false,
            _9_approved: false,
            _10: false,
            _10_approved: false,
            _11: false,
            _11_approved: false,
            _12: false,
            _12_approved: false,
            _13: false,
            _13_approved: false,
            _14: false,
            _14_approved: false,
            _15: false,
            _15_approved: false,
        }

            try {
                await this.createUser(user);
                await this.createApprenticeship(apprenticeship);
                await this.createProduct(product);

            } catch (e) {
                console.log('ERROR: ', e)
            }
            this.setState({
                name: "",
                city: "",
                // region: "",
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

