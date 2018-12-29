import { Auth } from "aws-amplify";
import { push } from "connected-react-router";

//Globally useful stuff
const waitASec = () => ({
    type: "WAIT_A_SEC"
});
const doneLoading = () => ({
    type: "DONE_LOADING"
});

//Authenticate User
export const currentAuthenticatedUser = (userToken = {}) => ({
    type: "CURRENT_AUTHENTICATED_USER",
    userToken
});
export const userNotAuthenticated = () => ({
    type: "USER_NOT_AUTHENTICATED"
});
export const thunkCurrentAuthenticatedUser = () => {
    return function(dispatch, getState) {
        dispatch(waitASec());
        return Auth.currentAuthenticatedUser()
            .then(user => {
                const token = user.signInUserSession.idToken;
                dispatch(currentAuthenticatedUser(token));
            })
            .catch(err => {
                dispatch(userNotAuthenticated());
            });
    };
};

//Log out
export const authSignOut = () => ({
    type: "SIGN_OUT"
});

export const thunkSignOut = () => {
    return function(dispatch) {
        dispatch(waitASec());
        return Auth.signOut()
            .then(() => {
                dispatch(authSignOut());
                dispatch(userNotAuthenticated());
            })
            .catch(err => {
                console.log(err);
                dispatch(userNotAuthenticated());
            });
    };
};

//Sign In
export const authSignIn = ({ username = "", password = "" }) => {
    return Auth.signIn(username, password);
};
export const awaitSignIn = () => ({
    type: "AWAIT_SIGN_IN"
});
export const signInSuccess = (body = {}) => ({
    type: "SIGN_IN_SUCCESS",
    body
});
export const signInPasswordError = err => ({
    type: "SIGN_IN_PASSWORD_ERROR",
    err
});
export const signInUserNotFound = err => ({
    type: "SIGN_IN_USER_NOT_FOUND",
    err
});
export const signInNotConfirmed = err => ({
    type: "SIGN_IN_NOT_CONFIRMED",
    err
});

export const thunkSignIn = ({ username = "", password = "" } = {}) => {
    console.log("outside");
    return function(dispatch, getState) {
        console.log("inside");
        dispatch(waitASec());
        return authSignIn({ username, password })
            .then(data => {
                dispatch(push("/"));
                dispatch(signInSuccess(data));
            })
            .catch(err => {
                console.log(err);
                switch (err.code) {
                    case "NotAuthorizedException":
                        dispatch(signInPasswordError(err));
                        // this.setSignInPasswordErrorState(err.message);
                        // this.props.userHasAuthenticated(false);
                        break;
                    case "UserNotFoundException":
                        // this.setUserNotFoundState(err.message);
                        // this.props.userHasAuthenticated(false);
                        break;
                    case "UserNotConfirmedException":
                        dispatch(confirmSignUp());
                        dispatch(push("/signup"));
                        break;
                    default:
                }
            });
    };
};

export const authForgotPassword = ({ email = "" } = {}) => ({
    type: "FORGOT_PASSWORD",
    email
});
export const authForgotPasswordSubmit = ({
    email = "",
    confirmationCode = "",
    password = ""
} = {}) => ({
    type: "FORGOT_PASSWORD_SUBMIT",
    email,
    confirmationCode,
    password
});

export const thunkForgotPassword = ({ username = "" } = {}) => {
    return function(dispatch) {
        return Auth.forgotPassword(username).then(() => {
            dispatch(push("/login"));
        });
    };
};

//Sign Up
export const authConfirmSignUp = ({
    username = "",
    confirmationCode = ""
} = {}) => ({
    type: "CONFIRM_SIGN_UP",
    username,
    confirmationCode
});
export const authResendSignUp = ({ email = "" } = {}) => ({
    type: "RESEND_SIGN_UP",
    email
});
export const thunkResendSignUp = ({ email = "" } = {}) => {
    return function(dispatch) {
        Auth.resendSignUp(email)
            .then(event => {
                dispatch(confirmSignUp());
            })
            .catch(err => console.log(err));
    };
};
export const confirmSignUp = {
    type: "CONFIRM_SIGN_UP"
};
export const thunkConfirmSignup = ({
    username = "",
    confirmationCode = ""
} = {}) => {
    return function(dispatch, getState) {
        console.log(getState);
        Auth.confirmSignUp(username, confirmationCode, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        })
            .then(data => {
                dispatch(
                    thunkSignIn({
                        username: getState.user.username,
                        password: getState.user.password
                    })
                );
            })
            .catch(err => {
                console.log(err);
                const errorMessages = err.message ? err.message : err;
                // this.setState(state => {
                //     return { errors: state.errors.concat(errorMessages) };
                // });
            });
    };
};
export const thunkSignUp = ({
    username = "",
    password = "",
    email = ""
} = {}) => {
    return function(dispatch) {
        return Auth.signUp({
            username,
            password,
            attributes: {
                email
            }
        })
            .then(data => {
                dispatch(confirmSignUp());
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                const errorMessages = err.message ? err.message : err;
                // this.setState(state => {
                //     return { errors: state.errors.concat(errorMessages) };
                // });
            });
    };
};
