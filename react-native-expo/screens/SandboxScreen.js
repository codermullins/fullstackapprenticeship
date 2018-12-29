import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'; 
import SubcategoriesScreen from './SubcategoriesScreen';
import NavButton from "../components/NavButton"

class SandboxScreen extends Component
{
    render()
    {
        return (
        <Container>
            <Content>
                <NavButton route="Subcategories" />
                {/* <SubcategoriesScreen/> */}
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SandboxScreen;