	import React, { Component } from 'react';
	import {BrowserRouter as Router, Route} from 'react-router-dom';

	import Location from './Location';
	import Screen from './Screen';

	class App extends Component {
	constructor(props){
		super(props);

	}

	render() {

		return (
		<Router>
			<React.Fragment>
				<Route exact path='/' component={Location} />
				<Route path='/screen' component={Screen} />
			</React.Fragment>
		</Router>
		);
	}
	}

	export default App;
