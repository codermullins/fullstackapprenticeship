import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Add from '../components/NewResourceButton';
import FolderContainers from "../components/FolderContainers";
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
})

class LinkTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            fsaFolders: [],
            cityFolders: [],
            workFolders: [],
            // authState : ''
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    reduceFolder = folder =>
        folder.reduce(
            (acc, next) => acc.concat({ name: next.name, type: next.type }),
            []
        );

    // changeAuthState = nextAuthState => {
    //     this.setState({ authState: nextAuthState })
    // }

    render() {
        const { classes, authState } = this.props;
        const { value } = this.state;
        console.log('state', authState)
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="FS-Apprenticeship" />
                        <Tab label="City Guide" />
                        <Tab label="Getting Paid" />
                    </Tabs>
                </AppBar>
                {/* <AuthSignup changeAuthState={this.props.changeAuthState} /> */}
                {value === 0 && (
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
                {value === 1 && (
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
                {value === 2 && (
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
                {/* { authState === 'signedIn' ? <Add /> : null } */}
\            </div>
        );
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(LinkTabs));
