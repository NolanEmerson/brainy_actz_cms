import React, {Component} from 'react';
import base from '../../base';

class Teaser extends Component {
    constructor(props) {
        super(props);

        this.updateDisplayCount = this.updateDisplayCount.bind(this);
        this.retrieveDisplayRooms = this.retrieveDisplayRooms.bind(this);
        this.beginTimer = this.beginTimer.bind(this);

        this.state = {
            baseLink: {
                walls: {}
            },
            currentDisplay: 0,
            roomsToDisplay: []
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}`, {
            context: this,
            state: 'baseLink'
        });
        
        setTimeout(this.beginTimer, 10);

    }

    beginTimer() {
        this.setState({
            roomsToDisplay: this.retrieveDisplayRooms()
        }, () => {
            setInterval(this.updateDisplayCount, 5000);
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    updateDisplayCount() {
        let {currentDisplay} = this.state;

        if (this.state.currentDisplay >= this.state.roomsToDisplay.length-1) {
            currentDisplay = 0;
        } else {
            currentDisplay++;
        }

        this.setState({
            currentDisplay
        });        
    }

    retrieveDisplayRooms() {
        const wallKeys = Object.keys(this.state.baseLink.walls);
        const roomKeys = [];

        for (let i=0; i<wallKeys.length; i++) {
            if (this.state.baseLink.walls[`${wallKeys[i]}`].is_room) {
                roomKeys.push(wallKeys[i]);
            }
        }

        // const wallMap = roomKeys.map((item, index) => {
        //     return (
        //         <div key={index} className='teaserItem' style={{backgroundImage: `url(${this.state.baseLink.walls[`${item}`].room_options.background})`}}>
        //             <div>{item}</div>
        //             <div>{this.state.baseLink.walls[`${item}`].description}</div>
        //         </div>
        //     );
        // });

        return roomKeys;
        
    }

    setRotationClass(index) {

        const {currentDisplay} = this.state;
        const lastRoom = this.state.roomsToDisplay.length -1;

        if (index === currentDisplay) {
            return 'currentItem'
        } else if (currentDisplay === lastRoom && index === 0) {
            return 'rightItem hide'
        } else if (currentDisplay === 0 && index === lastRoom) {
            return 'leftItem'
        } else if (index > currentDisplay) {
            return 'rightItem hide'
        } else if (index < currentDisplay) {
            return 'leftItem'
        }
    }

    render() {

        const wallMap = this.state.roomsToDisplay.map((item, index) => {
            return (
                <div key={index} className={`teaserItem ${this.setRotationClass(index)}`} style={{backgroundImage: `url(${this.state.baseLink.walls[`${item}`].room_options.background})`}}>
                    <div>{item}</div>
                    <div>{this.state.baseLink.walls[`${item}`].description}</div>
                </div>
            );
        });
        
        return (
            <div className='roomBoard'
            // style={{backgroundImage: `url(${this.state.baseLink.room_options.background})`}}
            >
                {/* {wallMap[this.state.currentDisplay]} */}
                {wallMap}
            </div>
        );
    }
}

export default Teaser;