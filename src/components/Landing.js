import React, {Component} from 'react';
import base from '../base';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.moveToLocation = this.moveToLocation.bind(this);

        this.state = {
            locationNames: []
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`/locations`, {
            context: this,
            state: 'locationsNames',
            asArray: true
        });

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
    
    moveToLocation(item) {
        console.log(item);
        this.props.history.push(`/${item}`);
    }

    render() {
        const locationMap = this.state.locationNames.map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)}>{item}</div>
        });

        return (
            <div>
                {locationMap}
            </div>
        );
    }
}

export default Landing;