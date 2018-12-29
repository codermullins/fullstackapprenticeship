import React from "react";
import { Auth } from "aws-amplify";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default class ForgotPassword extends React.Component {
    state = {
        username: "",
        code: "",
        newPassword: "",
        confirmationPending: false,
        errors: []
    };

    render() {
        return (
            <React.Fragment>
                {this.state.confirmationPending ? (
                    <ResetPasswordForm
                        data={this.state}
                        handleOnChange={this.handleOnChange}
                        handleOnSubmit={this.handleOnResetSubmit}
                        addError={this.addErrors}
                    />
                ) : (
                    <ForgotPasswordForm
                        data={this.state}
                        handleOnChange={this.handleOnChange}
                        handleOnSubmit={this.handleOnUsernameSubmit}
                        addError={this.addErrors}
                    />
                )}
            </React.Fragment>
        );
    }

    handleOnChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleOnUsernameSubmit = () => {
        this.clearErrors();
        const username = this.state.username;

        Auth.forgotPassword(username)
            .then(data => {
                console.log(data);
                this.setState({
                    confirmationPending: true
                });
            })
            .catch(err => {
                err.message ? this.addErrors(err.message) : this.addErrors(err);
            });
    };

    handleOnResetSubmit = () => {
        this.clearErrors();
        const username = this.state.username;
        const code = this.state.code;
        const newPassword = this.state.newPassword;

        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then(data => {
                console.log(data);
                this.setState({
                    confirmationPending: false
                });
                this.props.resetForgotPassword();
                alert("Password changed successfully.");
            })
            .catch(err => {
                err.message ? this.addErrors(err.message) : this.addErrors(err);
            });
    };

    addErrors = errors => {
        this.setState(state => {
            return {
                errors: state.errors.concat(errors)
            };
        });
    };

    clearErrors = () => {
        this.setState({
            errors: []
        });
    };
}
