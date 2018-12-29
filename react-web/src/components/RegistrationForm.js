import React from "react";
import { connect } from "react-redux";
import { setUsername, setPassword, setEmail } from "../actions/user";

class RegistrationForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3>Create your personal account</h3>
                <form className="signupForm" onSubmit={this.handleOnSubmit}>
                    <p id="formErrors">{this.renderErrors()}</p>
                    <div className="formElement">
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            value={this.props.username}
                            onChange={this.handleOnChange}
                        />
                        <p className="light small">
                            This will be your public username.
                        </p>
                    </div>

                    <div className="formElement">
                        <label>Email</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            value={this.props.email}
                            onChange={this.handleOnChange}
                        />
                        <p className="light small">
                            You'll need to confirm your account using this
                            address. We'll never share your email address with
                            anyone.
                        </p>
                    </div>

                    <div className="formElement">
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            value={this.props.password}
                            onChange={this.handleOnChange}
                        />
                        <p className="light small">
                            Make sure this is at least 8 characters, including a
                            number, an uppercase character, and a symbol.
                        </p>
                    </div>

                    <input type="submit" value="Register" />
                </form>
            </React.Fragment>
        );
    }

    renderErrors = () => {
        if (this.props.errors) {
            return this.props.errors.join(", ");
        }
    };

    handleOnChange = event => {
        switch (event.target.id) {
            case "password":
                this.props.dispatch(setPassword(event.target.value));
                break;
            case "email":
                this.props.dispatch(setEmail(event.target.value));
                break;
            case "username":
                this.props.dispatch(setUsername(event.target.value));
        }
    };

    handleOnSubmit = event => {
        event.preventDefault();
        if (!this.validateUsername(this.props.username)) {
            this.props.addError("Username is required");
            return;
        }

        if (!this.validateEmail(this.props.email)) {
            this.props.addError("Email is invalid");
            return;
        }

        if (!this.validatePassword(this.props.password)) {
            this.props.addError("Password is invalid");
            return;
        }

        this.props.handleOnSubmit(this.props);
    };

    validateEmail = email => {
        // eslint-disable-next-line
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test(email);
    };

    validatePassword = password => {
        const validPassword = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/;
        return validPassword.test(password);
    };

    validateUsername = username => {
        // TODO: Create better validation rules here
        return username.length > 0;
    };
}

const mapStateToProps = state => {
    return {
        email: state.user.email,
        username: state.user.username,
        password: state.user.password
    };
};

export default connect(mapStateToProps)(RegistrationForm);
