import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import LoadingButton from "./LoadingButton";
import PaperTextField from "./PaperTextField";

import { confirmSignUpForm, forgotPasswordForm } from "../actions/authForm";

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 2
    }
});

class ConfirmationCodeInput extends React.Component {
    render() {
        const { authForm, classes } = this.props;
        return (
            <React.Fragment>
                <PaperTextField
                    id="confirmationCode"
                    label="confirmation code"
                    type="text"
                    order={0}
                    handleChange={this.handleChange}
                    renderField={authForm.showConfirmationInput}
                    value={authForm.confirmationCode}
                    fullWidth
                />
                {this.renderFormActionButton({
                    order: 0,
                    buttonContent: "Resend confirmation code",
                    buttonLoadingContent: "Resending confirmation code...",
                    disabled: authForm.disableActionButton,
                    type: "button",
                    renderField:
                        authForm.showConfirmationInput &&
                        authForm.confirmationCode.length === 0,
                    onClick: () => {
                        switch (authForm.formAction) {
                            case "confirmSignUp":
                                this.props.dispatch(confirmSignUpForm());
                                break;
                            case "forgotPassword":
                                this.props.dispatch(forgotPasswordForm());
                                break;
                            default:
                        }
                    }
                })}
            </React.Fragment>
        );
    }
    renderFormActionButton = ({
        order = 0,
        color = "primary",
        disabled = false,
        buttonContent = this.props.buttonContent,
        buttonLoadingContent = this.props.buttonLoadingContent,
        renderField = true,
        ...props
    }) => {
        const delay = parseInt(order) * 100;
        const { classes } = this.props;
        return (
            <Slide
                direction="right"
                mountOnEnter
                unmountOnExit
                in={renderField}
                style={{ transitionDelay: delay }}
            >
                <LoadingButton
                    isLoading={this.props.isLoading}
                    text={buttonContent}
                    loadingText={buttonLoadingContent}
                    color={color}
                    disabled={disabled}
                    className={classes.button}
                    {...props}
                />
            </Slide>
        );
    };
}

const mapStateToProps = state => ({
    authForm: state.authForm
});

export default connect(mapStateToProps)(
    withStyles(styles)(ConfirmationCodeInput)
);
