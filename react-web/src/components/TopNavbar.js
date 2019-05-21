import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// import { thunkSignOut } from "../thunks/auth";

const styles = {
    grow: {
        flexGrow: 1
    }
};
class TopNavbar extends React.Component {
    render() {
        const {
            classes,
            routeHome,
            // routeSignup,
            // userToken,
            // handleSignOut,
            suggest,
            handleLogout
        } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h6" color="inherit">
                        <Button color="inherit" onClick={() => routeHome()}>
                            #fsapprenticeship
                        </Button>
                    </Typography>
                    <div className={classes.grow} />
                    {this.props.isAuthenticated
                        ? [
                            <Button
                                  key={3}
                                  color="inherit"
                                  onClick={() => suggest()}
                              >
                                  {/* <AccountCircleIcon /> */}
                                  + Resource
                              </Button>,
                              <Button
                                  key={1}
                                  color="inherit"
                                  onClick={handleLogout}
                              >
                                  Logout
                              </Button>
                          ]
                        : [
                              <Button
                                  key={3}
                                  color="inherit"
                                  onClick={() => suggest()}
                              >
                                  {/* <AccountCircleIcon /> */}
                                  + Resource
                              </Button>
                          ]}
                </Toolbar>
            </AppBar>
        );
    }
}

TopNavbar.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            routeHome: () => push("/"),
            routeSignup: () => push("/authsignup"),
            routePayment: () => push("/payments"),
            handleSignOut: () => push('/'),
            suggest: () => push("/resource/new")
        },
        dispatch
    );
};

const mapStateToProps = state => ({
    userToken: state.auth.userToken
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopNavbar));
