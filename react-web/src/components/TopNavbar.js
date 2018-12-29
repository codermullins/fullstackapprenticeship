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
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { thunkSignOut } from "../thunks/auth";

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
            routeknowledge,
            routeSignup,
            routeLogin,
            userToken,
            handleSignOut,
            fancyLogin
        } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h6" color="inherit">
                        <Button color="inherit" onClick={() => routeHome()}>
                            #thehub
                        </Button>
                    </Typography>
                    <div className={classes.grow} />
                    {userToken
                        ? [
                            //   <Button
                            //       key={0}
                            //       onClick={() => routeknowledge()}
                            //       color="inherit"
                            //   >
                            //       Knowledge Base
                            //   </Button>,
                              <Button
                                  key={1}
                                  color="inherit"
                                  onClick={() => handleSignOut()}
                              >
                                  Logout
                              </Button>
                          ]
                        : [
                            //   <Button
                            //       key={0}
                            //       onClick={() => routeknowledge()}
                            //       color="inherit"
                            //   >
                            //       Knowledge
                            //   </Button>,
                            //   <Button
                            //       key={1}
                            //       color="inherit"
                            //       onClick={() => routeSignup()}
                            //   >
                            //       Register
                            //   </Button>,
                            //   <Button
                            //       key={2}
                            //       color="inherit"
                            //       onClick={() => routeLogin()}
                            //   >
                            //       Login
                            //   </Button>,
                            //   <IconButton
                            //       key={3}
                            //       color="inherit"
                            //       onClick={() => fancyLogin()}
                            //   >
                            //       <AccountCircleIcon />
                            //   </IconButton>
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
            routeSignup: () => push("/signup"),
            routeLogin: () => push("/login"),
            routeknowledge: () => push("/knowledge"),
            handleSignOut: () => thunkSignOut(),
            fancyLogin: () => push("/fancyLogin")
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
