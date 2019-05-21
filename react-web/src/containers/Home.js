import React from "react";
import Typography from "@material-ui/core/Typography";
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
    this.state = {};
  }
  async componentDidMount() {
    console.log(this.props);
  }
  //   Based on the isAuthenticated state object, we can render either the LinkTabs or the SignUp
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.background}>
          {this.props.isAuthenticated ? (
            <LinkTabs />
          ) : (
            <Login userHasAuthenticated={this.props.userHasAuthenticated} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);