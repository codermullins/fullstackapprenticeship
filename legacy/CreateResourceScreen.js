import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Picker, Button, Text,
  Header, Left, Body, Right, Title
} from 'native-base';
import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
} from '../utils/directories';
import { Ionicons } from "@expo/vector-icons";
import { API } from 'aws-amplify';
import uuidv4 from "uuid";

export default class CreateResourceScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      directory: 'fsa',
      schemas: [],
      schema: '',
      description: '',
      url: '',
      author: '',
      rank: ''
    }
  }

  componentDidMount() {
    this.updateSchemas()
  }

  changeDirectory = async value => {
    await this.setState({
      directory: value
    })
    await this.updateSchemas();
  }

  updateSchemas() {
    switch (this.state.directory) {
      case 'fsa':
        this.setState({ 
          schemas: fullStackApprenticeship,
          schema: 'Get Started'
        })
        break;
      case 'cityGuide':
        this.setState({ 
          schemas: cityByCity,
          schema: 'Seattle'
        })
        break;
      case 'findingWork':
        this.setState({ 
          schemas: findingWork,
          schema: 'Community'
        })
        break;
      default:
        break;
    }
  }

  validateForm = () => {
    return this.state.name.length > 0 && this.state.description.length > 0 && this.state.url.length > 0; 
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      resourceId: uuidv4(),
      directory: this.state.directory,
      // author: this.state.author,
      name: this.state.name,
      url: this.state.url,
      schema: this.state.schema,
      timestamp: Date.now(),
      description: this.state.description,
      rank: this.state.rank,
      approved: undefined
    }

    try {
      const response = await API.post('resources', '/resources', {body})
      console.log('fsa-sls Response', response)
      // route home
    } catch(e) {
      console.log('ERROR', e)
    }
    
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  changeSchema = e => {
    this.setState({ schema: e.target.value })
  }

  render() {
    let schemas = this.state.schemas.map((schema, index) => 
      <Picker.item label={schema.name} value={schema.name} key={index} />)
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 24 : 0 }}>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
              <Ionicons style={{color: Platform.OS === 'android' ? 'white' : 'black', paddingLeft: 10 }} name="md-menu" size={32} />
            </TouchableOpacity>
          </Left>
          <Body>
            {/* <Title>#fsa206</Title> */}
          </Body>
          <Right>
            <View></View>
          </Right>
        </Header>
        <Container>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Resource Name</Label>
                <Input
                  value={this.state.name}
                  onChangeText={(name) => this.setState({ name }) }
                />
              </Item>

              <Item>
                <Label>Directory</Label>
                <Picker 
                  selectedValue={this.state.directory}
                  onValueChange={(value) => this.changeDirectory(value)}>
                  <Picker.item label='FSA' value='fsa' />
                  <Picker.item label='City Guide' value='cityGuide' />
                  <Picker.item label='Finding Work' value='findingWork' />
                </Picker>
              </Item>

              <Item>
                <Label>Schema</Label>
                <Picker
                  selectedValue={this.state.pickedSchema}
                  onValueChange={(schema) => this.setState({ pickedSchema: schema})}>
                  {schemas}
                </Picker>
              </Item>

              <Item floatingLabel>
                <Label>Description</Label>
                <Input 
                  value={this.state.description}
                  onChangeText={(description) => this.setState({ description })}
                />
              </Item>

              <Item floatingLabel>
                <Label>URL</Label>
                <Input 
                  value={this.state.url}
                  onChangeText={(url) => this.setState({ url })}
                />
              </Item>

              <Item floatingLabel>
                <Label>Resource Author</Label>
                <Input
                  value={this.state.author}
                  onChangeText={(author) => this.setState({ author })}
                />
              </Item>

              <Item floatingLabel>
                <Label>Rank</Label>
                <Input
                  value={this.state.rank}
                  onChangeText={(rank) => this.setState({ rank })}
                />
              </Item>
              <Text>Give your resource a rank must be a number between 0 and 100</Text>

              <Button disabled={!this.validateForm()} onPress={this.handleSubmit}><Text>Request</Text></Button>
            </Form>
          </Content>
        </Container>
      </View>
    )
  }
}