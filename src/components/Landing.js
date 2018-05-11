import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.moveToLocation = this.moveToLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewLocation = this.addNewLocation.bind(this);

        this.state = {
            locationNames: {},
            newLocation: ''
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`/locations`, {
            context: this,
            state: 'locationNames'
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    moveToLocation(item) {
        console.log(item);
        this.props.history.push(`/${item}`);
    }

    addNewLocation(e) {

        e.preventDefault();

        let {newLocation} = this.state

        let inputObject = {
            location_name: newLocation,
            walls: {
                Lobby: {
                    current_view: 'red',
                    options: [
                        'red',
                        'green',
                        'blue'
                    ]
                },
                Room: {
                    current_view: 'red',
                    options: [
                        'red',
                        'green',
                        'blue'
                    ]
                }
            }
        }

        this.setState({
            newLocation: ''
        });
        base.push('/locations', {data: inputObject});
    }

    handleInputChange(e) {
        this.setState({
            newLocation: e.target.value
        })
    }

    render() {

        const locationMap = Object.keys(this.state.locationNames).map( (item, index) => {
            const locationName = this.state.locationNames[`${item}`].location_name;
            return <div key={index} onClick={() => this.moveToLocation(item)}>{locationName}</div>
        });
        
        return (
            <React.Fragment>
                <Header nav={this.props} />
                {locationMap}
                <form onSubmit={this.addNewLocation}>
                    <input type="text" value={this.state.newLocation} onChange={this.handleInputChange} placeholder='New location name' />
                    <button>Add location</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Landing;