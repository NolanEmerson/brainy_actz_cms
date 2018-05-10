import React, {Component} from 'react';
import base from '../base';

class Location extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            wallNames: {}
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}`, {
            context: this,
            state: 'wallNames'
        });
    }
    
    render() {
        const wallMap = Object.keys(this.state.wallNames).map( (item, index) => {
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