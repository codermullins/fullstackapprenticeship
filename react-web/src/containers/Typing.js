import React, { Component } from "react";
import brace from 'brace';
import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

export default class Typing extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false, text: "" }
        this.forward = this.forward.bind(this)
        this.previous = this.previous.bind(this)
    }

    async componentDidMount() {
        const route = window.location.pathname;
        const index = route.substr(-1)
    }

    async forward(ev) {
        const route = window.location.pathname;
        const index = route.substr(-1)
        const num = parseInt(index, 10)
        this.props.history.push(`/typing/${num + 1}`)
    }

    async previous(ev) {
        const route = window.location.pathname;
        const index = route.substr(-1)
        const num = parseInt(index, 10)
        this.props.history.push(`/typing/${num - 1}`)
    }

    onChange(newValue) {
        console.log('change',newValue);
      }

    render() {
        const route = window.location.pathname;
        const index = route.substr(-1)

        const styles = theme => ({
            button: {
              margin: theme.spacing.unit,
            },
            input: {
              display: 'none',
            },
          });
 
        return(
            <div>
                <h1 style={{textAlign: 'center'}}>Building Keyboard Muscle Memory</h1>
                <p style={{textAlign: 'center'}}>Compatible only on Desktop Screen Dimensions</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" style={{marginLeft: '50px', marginBottom: '10px'}} color="secondary" onClick={this.previous}>Previous</Button>
                    <Button variant="contained" color="secondary" style={{marginRight: '50px', marginBottom: '10px'}} onClick={this.forward}>Next Excercise</Button>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>

                <AceEditor
                    mode="javascript"
                    theme="twilight"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    width="50%"
                />
                <img src={require(`../assets/${index}.png`)} height="500" width="50%"></img>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" color="secondary" onClick={this.previous}>Previous</Button>
                    <Button variant="contained" color="secondary" onClick={this.forward}>Next</Button>
                </div>
            </div>
        )
    }
}