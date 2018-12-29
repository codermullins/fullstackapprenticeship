import React from "react";
import { connect } from "react-redux";
import { setUsername } from "../actions/user";
import { thunkForgotPassword } from "../thunks/auth";

class ForgotPasswordForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p className="light">
                    Enter your username below to receive a confirmation code via
                    email.
                </p>
                <p id="formErrors">
                    {/* {this.props.data.errors
                        ? this.props.data.errors.join(", ")
                        : null} */}
                </p>
                <form
                    className="forgotPasswordForm"
                    onSubmit={this.handleForgotPasswordSubmit}
                >
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

                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        );
    }

    handleOnChange = event => {
        this.props.dispatch(setUsername(event.target.value));
    };
    handleForgotPasswordSubmit = () => {
        this.props.dispatch(
            thunkForgotPassword({ username: this.props.username })
        );
    };

    handleOnSubmit = event => {
        event.preventDefault();
        if (!this.validateUsername(this.props.username)) {
            console.log("Username is required");
            return;
        }
        this.props.handleOnSubmit();
    };

    validateUsername = username => {
        return username.length > 0;
    };
}

const mapStateToProps = state => ({
    username: state.user.username
});

export default connect(mapStateToProps)(ForgotPasswordForm);
