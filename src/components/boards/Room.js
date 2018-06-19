import React, {Component} from 'react';
import '../../css/boards.css';
import base from '../../base';

class Room extends Component {

    constructor(props){
        super(props);

        this.state = {
            baseLink: {
                room_options: {
                    background: '',
                    video: ''
                }
            }
        };
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

        return (
            <div className="roomBoard" style={{backgroundImage: `url(${this.state.baseLink.room_options.background})`}}>
                <h1 className="roomBoardTitle">{this.props.title}</h1>
                <iframe src={this.state.baseLink.room_options.video} frameBorder="0" style={{width: '39.3%', height: '60%'}} title='Room video' allowFullScreen ></iframe>
            </div>
        );
    }
}

export default Room;