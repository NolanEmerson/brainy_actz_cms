import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

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

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    moveToLocation(item) {
        console.log(item);
        this.props.history.push(`/${this.props.match.params.location}/${item}`);
    }
    
    render() {
        const wallMap = Object.keys(this.state.wallNames).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)}>{item}</div>
        });

        return (
            <React.Fragment>
                <Header location={this.props.match.params.location} />
                {wallMap}
            </React.Fragment>
        );
    }
}

export default Location;