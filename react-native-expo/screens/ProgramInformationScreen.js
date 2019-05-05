import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText, RkButton
} from 'react-native-ui-kitten';
import { Button, Text } from "native-base";
import { API } from "aws-amplify";
const BlockContent = require('@sanity/block-content-to-react')

export default class ProgramInformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


  render() {

    const 
      
    return(
        <ScrollView>
        <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}>
        <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={require('../assets/blueprint.jpg')} />
            <View rkCardHeader style={styles.content}>
            <RkText style={{fontSize: 24}} rkType='header4'>{this.props.name}</RkText>
            <RkText style={{fontSize: 18 }} rkType='header4'>{this.props.price} $$</RkText>
            <RkText style={{fontSize: 18 }} rkType='header4'>{this.props.length}</RkText>


            </View>
            <View rkCardContent>
            <View>
            <RkText>{this.props.description}</RkText>
                <RkText>{'\n'}</RkText>
            </View>
            </View>
        </RkCard>

          <Button full style={{backgroundColor: "#6200EE"}} onPress={() => this.props.navigation.navigate('PaymentScreen', { amount: this.props.price })}><Text>Purchase Training</Text></Button>

       
      }
        <Text>{'\n'}</Text>
        </TouchableOpacity>
        </ScrollView>
  );
      }

    }

const styles = RkStyleSheet.create(theme => ({
  // container: {
  //   backgroundColor: theme.colors.screen.scroll,
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,
  // },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
