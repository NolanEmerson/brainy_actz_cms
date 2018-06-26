import React, {Component} from 'react';
import base from '../../base';

class Teaser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseLink: {
                room_options: {
                    background: ''
                }
            }
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}/walls/${this.props.title}`, {
            context: this,
            state: 'baseLink'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {

        console.log('Teaser state: ', this.state);
        
        return (
            <div className='roomBoard' style={{backgroundImage: `url(${this.state.baseLink.room_options.background})`}}>
                <h2>{this.props.title}</h2>
                <h2>{this.state.baseLink.description}</h2>
            </div>
        );
    }
}

export default Teaser;