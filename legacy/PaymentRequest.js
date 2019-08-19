import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import {
  RkButton,
  RkText,
  RkCard,
} from 'react-native-ui-kitten';
import { Ionicons } from "@expo/vector-icons"


export default class PaymentRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: "",
      end: ""
    }

  }
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    return (
        <RkCard>
        <View rkCardHeader={true}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
            <View style={{}}>
              <RkText rkType='header'>Payment Request</RkText>
              <RkText rkType='subtitle'>from Michael Litchev</RkText>
            </View>
          </View>
        </View>
        <View rkCardContent={true}>
          <RkText rkType='cardText'>
            This request covers the next 4 weeks of sprint management, including sprint planning, retrospectives & stand-ups.
          </RkText>
        </View>
        <View rkCardFooter={true} style={styles.footer}>
        <RkButton rkType='clear link accent'>
                <Icon name="dollar" style={likeStyle} />
                <RkText rkType='accent'>400.00</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="clock-o" style={iconButton} />
                <RkText rkType='hint'>1 Month</RkText>
              </RkButton>
              {/* <RkButton rkType='clear link' onPress={() => navigation.navigate('PaymentScreen', {
                amount: '245'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>Pay Here</RkText>
              </RkButton> */}
        </View>
      </RkCard>
    );
  }
}