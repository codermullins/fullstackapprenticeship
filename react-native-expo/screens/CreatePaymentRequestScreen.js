import React, { Component } from 'react';
import { API } from "aws-amplify";
import DateTimePicker from "react-native-modal-datetime-picker"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import uuidv4 from "uuid";
import { Text, TouchableOpacity, View } from 'react-native';

export default class CreatePaymentRequestScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            start: "",
            end: "",
            type: "",
            quantity: "",
            amount: "",
            payee: 'bdaad57c-2183-468a-a114-493c19327762',
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false

        }
    }
     
      handlePress = async () => {
          
          const body = {
              id: uuidv4(),
              payee: this.state.payee,
              payer: this.state.payer,
              title: this.state.name,
              description: this.state.description,
              amount: this.state.amount,
              type: this.state.type,
              quantity: this.state.quantity,
              createdAt: Date.now()
            }
            try {
                const response = await API.post('payments', '/payments', {body})
                console.log('Lambda Response: ', response)
            } catch (e) {
                console.log('ERROR: ', e)
            }
            this.setState({
                name: "",
                description: "",
                chosenDate: new Date(),
                start: "",
                end: "",
                id: ""
            })
            this.props.navigation.navigate('Home')
        }

  

       

    render() {
        return(
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                        <Label>Charge Title</Label>
                            <Input 
                            placeholder=""
                            returnKeyType="search"
                            value={this.state.title}
                            onChangeText={(title) => this.setState({title})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Item floatingLabel>
                        <Label>Description</Label>
                            <Input 
                            placeholder=""
                            returnKeyType="search"
                            value={this.state.description}
                            onChangeText={(description) => this.setState({description})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Text>{`\n`}</Text>


                        <Item floatingLabel>
                        <Label>Charge Amount</Label>
                            <Input 
                            placeholder=""
                            returnKeyType="search"
                            value={this.state.amount}
                            onChangeText={(amount) => this.setState({amount})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Text>{`\n`}</Text>

                        <Item floatingLabel>
                        <Label>Charge Type (Hourly, Weekly, Monthly)</Label>
                            <Input 
                            placeholder=""
                            returnKeyType="search"
                            value={this.state.type}
                            onChangeText={(type) => this.setState({type})}
                            autoCapitalize="none"
                            />
                        </Item> 

                        <Item floatingLabel>
                        <Label>Charge Quantity</Label>
                            <Input 
                            placeholder="Hourly Tutoring"
                            returnKeyType="search"
                            value={this.state.quantity}
                            onChangeText={(quantity) => this.setState({quantity})}
                            autoCapitalize="none"
                            />
                        </Item> 
                        <Button full style={{backgroundColor: "#6200EE"}} onPress={this.handlePress}>
                            <Text style={{color: 'white'}}>Create Event</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

