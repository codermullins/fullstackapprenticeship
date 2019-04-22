import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Picker, Button, Text } from 'native-base';
import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
} from '../components/directories';

class CreateResourceScreen extends Component {
  constructor() {
    super();
    this.state = {
      resourceName: '',
      directory: 'fsa',
      schemas: [],
      pickedSchema: '',
      description: '',
      url: '',
      author: '',
      rank: ''
    }
  }

  componentDidMount() {
    this.updateSchemas('fsa')
  }

  updateSchemas(directoryValue) {
    this.setState({ directory: directoryValue })
    switch (directoryValue) {
      case 'fsa':
        this.setState({ schemas: fullStackApprenticeship })
        break;
      case 'cityByCity':
        this.setState({ schemas: cityByCity })
        break;
      case 'findingWork':
        this.setState({ schemas: findingWork })
        break;
      default:
        break;
    }
  }

  render() {
    let schemas = this.state.schemas.map((schema, index) => 
      <Picker.item label={schema.name} value={schema.name} key={index} />)
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Resource Name</Label>
              <Input
                value={this.state.resourceName}
                onChangeText={(resourceName) => this.setState({ resourceName }) }
              />
            </Item>

            <Item>
              <Label>Directory</Label>
              <Picker 
                selectedValue={this.state.directory}
                onValueChange={(directoryValue) => this.updateSchemas(directoryValue) }>
                <Picker.item label='FSA' value='fsa' />
                <Picker.item label='City By City' value='cityByCity' />
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

          </Form>
        </Content>
      </Container>
    )
  }
}

export default CreateResourceScreen;