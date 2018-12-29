import React from "react";
import LoginForm from "../components/LoginForm";
import ForgotPassword from "./ForgotPassword";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forgotPassword: false
        };
    }

    render() {
        return (
            <div className="App-intro">
                <h1>Login to Full-Stack Apprentice</h1>
                <p className="light">
                    Learn to create modern & secure digital products
                </p>
                <br />
                {this.state.forgotPassword ? (
                    <ForgotPassword
                        resetForgotPassword={this.resetForgotPassword}
                    />
                ) : (
                    <LoginForm forgotPassword={this.forgotPassword} />
                )}
            </div>
        );
    }

    forgotPassword = () => {
        this.setState({
            forgotPassword: true
        });
    };

    resetForgotPassword = () => {
        this.setState({
            forgotPassword: false
        });
    };
}
