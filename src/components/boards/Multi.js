import React, {Component} from 'react';
import '../../css/boards.css';
import base from '../../base';

import MultiModal from './MultiModal';

class Multi extends Component{

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.updateModal = this.updateModal.bind(this);

        this.state = {
            baseLink: {
                location_name: '',
                walls: {}
            },
            showModal: false,
            modalLocation: '',
            modalTitle: ''
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

    toggleModal(location, title) {
        const {showModal} = this.state;

        this.setState({
            showModal: !showModal
        });

        this.updateModal(location, title)
    }

    updateModal(location, title) {
        this.setState({
            modalLocation: location,
            modalTitle: title
        })
    }

    determineRooms() {

        if (this.state.baseLink.walls) {
            const allLocationScreens = Object.keys(this.state.baseLink.walls);

            const screensToDisplay = [];

            for (let i = 0; i < allLocationScreens.length; i++){
                if (this.state.baseLink.walls[`${allLocationScreens[i]}`].is_room){
                    screensToDisplay.push(allLocationScreens[i]);
                }
            }

            const mappedDisplay = screensToDisplay.map((item, index) => {
                return (
                    <div className='multiHolder' style={{backgroundImage: `url(${this.state.baseLink.walls[`${item}`].room_options.background})`, backgroundSize: 'cover'}} onClick={() => this.toggleModal(this.props.location, item)} key={index}>
                        <div>{item}</div>
                    </div>
                )
            });

            return mappedDisplay;
        }

    }

    render() {

        const {modalLocation, modalTitle} = this.state;

        return (
            <div className='multiFlexContainer'>
                {this.state.showModal && <MultiModal location={modalLocation} title={modalTitle} close={this.toggleModal.bind(this)} />}
                {this.determineRooms()}
            </div>
        );
    }
}

export default Multi;