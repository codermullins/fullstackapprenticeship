import React from "react";
import { API, Auth } from "aws-amplify";
import { Button, Thumbnail, Grid, ProgressBar, Row, Col } from "react-bootstrap";
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
      id: "",
      profile: {},
      xp: null,
      avatar: null,
      url: null
    };
  }
  async componentDidMount() {
    console.log(this.props);
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      this.setState({ id: user.attributes.sub });
      await this.fetchProfile(this.state.id);
      const url = await this.getAvatar(this.state.profile.github);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  async fetchProfile(id) {
    const profile = await API.get("fsa", `/users/${id}`);
    console.log("id: " + id);
    console.log("profile: ", profile);
    this.setState({ profile: profile[0] });
  }

  async getAvatar(github) {
    github = "danluong";
    fetch(`https://api.github.com/users/${github}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Prints result from `response.json()` in getRequest
        console.log(data.avatar_url);
        this.setState({ avatar: data.avatar_url, url: data.url });
      })
      .catch(error => console.error(error));
  }

  renderProfile() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            {this.state.avatar !== null ? (
              <Thumbnail href="#" alt="171x180" src={this.state.avatar} />
            ) : null}
            <Button href={`${this.state.profile.url}`}>Edit Profile</Button>
          </Col>
          <Col xs={6} md={4}>
            <h2>
              {this.state.profile.fName} {this.state.profile.lName}
            </h2>
            <h2>XP: {this.state.profile.xp}/5000</h2>
            <ProgressBar now={this.state.profile.xp/5000} label={`${this.state.profile.xp}%`} />

            <h2>Technical Rank: {this.state.profile.technicalRank}</h2>
            <h2>Github: {this.state.profile.github}</h2>
            <h2>City: {this.state.profile.city}</h2>
            <h2>Country: {this.state.profile.country}</h2>
          </Col>
          <Col xsHidden md={4}>
            <p>I'm a self-taught developer who specializes in React Web & Native development, using Node.js, serverless computing & Amazon Web Services to deliver value to my clients & employers.</p>
          </Col>
        </Row>
      </Grid>
    );
  }

  //   Based on the isAuthenticated state object, we can render either the LinkTabs or the SignUp
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.background}>
          {this.props.isAuthenticated ? (
            this.renderProfile()
          ) : (
            <Login userHasAuthenticated={this.props.userHasAuthenticated} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
