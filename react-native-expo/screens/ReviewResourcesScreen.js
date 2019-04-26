import React, { Component } from 'react';
import ReviewResourceFormScreen from './ReviewResourceFormScreen';
import { Container, Content, Item, Label, Text, Card, Button, Form, Input } from 'native-base';

export default class ReviewResourcesScreen extends Component {
  constructor() {
    super();

    this.state = {
      links: [],
      processing: false,
      resourceInProcess: null
    }
  }


  componentDidMount() {
    this.setState({ links: this.state.links.concat(fakeListOfNewResources)})
  }

  handleReviewResource(item) {
    this.setState({
      processing: true,
      resourceInProcess: item
    })
  }

  render() {
    let toProcess = this.state.links.map((item, index) => {
      return (
        <Card key={index}>
          <Label>{item.name}</Label>
          <Text>{item.description}</Text>
          <Button onPress={() => this.handleReviewResource(item)}>
            <Text>
              Review Resource
            </Text>
          </Button>
        </Card>
      )
    })
    return !this.state.processing ?
      <Container>
        <Content>
          {toProcess}
        </Content>
      </Container>
      :
      <ReviewResourceFormScreen resource={this.state.resourceInProcess} />
  }
}

const fakeListOfNewResources = [
  {
    name: 'Valhalla Coffee Co.2',
    directory: 'cityByCity',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'google.com',
    author: 'Vincent',
    rank: '80',
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'FSA',
    schema: 'Getting Started',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  }
]