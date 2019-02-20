import React, { Component } from "react";

export default class Typing extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false }
        this.submit = this.submit.bind(this)
    }

    async submit(ev) {
        console.log('Hello')
    }

    render() {
 
        return(
            <div>
                <p>Coming Soon</p>
                
                <button onClick={this.submit}>Send</button>
            </div>
        )
    }
}