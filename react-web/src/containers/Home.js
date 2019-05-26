import React from "react";
import { API, Auth } from "aws-amplify";
// import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LinkTabs from "./LinkTabs";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Login from "./Login";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontFamily: "inherit",
    fontWeight: "700"
  }
});

const styles = theme => ({
  background: {
    backgroundSize: "cover",
    padding: theme.spacing.unit * 3
  },
  root: {
    padding: theme.spacing.unit * 2,
    background: "rgba(0,0,0, .5)",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2
  },
  joinButton: {},
  slackIcon: {
    width: "40px",
    height: "40px"
  }
});

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  async componentDidMount() {
    console.log(this.props);
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      this.setState({ id: user.attributes.sub });
      await this.fetchProfile(this.state.id);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  async fetchProfile(id) {
    const profile = await API.get("fsa", `/users/${id}`);
    console.log(id);
    console.log("Length: ", profile.length);
    await this.setState({ profile: profile[0] });
  }

  //   Based on the isAuthenticated state object, we can render either the LinkTabs or the SignUp
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.background}>
          {this.props.isAuthenticated ? (
            <React.Fragment>{this.props.id}</React.Fragment>
          ) : (
            <Login userHasAuthenticated={this.props.userHasAuthenticated} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
