import React, {Component} from 'react';
import base from '../../base';

class Teaser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseLink: {
                walls: {}
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

    render() {

        console.log('Teaser state: ', this.state);

        const wallKeys = Object.keys(this.state.baseLink.walls);
        const roomKeys = [];

        for (let i=0; i<wallKeys.length; i++) {
            if (this.state.baseLink.walls[`${wallKeys[i]}`].is_room) {
                roomKeys.push(wallKeys[i]);
            }
        }

        const wallMap = roomKeys.map((item, index) => {
            return <div key={index}>{item}</div>
        });
        
        return (
            <div className='roomBoard'
            // style={{backgroundImage: `url(${this.state.baseLink.room_options.background})`}}
            >
                <h2>{this.props.title}</h2>
                <h2>wip</h2>
                {wallMap}
            </div>
        );
    }
}

export default Teaser;