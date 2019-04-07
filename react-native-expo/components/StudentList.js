import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image
} from 'react-native';
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme
} from 'react-native-ui-kitten';
import { Container, Header } from "native-base";
import { API, Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    }

  }

  async componentDidMount() {
      const students = await API.get('fsa', '/users')
      this.setState({ students: students.data })
  }

  renderStudents = (students) => {
    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    
    return(
        <View>    
            {students.map((student, i) => (
                 <RkCard key={i}>
                 <View rkCardHeader={true}>
                   <View style={{ flexDirection: 'row' }}>
                     <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                     <View style={{}}>
                       <RkText rkType='header'>{student.name}</RkText>
                       <RkText rkType='subtitle'>Technical Rank - {student.tRank}</RkText>
                     </View>
                   </View>
                 </View>
                 <View rkCardContent={true}>
                   <RkText rkType='cardText'>
                     Product Information: {'\n'}
                     Experience Level: 
                   </RkText>
                 </View>
                 <View rkCardFooter={true} style={styles.footer}>
                   <RkButton rkType='clear link accent'>
                     <Icon name="github" style={likeStyle} />
                     <RkText rkType='accent'>{student.github}</RkText>
                   </RkButton>
                   <RkButton rkType='clear link'>
                     <Icon name="map" style={iconButton} />
                     <RkText rkType='hint'>{student.city}</RkText>
                   </RkButton>
                 </View>
                 <View rkCardFooter={true} style={styles.footer}>
                   <RkButton rkType='clear link accent'>
                     <Icon name="book" style={likeStyle} />
                     <RkText rkType='accent'>Experience</RkText>
                   </RkButton>
                   <RkButton rkType='clear link'>
                     <Icon name="money" style={iconButton} />
                     <RkText rkType='hint'>Request Payment</RkText>
                   </RkButton>
                 </View>
               </RkCard>
            ))}
          </View>
    )
  }

  render() {
    return (
        <Container>
            <Header />
            {this.renderStudents(this.state.students)}
        </Container>
    )
  }
}

let styles = StyleSheet.create({
    screen: {
      backgroundColor: '#f0f1f5',
      padding: 12,
    },
    buttonIcon: {
      marginRight: 7,
      fontSize: 19.7,
    },
    footer: {
      marginHorizontal: 16,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      marginRight: 17,
    },
    dot: {
      fontSize: 6.5,
      color: '#0000008e',
      marginLeft: 2.5,
      marginVertical: 10,
    },
    floating: {
      width: 56,
      height: 56,
      position: 'absolute',
      zIndex: 200,
      right: 16,
      top: 173,
    },
    footerButtons: {
      flexDirection: 'row',
    },
    overlay: {
      justifyContent: 'flex-end',
      paddingVertical: 23,
      paddingHorizontal: 16,
    },
  });