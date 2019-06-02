import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/configureStore";

import AppliedRoute from "./components/AppliedRoute";
// import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Home from "./containers/Home";
import LinkTabs from "./containers/LinkTabs";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import LinkComponent from "./components/LinkComponent";
import ToolsContainer from "./components/ToolsContainer";
import NewResource from "./containers/NewResource";
import ProcessResource from "./containers/ProcessResource";

export default ({ childProps }) => (
    <ConnectedRouter history={history}>
        <Switch>
            <AppliedRoute path="/" exact component={Home} props={childProps} />
            <AppliedRoute path="/login" component={Login} props={childProps} />
            <AppliedRoute path="/signup" component={Signup} props={childProps} />
            <AppliedRoute path="/profile" component={Profile} props={childProps} />
            <AppliedRoute path="/knowledge" component={LinkTabs} props={childProps} />
            <AppliedRoute path="/link/:id" component={LinkComponent} props={childProps} />
            <AppliedRoute path="/tool/:schema" component={ToolsContainer} props={childProps} />
            <AppliedRoute path='/review' exact component={ProcessResource} props={childProps} />
            <AppliedRoute path='/resource/new' exact component={NewResource} props={childProps} />
        </Switch>
    </ConnectedRouter>
);
