import React from "react";
import { connect } from "react-redux";
import { setUsername, setPassword } from "../actions/user";
import { thunkSignIn } from "../thunks/auth";

class LoginForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p id="formErrors">
                    {this.props.errors ? this.props.errors.join(", ") : null}
                </p>
                <form className="loginForm" onSubmit={this.handleOnSubmit}>
                    <div className="formElement">
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            value={this.props.username}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <br />

                    <div className="formElement">
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            value={this.props.password}
                            onChange={this.handleOnChange}
                        />
                        <br />
                        <button
                            className="light small"
                            type="button"
                            onClick={this.props.forgotPassword}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <input type="submit" value="Login" />
                </form>
            </React.Fragment>
        );
    }

    handleOnChange = event => {
        switch (event.target.id) {
            case "username":
                this.props.dispatch(setUsername(event.target.value));
                break;
            case "password":
                this.props.dispatch(setPassword(event.target.value));
                break;
            default:
        }
    };

    handleOnLoginSubmit = () => {
        this.props.dispatch(
            thunkSignIn({
                username: this.props.username,
                password: this.props.password
            })
        );
    };

    validateUsername = username => {
        return username.length > 0;
    };
}

const mapStateToProps = state => ({
    email: state.user.email,
    username: state.user.username,
    password: state.user.password
});

export default connect(mapStateToProps)(LoginForm);
