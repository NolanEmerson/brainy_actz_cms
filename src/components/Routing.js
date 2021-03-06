import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Landing from './Landing';
import Location from './Location';
import Screen from './Screen';
import CurrentView from './CurrentView';
import AddBoard from './AddBoard';

class Routing extends Component {

render() {

    return (
    <Router>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/:location' component={Location} />
            <Route exact path='/:location/:screen' component={Screen} />
            <Route exact path='/:location/:screen/current' component={CurrentView} />
            <Route exact path='/:location/:screen/add-board' component={AddBoard} />
        </Switch>
    </Router>
    );
}
}

export default Routing;
