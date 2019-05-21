import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Add from "../components/NewResourceButton";
import FolderContainers from "../components/FolderContainers";

import { TAB_FSA, TAB_CITY_GUIDE, TAB_GETTING_PAID } from "../common/constants";
import store from "../store/configureStore";
import { changeTab } from "../actions/tab";

import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
} from "../directories";
// import AuthSignup from './AuthSignup';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const mapStateToProps = state => ({
  authState: state.authState.authState
});

class LinkTabs extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      activeTab: store.getState().tab.activeTab,
      fsaFolders: [],
      cityFolders: [],
      workFolders: []
    };
  }

  async componentDidMount() {
    console.log("LinkTabs component is mounting");
  }

  handleTabChange = (event, activeTab) => {
    store.dispatch(changeTab(activeTab));
    this.setState({ activeTab });
  };

  reduceFolder = folder =>
    folder.reduce(
      (acc, next) => acc.concat({ name: next.name, type: next.type }),
      []
    );

  render() {
    const { classes } = this.props;
    const activeTab = this.state.activeTab;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={activeTab} onChange={this.handleTabChange}>
            <Tab label="FS-Apprenticeship" />
            <Tab label="City Guide" />
            <Tab label="Getting Paid" />
          </Tabs>
        </AppBar>
        {activeTab === TAB_FSA && (
          <FolderContainers
            folders={fullStackApprenticeship.reduce(
              (acc, next) =>
                acc.concat({
                  name: next.name,
                  type: next.type
                }),
              []
            )}
          />
        )}
        {activeTab === TAB_CITY_GUIDE && (
          <FolderContainers
            folders={cityByCity.reduce(
              (acc, next) =>
                acc.concat({
                  name: next.name,
                  type: next.type
                }),
              []
            )}
          />
        )}
        {activeTab === TAB_GETTING_PAID && (
          <FolderContainers
            folders={findingWork.reduce(
              (acc, next) =>
                acc.concat({
                  name: next.name,
                  type: next.type
                }),
              []
            )}
          />
        )}
        <Add />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(LinkTabs));