import React, {Component} from 'react';
import base from '../base';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            locationNames: []
        }
    }

    componentDidMount() {
		base.fetch(`/locations`, { context: this }).then( response => {
		console.log('Response: ', response);
		this.setupLocations(response);
		});
	}

	setupLocations(locations) {
		const locationNames = Object.keys(locations);

		this.setState({
		locationNames
		});
	}

    render() {
        const locationMap = this.state.locationNames.map( (item, index) => {
            return <div key={index}>{item}</div>
        });

        return (
            <div>
                {locationMap}
            </div>
        );
    }
}

export default Landing;