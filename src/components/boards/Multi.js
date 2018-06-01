import React, {Component} from 'react';
import '../../css/boards.css';
import base from '../../base';

import Room from './Room';

class Multi extends Component{

    constructor(props){
        super(props);

        this.state = {
            baseLink: {
                location_name: ''
            }
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}`, {
            context: this,
            state: 'baseLink'
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    determineRooms(location) {
        switch (location) {
            case 'Irvine, CA':
                return (
                    <React.Fragment>
                        <Room title='The Secrets of The Master' location={location} />
                        <Room title='The Great Car Heist' location={location} />
                        <Room title='Mystery at the Lost Point Lodge' location={location} />
                    </React.Fragment>
                )
        }
    }

    render() {
        return (
            <div>{this.determineRooms(this.state.baseLink.location_name)}</div>
        );
    }
}

export default Multi;