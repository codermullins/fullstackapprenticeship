import React, {Component} from 'react';
import {WebView, StyleSheet, Button} from 'react-native';

class PaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            showWebView: null,
            amount: ""
        }
    }

    async componentDidMount() {
      const amount = this.props.navigation.getParam('amount', 'None')
      this.setState({
        amount: amount
      })
    }

    render() {

        return (
          <WebView
          source={{uri: `https://hub.fsa.community/payments/${this.state.amount}`}}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={{ flex: 1 }}
        />
        )
      }
      
      onPaymentSuccess = (token) => {
        // send the stripe token to your backend!
      }
      
      onClose = () => {
        // maybe navigate to other screen here?
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PaymentScreen;