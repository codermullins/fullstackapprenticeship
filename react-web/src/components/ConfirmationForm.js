import React from "react";
import { connect } from "react-redux";
import { setConfirmationCode } from "../actions/authForm";

class ConfirmationForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3>
                    Check your email for a confirmation code and enter below
                </h3>
                <form
                    className="confirmationForm"
                    onSubmit={this.handleOnSubmit}
                >
                    <p id="formErrors">{this.renderErrors()}</p>
                    <div className="formElement">
                        <label>Confirmation Code</label>
                        <br />
                        <input
                            type="text"
                            id="confirmationCode"
                            value={this.props.confirmationCode}
                            onChange={this.handleOnChange}
                        />
                    </div>{" "}
                    <br />
                    <input type="submit" value="Submit" />
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
        this.props.dispatch(setConfirmationCode(event.target.value));
    };

    handleOnSubmit = event => {
        event.preventDefault();
        if (!this.validateCode(this.props.confirmationCode)) {
            this.props.addError("Confirmation code required");
            return;
        }
        this.props.handleOnSubmit();
    };

    validateCode = code => {
        const validCode = /[0-9]{6}/;
        return validCode.test(code);
    };
}

const mapStateToProps = state => ({
    confirmationCode: state.authForm.confirmationCode
});

export default connect(mapStateToProps)(ConfirmationForm);
