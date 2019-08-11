import React from 'react';
import { Panel, Grid, Row, Col, Thumbnail } from 'react-bootstrap';

const expImg = require("../assets/exp.png");
const productImg = require("../assets/product.png");

const styles = {
  form: {
    display: 'flex',
    /* flexDirection: 'column', */
    alignItems:'center',
  }
}

export default class Sandbox extends React.Component {
  render() {
    return (
      <div className='Sandbox' style={styles.form}>
        <h1>Learn &amp; Earn Experience</h1>
        <Panel>
          <Panel.Body>
            Start your Apprenticeship<br></br>
            Status 2350 / 5000 EXP<br></br>
            <Thumbnail href="#" alt="171x180" src={expImg} /><br></br>
            Work through these 15 tasks...
          </Panel.Body>
          <Panel.Footer></Panel.Footer>
        </Panel>;
        <Panel>
          <Panel.Body>
            Portfolio Product<br></br>
            <Thumbnail href="#" alt="171x180" src={productImg} /><br></br>
            In 15 steps, you will go from a blank canvas to a scalable, performant & useful product in a production environment.
          </Panel.Body>
          <Panel.Footer></Panel.Footer>
        </Panel>;
      </div>
    )
  }
}