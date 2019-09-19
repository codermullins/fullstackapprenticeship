import React, { Component } from 'react';
import { Notifications } from "expo";
import { API } from "aws-amplify";
import { Container, Content, Form, Item, Input, Label, Button, Header, Picker } from 'native-base';
import uuidv4 from "uuid";
import { Text, View, AsyncStorage } from 'react-native';
import Loader from "../components/Loader";
import CountryPicker from "react-native-country-picker-modal"

export default class CreateProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: "",
            name: "",
            city: "",
            region: "",
            country: "United States",
            tRank: "",
            cRank: "",
            github: "",
            dob: "",
            mbriggs: "",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            expoToken: "iPhone",
            loading: false,
            mentor: "b245324f-39d5-4d27-a1a4-e31358ebdb84",
            cca2: "US",
            mentors: [],
            email: ""

        }
    }

    async componentDidMount() {
        const session = await Auth.currentSession()
        this.setState({ email: session.idToken.payload.email })
        const notificationToken = await Notifications.getExpoPushTokenAsync();
        console.log('Notification Token: ', notificationToken)
        
    }

    async createUser(user) {
        const body = user;
        const response = await API.post('pareto', '/users', {body})
        await console.log('User Creation Response: ', response)
        return response;
    }

    async createApprenticeship(apprenticeship) {
        const body = apprenticeship;
        const response = await API.post('pareto', '/experience', {body})
        await console.log('Apprenticeship creation response: ', response);
    }

    async createProduct(product) {
        const body = product;
        const response = await API.post('pareto', '/experience', {body});
        await console.log('Product creation response: ', response)
    }

    async createGettingStarted(begin) {
        const body = begin;
        const response = await API.post('pareto', '/experience', {body});
        await console.log('Getting Started Creation success: ', response)
    }
     
      createProfile = async () => {
        this.setState({ loading: true })
        const id = await AsyncStorage.getItem('id')
        const productId = uuidv4();
        const apprenticeshipId = uuidv4();
        const masteryId = uuidv4();
        const beginId = uuidv4();
        const update = this.props.navigation.getParam('function', 'none')
        const updateExperience = this.props.navigation.getParam('experience', 'none')

        let achievement = {
            completed: false,
            approved: false,
            github: "Please Add Link to GitHub",
            strengths: [],
            weaknesses: [],
            review: "Please write review here",
            grade: "Grade Here"
        }

        const user = {
            id: id,
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            mentor: this.state.mentor,
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
            beginId: beginId,
            masteryId: masteryId,
            expo: this.state.expoToken,
            createdAt: new Date(),
        }

        const apprenticeship = {
            id: apprenticeshipId,
            xp: 2000,
            xpEarned: 0,
            achievements: 0,
            memberId: id,  
            type: 'Apprenticeship',
            approved: false,
            title: 'Apprenticeship',
            description: 'The process of becoming a developer.',
            _01: achievement,
            _02: achievement,
            _03: achievement,
            _04: achievement,
            _05: achievement,
            _06: achievement,
            _07: achievement,
            _08: achievement,
            _09: achievement,
            _10: achievement,
            _11: achievement,
            _12: achievement,
            _13: achievement,
            _14: achievement,
            _15: achievement,
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
            _01: achievement,
            _02: achievement,
            _03: achievement,
            _04: achievement,
            _05: achievement,
            _06: achievement,
            _07: achievement,
            _08: achievement,
            _09: achievement,
            _10: achievement,
            _11: achievement,
            _12: achievement,
            _13: achievement,
            _14: achievement,
            _15: achievement,
        }

            try {
                const result = await this.createUser(user);
                await this.createApprenticeship(apprenticeship);
                await this.createProduct(product);
                await update(result);
                await updateExperience('Apprenticeship', apprenticeship)
                await updateExperience('Product', product)
                this.setState({ loading: false })
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
            this.props.navigation.navigate('HomeScreen')
        }

        onMentorChange = (value) => {
            this.setState({
                mentor: value
            });
          }

          renderMentors(mentors) {
            let mentorList = mentors.map((mentor, i) => {
                return(
                    <Picker.Item key={i} label={`${mentor.fName} ${mentor.lName}`} value={mentor.id} />
                )
            }
            )
            return mentorList;
        }

        

    render() {
        
        return(
            <Container>
                <Content>
                <Loader loading={this.state.loading} />
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
                        <Text>{'\n'}</Text>

                        <View style={{flexDirection: 'row', paddingLeft: 15}}>
                        <Text>Tap flag to Select Country: </Text>
                        <CountryPicker
                            onChange={(value)=> this.setState({country: value.name, cca2: value.cca2})}
                            cca2={this.state.cca2}
                            translation='eng'
                            />
                        </View>
                        <Text style={{paddingLeft: 15}}>{this.state.country}</Text>
                        {/* <Text>
                        {`\n`}
                        </Text>
                        <Text style={{paddingLeft: 15}}>Your Mentor</Text>
                        <Picker
                            mode="dropdown"
                            header="Mentor"
                            selectedValue={this.state.mentor}
                            onValueChange={this.onMentorChange.bind(this)}
                            placeholder="Select Mentor"
                            >
                            {this.renderMentors(this.state.mentors)}
                        </Picker> */}
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

