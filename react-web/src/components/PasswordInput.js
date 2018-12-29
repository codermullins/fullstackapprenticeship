import React from "react";
import PaperTextField from "./PaperTextField";
import { connect } from "react-redux";
import { setPassword, setConfirmPassword } from "../actions/user";

class PasswordInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmPassword: ""
        };
    }
    render() {
        return this.props.variant === "password" ? (
            <PaperTextField
                autoComplete="new-password"
                fullWidth
                id="password"
                label="password"
                type="password"
                renderField={this.props.showPasswordInput}
                handleChange={this.handleChange}
                value={this.props.password}
                autoComplete="new-password"
            />
        ) : (
            <PaperTextField
                autoComplete="new-password"
                fullWidth
                id="confirmPassword"
                label="confirm password"
                type="password"
                renderField={this.props.showConfirmPassword}
                handleChange={this.confirmPassword}
                value={this.state.confirmPassword}
                autoComplete="new-password"
            />
        );
    }
    handleChange = event => {
        this.props.dispatch(setPassword(event.target.value));
    };
    confirmPassword = event => {
        this.setState({ confirmPassword: event.target.value });
    };
}

const mapStateToProps = state => {
    console.log(state);
    return {
        password: state.user.password,
        confirmPassword: state.user.confirmPassword,
        showConfirmPassword: state.authForm.showConfirmPassword,
        showPasswordInput: state.authForm.showPasswordInput
    };
};

export default connect(mapStateToProps)(PasswordInput);
