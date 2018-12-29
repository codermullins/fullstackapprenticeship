import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body} from 'native-base';

class TechStandard extends Component {
    render(){
        return (
        <Container>
            <Content>
                <Card style={{flex:0}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../assets/knowledge.png')} />
                            <Body>
                                <Text>Getting Started</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button block textStyle={{color: `#8738B`}}>
                                <Text>View Content</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../assets/knowledge.png')} />
                            <Body>
                                <Text>React Native</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button block textStyle={{color: `#8738B`}}>
                                <Text>View Content</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../assets/knowledge.png')} />
                            <Body>
                                <Text>React Web</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button block textStyle={{color: `#8738B`}}>
                                <Text>View Content</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TechStandard;