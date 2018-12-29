import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/configureStore";

import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import LinkTabs from "./containers/LinkTabs";
import LinkComponent from "./components/LinkComponent";
import ToolsContainer from "./components/ToolsContainer";
import AccountContainer from "./containers/AccountContainer";

export default () => (
    <ConnectedRouter history={history}>
        <Switch>
            <AppliedRoute path="/" exact component={LinkTabs} />
            <AppliedRoute path="/signup" exact component={Signup} />
            <AppliedRoute path="/login" exact component={Login} />
            <AppliedRoute
                path="/fancyLogin"
                exact
                component={AccountContainer}
            />
            <AppliedRoute path="/link/:id" component={LinkComponent} />
            <Route path="/tool/:schema" component={ToolsContainer} />
        </Switch>
    </ConnectedRouter>
);
