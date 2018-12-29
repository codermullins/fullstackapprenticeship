import React from "react";
import { connect } from "react-redux";
import { thunkSignUp, thunkConfirmSignup } from "../thunks/auth";

import RegistrationForm from "../components/RegistrationForm";
import ConfirmationForm from "../components/ConfirmationForm";

class Signup extends React.Component {
    render() {
        return (
            <div className="App-intro">
                <h1>Join Full-Stack Apprenticeship</h1>
                <p className="light">
                    Learn to create modern & secure digital products
                </p>
                <br />
                <br />
                {/* This loads a registration form, and upon successful
                registration changes to load a form to submit a confirmation
                code. */}
                {this.props.confirmationRequired ? (
                    <ConfirmationForm
                        handleOnSubmit={this.handleOnConfirmationSubmit}
                    />
                ) : (
                    <RegistrationForm
                        handleOnSubmit={this.handleOnRegistrationSubmit}
                    />
                )}
            </div>
        );
    }

    handleOnRegistrationSubmit = () => {
        this.props.dispatch(
            thunkSignUp({
                username: this.props.username,
                password: this.props.password,
                email: this.props.email
            })
        );
    };

    handleOnConfirmationSubmit = () => {
        this.props.dispatch(
            thunkConfirmSignup({
                username: this.props.username,
                confirmationCode: this.props.confirmationCode
            })
        );
    };
}

const mapStateToProps = state => ({
    confirmationRequired: state.authForm.confirmationRequired,
    errors: state.authForm.errors,
    username: state.user.username,
    password: state.user.password,
    email: state.user.email,
    confirmationCode: state.authForm.confirmationCode
});

export default connect(mapStateToProps)(Signup);
