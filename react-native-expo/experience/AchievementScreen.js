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

export default class AchievementScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handlePress = async (achievement) => {
      const schema = this.props.navigation.getParam('schema', 'None')
      const update = this.props.navigation.getParam('function', 'none')
      const origin = this.props.navigation.getParam('origin', 'none')

      let key = schema.list.priority;
      let id = schema.experience.id;

      const body = {
        [key.completed]: true,
        xpEarned: schema.experience.xpEarned + parseInt(schema.list.amount, 10),
        achievements: schema.experience.achievements + 1
      }
          try {
            const result = await API.put('pareto', `/experience/${id}`, {body})
            await update(schema.experience.type, result)

          } catch (e) {
              console.log('ERROR: ', e)
          }
          if (origin === 'Instructor') {
          this.props.navigation.navigate('InstructorScreen')
          } else {
            this.props.navigation.navigate('HomeScreen')
          }
      }

  render() {
      const schema = this.props.navigation.getParam('schema', 'None')
      console.log('Passed down props: ', schema)
      const overview = schema.list.overview;
      const complete = schema.complete;   
    return(
        <ScrollView>
        <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}>
        <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={require('../assets/blueprint.jpg')} />
            <View rkCardHeader style={styles.content}>
            <RkText style={{fontSize: 24}} rkType='header4'>{schema.list.title}</RkText>
            <RkText style={{fontSize: 18 }} rkType='header4'>{schema.list.amount} EXP</RkText>

            </View>
            <View rkCardContent>
            <View>
                <BlockContent blocks={overview} />
                <RkText>{'\n'}</RkText>
            </View>
            </View>
        </RkCard>

        {complete.completed === false ? (
          <Button full style={{backgroundColor: "#6200EE"}} onPress={this.handlePress}><Text>Mark Complete</Text></Button>

        ) : (<Button full disabled style={{backgroundColor: "gray"}}><Text>Achievement Unlocked</Text></Button>
        )
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
