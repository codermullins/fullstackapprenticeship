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
const BlockContent = require('@sanity/block-content-to-react')

export default class AchievementScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handlePress = async () => {
          
        
          try {
              // PostgreSQL Query to update achievement item and user experience points
          } catch (e) {
              console.log('ERROR: ', e)
          }
          
        //   this.props.navigation.navigate('Home')
      }

  render() {
    
      const schema = this.props.navigation.getParam('schema', 'None')
      const overview = schema.overview;
      
    return(
        <ScrollView>
        <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}>
        <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={require('../assets/blueprint.jpg')} />
            <View rkCardHeader style={styles.content}>
            <RkText style={{fontSize: 24}} rkType='header4'>{schema.title}</RkText>
            <RkText style={{fontSize: 18 }} rkType='header4'>{schema.amount} EXP</RkText>

            </View>
            <View rkCardContent>
            <View>
                
                <BlockContent blocks={overview} />
                <RkText>{'\n'}</RkText>
                

            </View>
            </View>
            {/* <View rkCardFooter>
            <View style={styles.userInfo}>
                <RkText rkType='header6'>Michael Litchev </RkText>
            </View>
            <RkText rkType='secondary2 hintColor'>5000 Experience Points</RkText>
            </View> */}
        </RkCard>
        <Button full style={{backgroundColor: "#6200EE"}} onPress={this.handlePress}><Text>Mark Complete</Text></Button>
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
