import React, { Component } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { Button, Text } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
const stripe = require('stripe-client')('pk_live_QsSbyLAr5jq8Md6SmYkQGKD0');

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      stripe: {
        values: {
          number: "",
          expiry: "",
          cvc: "",
          postalCode: "",
          name: ""

        }
      },
      complete: false
    }
  }

  async componentDidMount() {
    const amount = this.props.navigation.getParam('amount', 125)
    this.setState({ amount: amount })
  }

  async onPayment(values) {

    console.log('Stripe values being passed in: ', values)
    let exp = values.expiry.split('/')
    let exp_month = exp[0];
    let exp_year = exp[1]
    delete values.expiry;
    delete values.postalCode;
    delete values.type;

    const information = {
      card: {
        ...values,
        exp_month: exp_month,
        exp_year: exp_year
       
      }
    }
    console.log('New Values: ', information)
    const card = await stripe.createToken(information);
    console.log(card)
    const token = card.id;
    // send token to backend for processing

    const obj = {
      token: token,
      amount: this.state.amount * 100
    }

    let response = await fetch("https://rfx4b7d1s9.execute-api.us-west-2.amazonaws.com/prod/charge", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
       

    })

    if (response.ok) {
      this.setState({ complete: true })
      this.props.navigation.navigate('HomeScreen')
    } else {
      this.setState({ complete: 'There was an error processing your payment.'})
    }
    await console.log(response)
  }

  

  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => {
      console.log(JSON.stringify(formData, null, " "));
      this.setState({ stripe: formData })
  }
  _onFocus = (field) => console.log("focusing", field);


  render() {
    return (
      <View style={s.container}>
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          
        
        <Text>{'\n'}</Text>

        { this.state.stripe.values.number.length > 16  && this.state.stripe.values.cvc.length > 2 && this.state.stripe.values.name.length > 8 ? (
        <Button full style={{backgroundColor: "#6200EE", alignSelf: 'center'}} onPress={() => 
          // console.log('Stripe Data: ', this.state.stripe)
          this.onPayment(this.state.stripe.values)
        
        }><Text>Pay ${this.state.amount}</Text></Button>
         ) : ( 
        <Button full style={{backgroundColor: "gray", alignSelf: 'center'}} ><Text>Fill Out Payment Details</Text></Button>
          ) } 

        <Text>{'\n'}</Text>
        <Text style={{alignSelf: 'center'}}>We do not store any information related to your payment method, that is why we have you enter your card details every time.</Text>
        <Text>{'\n'}</Text>
        <Text style={{alignSelf: 'center'}}>Transaction complete? {this.state.complete.toString()}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});