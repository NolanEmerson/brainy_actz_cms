import React, {Component} from 'react';
import base from '../base';

class Location extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            wallNames: []
        }
    }

    componentDidMount() {
		base.fetch(`/locations`, { context: this }).then( response => {
		console.log('Wall response: ', response);
		this.setupWalls(response['Irvine, CA']);
		});
	}

	setupWalls(walls) {
		const wallNames = Object.keys(walls);

		this.setState({
		wallNames
		});
	}

    render() {
        const wallMap = this.state.wallNames.map( (item, index) => {
            return <div key={index}>{item}</div>
        });

        return (
            <div>
                {wallMap}
            </div>
        );
    }
}

export default Location;