import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { API, Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./Profile.css";

 export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      profile: {},
      fName: "First Name",
      lName: "Last Name",
      city: "City",
      // region: `${this.props.navigation.state.params.profile.region}`,
      country: "Country",
      expo: "Expo",
      // // tRank: props.navigation.state.params.tRank,
      // cRank: "",
      github: "Github",
      // dob: "",
      // mbriggs: "",
      // startDateTimePickerVisible: false,
      // endDateTimePickerVisible: false,
      // // xp: `${this.props.navigation.state.params.profile.xp}`,
      loading: false,
      // cca2: 'US',
      // mentors: [],
      mentor: "Mentor"
    }
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
    console.log("id: " + id);
    console.log("profile: ", profile);
    this.setState({ profile: profile });
  }
  //  validateForm() {
  //   return (
  //     this.state.email.length > 0 &&
  //     this.state.password.length > 0 &&
  //     this.state.password === this.state.confirmPassword
  //   );
  // }

  //  validateConfirmationForm() {
  //   return this.state.confirmationCode.length > 0;
  // }

   handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

   handleSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true })
    const body = {
      fName: this.state.fName,
      lName: this.state.lName,
      city: this.state.city,
      country: this.state.country,
      tRank: "Developer",
      github: this.state.github,
      expo: this.state.expo,
      mentor: this.state.mentor
      }
    try {
      const putResult = await API.put('fsa', `/users/${this.state.id}`, {body})
      console.log(putResult)
      this.setState({ loading: false })
    } catch (e) {
        console.log('ERROR: ', e)
    }
    //  this.setState({ isLoading: true });

    //  const attributes = {
    //   email: this.state.email,
    //   phone_number: this.state.phone
    // };

    //  try {
    //   const newUser = await Auth.signUp({
    //     username: this.state.email,
    //     password: this.state.password,
    //     attributes: attributes
    //   });
    //   this.setState({
    //     newUser
    //   });
    // } catch (e) {
    //   alert(e);
    // }

    //  this.setState({ isLoading: false });
  };

   handleConfirmationSubmit = async event => {
    event.preventDefault();
    //  this.setState({ isLoading: true });

    //  try {
    //   await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
    //   await Auth.signIn(this.state.email, this.state.password);

    //    this.props.userHasAuthenticated(true);
    //   this.props.history.push("/");
    // } catch (e) {
    //   alert(e.message);
    //   this.setState({ isLoading: false });
    // }
  };

   renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Your Profile</h2>

        <FormGroup controlId="fName" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.fName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="lName" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.lName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="city" bsSize="large">
          <ControlLabel>City</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="expo" bsSize="large">
          <ControlLabel>Expo</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.expo}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="github" bsSize="large">
          <ControlLabel>Github</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.github}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="mentor" bsSize="large">
          <ControlLabel>Mentor</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.mentor}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="country" bsSize="large">
          <ControlLabel>Country</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.country}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          // disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Update"
          loadingText="Updating…"
        />
      </form>
    );
  }

   render() {
    return (
      <div className="Profile">
        {this.renderForm()}
      </div>
    );
  }
}
