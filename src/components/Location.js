import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Location extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            wallNames: {
                walls: {}
            }
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}`, {
            context: this,
            state: 'wallNames'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    moveToLocation(item) {
        this.props.history.push(`/${this.props.match.params.location}/${item}`);
    }
    
    render() {

        const wallMap = Object.keys(this.state.wallNames.walls).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)}>{item}</div>
        });
        
        return (
            <React.Fragment>
                <Header location={this.state.wallNames.location_name} nav={this.props} />
                {wallMap}
            </React.Fragment>
        );
    }
}

export default Location;