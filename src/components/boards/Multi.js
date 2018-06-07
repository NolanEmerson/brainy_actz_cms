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
                        <div className='multiHolder'>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Great Car Heist' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='Mystery at the Lost Point Lodge' location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'San Diego, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder'>
                            <Room title='The Barbershop Backlash' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Great Carnival Challenge' location={location} />
                        </div>
                    </React.Fragment>
                );
            case 'Temecula, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder'>
                            <Room title='The Great Pirate Escape' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Legacy' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Lost Jungle Safari' location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'Reno, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder'>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Legacyc' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title="Santa's Cabin" location={location} />
                        </div>                  
                    </React.Fragment>
                );
            case 'Las Vegas, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder'>
                            <Room title='The Secrets of The Master' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Legacy' location={location} />
                        </div>
                        <div className='multiHolder'>
                            <Room title='The Great Car Heist' location={location} />
                        </div>                  
                        <div className='multiHolder'>
                            <Room title='High Roller' location={location} />
                        </div>  
                        <div className='multiHolder'>
                            <Room title="The Smokin' Gun" location={location} />
                        </div>  
                        <div className='multiHolder'>
                            <Room title='Backstage VIP Pass' location={location} />
                        </div>  
                    </React.Fragment>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className='multiFlexContainer'>
                {this.determineRooms(this.state.baseLink.location_name)}
            </div>
        );
    }
}

export default Multi;