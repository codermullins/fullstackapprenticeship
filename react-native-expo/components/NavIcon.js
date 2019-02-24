import React from 'react';
import { Ionicons } from "@expo/vector-icons"
import { withNavigation } from 'react-navigation';

class NavIcon extends React.Component {
  render() {
    // return <Button block style={{backgroundColor: "#6200EE"}} onPress={() => this.props.navigation.navigate(this.props.route, {
    //     schema: this.props.schema
    // }) }><Text>View</Text></Button>;
    return <Ionicons name="ios-arrow-round-forward" style={{color: 'white'}} size={32} onPress={() => this.props.navigation.navigate(this.props.route, {
        schema: this.props.schema
    })} />
  }
}

// withNavigation returns a component that wraps NavIcon and passes in the navigation prop
export default withNavigation(NavIcon);