import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Landing from './Landing';
import Location from './Location';
import CurrentView from './CurrentView';

class Routing extends Component {

render() {

    return (
    <Router>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/:location' component={Location} />
            <Route exact path='/:location/:screen' component={CurrentView} />
        </Switch>
    </Router>
    );
}
}

export default Routing;
