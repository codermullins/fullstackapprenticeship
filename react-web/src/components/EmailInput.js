import React from "react";
import PaperTextField from "./PaperTextField";
import { connect } from "react-redux";
import { setEmail } from "../actions/user";

class EmailInput extends React.Component {
    render() {
        console.log(this.props);
        return (
            <PaperTextField
                id="email"
                label="email"
                type="email"
                handleChange={this.handleChange}
                value={this.props.email}
                autoComplete="new-password"
                disabled={this.props.disableEmailInput}
                fullWidth
            />
        );
    }
    handleChange = event => {
        this.props.dispatch(setEmail(event.target.value));
    };
}

const mapStateToProps = state => {
    console.log(state);
    return {
        email: state.user.email,
        disableEmailInput: state.authForm.disableEmailInput
    };
};

export default connect(mapStateToProps)(EmailInput);
