import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import Routes from "./Routes";
import awsmobile from "./aws-exports";
// import { thunkCurrentAuthenticatedUser } from "./thunks/auth";
import Footer from "./components/Footer";
import TopNavbar from "./components/TopNavbar";

import "./App.css";
require("typeface-quicksand");

Amplify.configure(awsmobile);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontFamily: "'Quicksand', sans-serif;"
  },
  palette: {
    primary: {
      // main: "#6200EE"
      // main: '#9c27b0'
      main: "#3700B3"
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <TopNavbar />
          <Routes childProps={childProps} />
          <Footer />
        </CssBaseline>
      </MuiThemeProvider>
    );
  }

  handleLogout = () => {};
}

const mapStateToProps = state => ({
  authState: state.authState.authState
});

export default connect(mapStateToProps)(App);
// export default withRouter(App);
