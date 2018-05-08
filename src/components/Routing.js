import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Location from './Location';
import Screen from './Screen';

class Routing extends Component {
constructor(props){
    super(props);

}

render() {

    return (
    <Router>
        <Switch>
            <Route exact path='/' component={Location} />
            <Route path='/screen' component={Screen} />
        </Switch>
    </Router>
    );
}
}

export default Routing;
