import React, {Component} from 'react';
import '../../css/boards.css';
import base from '../../base';

import Room from './Room';
import MultiModal from './MultiModal';

class Multi extends Component{

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.updateModal = this.updateModal.bind(this);

        this.state = {
            baseLink: {
                location_name: ''
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

    determineRooms(location) {
        switch (location) {
            case 'Irvine, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Great Car Heist')}>
                            <Room title='The Great Car Heist' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'Mystery at the Lost Point Lodge')}>
                            <Room title='Mystery at the Lost Point Lodge' location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'San Diego, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Barbershop Backlash')}>
                            <Room title='The Barbershop Backlash' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Great Carnival Challenge')}>
                            <Room title='The Great Carnival Challenge' location={location} />
                        </div>
                    </React.Fragment>
                );
            case 'Temecula, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Great Pirate Escape')}>
                            <Room title='The Great Pirate Escape' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Legacy')}>
                            <Room title='The Legacy' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Lost Jungle Safari')}>
                            <Room title='The Lost Jungle Safari' location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'Reno, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Legacy')}>
                            <Room title='The Legacy' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, "Santa's Cabin")}>
                            <Room title="Santa's Cabin" location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'Las Vegas, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Legacy')}>
                            <Room title='The Legacy' location={location} />
                        </div>
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'The Great Car Heist')}>
                            <Room title='The Great Car Heist' location={location} />
                        </div>                  
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'High Roller')}>
                            <Room title='High Roller' location={location} />
                        </div>  
                        <div className='multiHolder' onClick={() => this.toggleModal(location, "The Smokin' Gun")}>
                            <Room title="The Smokin' Gun" location={location} />
                        </div>  
                        <div className='multiHolder' onClick={() => this.toggleModal(location, 'Backstage VIP Pass')}>
                            <Room title='Backstage VIP Pass' location={location} />
                        </div>  
                    </React.Fragment>
                );
            default:
                return null;
        }
    }

    render() {

        const {modalLocation, modalTitle} = this.state;

        return (
            <div className='multiFlexContainer'>
                {this.state.showModal && <MultiModal location={modalLocation} title={modalTitle} close={this.toggleModal.bind(this)} />}
                {this.determineRooms(this.state.baseLink.location_name)}
            </div>
        );
    }
}

export default Multi;