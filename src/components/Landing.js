import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditModal from './EditModal';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.moveToLocation = this.moveToLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewLocation = this.addNewLocation.bind(this);
        this.openEditModal = this.openEditModal.bind(this);

        this.state = {
            baseLink: {},
            newLocation: '',
            editModal: false,
            editInfo: {
                location: '',
                location_name: ''
            }
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`/locations`, {
            context: this,
            state: 'baseLink'
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
                    current_view: '',
                    options: [
                        'text'
                    ],
                    display_text: {
                        text: {
                            title: 'Pacific Life',
                            subtitle: 'Team Building Day!'
                        }
                    }
                },
                Room: {
                    current_view: '',
                    options: [
                        'text'
                    ],
                    display_text: {
                        text: {
                            title: 'Pacific Life',
                            subtitle: 'Team Building Day!'
                        }
                    }
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
        });
    }

    openEditModal(e, location) {
        e.stopPropagation();

        const location_name = this.state.baseLink[`${location}`].location_name;

        this.setState({
            editModal: true,
            editInfo: {
                location,
                location_name
            }
        });
    }

    closeEditModal() {
        this.setState({
            editModal: false
        });
    }

    submitEditInfo(location, newName) {
        this.setState({
            baseLink: {
                [`${location}`]: {
                    location_name: newName
                }
            },
            editModal: false
        });
    }

    render() {

        const locationMap = Object.keys(this.state.baseLink).map( (item, index) => {
            const locationName = this.state.baseLink[`${item}`].location_name;
            return <div key={index} onClick={() => this.moveToLocation(item)} className='landingItem'>
                        <div>{locationName}</div>
                        <div className="deleteButton">Del</div>
                        <div className="editButton" onClick={(e) => this.openEditModal(e,item)}>Edit</div>
                    </div>
        });
        
        return (
            <React.Fragment>
                {this.state.editModal && <EditModal closeEditModal={this.closeEditModal.bind(this)} editInfo={this.state.editInfo.location_name} submitEditInfo={this.submitEditInfo.bind(this)} location={this.state.editInfo.location} />}
                <Header nav={this.props} />
                <div className="mainBodyFlexContainer">
                    {locationMap}
                    <form onSubmit={this.addNewLocation}>
                        <input type="text" value={this.state.newLocation} onChange={this.handleInputChange} placeholder='New location name' />
                        <button>Add location</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Landing;