import React from 'react';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

class NavButton extends React.Component {
  render() {
    return <Button block style={{backgroundColor: "#6200EE"}} onPress={() => this.props.navigation.navigate(this.props.route, {
        schema: this.props.schema
    }) }><Text>View</Text></Button>;
  }
}

// withNavigation returns a component that wraps NavButton and passes in the navigation prop
export default withNavigation(NavButton);