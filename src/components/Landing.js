import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.moveToLocation = this.moveToLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewLocation = this.addNewLocation.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.resetInputStyle = this.resetInputStyle.bind(this);

        this.state = {
            baseLink: {},
            newLocation: '',
            editModal: false,
            editInfo: {
                location: '',
                location_name: ''
            },
            deleteModal: false,
            deleteInfo : {
                location: '',
                location_name: ''
            },
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
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
        this.props.history.push(`/${item}`);
    }

    addNewLocation(e) {

        e.preventDefault();

        let {newLocation} = this.state

        if (newLocation === '') {
            this.setState({
                inputStyle: {
                    borderColor: 'red',
                    borderStyle: 'solid'
                }
            });
            return;
        }

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
                    },
                    is_room: false,
                    room_options: {
                        background: "https://i.pinimg.com/originals/b4/25/80/b42580335dda2ec9b66f645697a1e529.jpg",
                        video: "https://www.youtube.com/embed/4o5baMYWdtQ"
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
                    },
                    is_room: true,
                    room_options: {
                        background: "https://i.pinimg.com/originals/b4/25/80/b42580335dda2ec9b66f645697a1e529.jpg",
                        video: "https://www.youtube.com/embed/4o5baMYWdtQ"
                    }
                }
            }
        }

        this.setState({
            newLocation: '',
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
            }
        });
        base.push('/locations', {data: inputObject});
    }
    
    resetInputStyle() {
        this.setState({
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
            }
        });
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

    openDeleteModal(e, location) {
        e.stopPropagation();

        const location_name = this.state.baseLink[`${location}`].location_name;

        this.setState({
            deleteModal: true,
            deleteInfo: {
                location,
                location_name
            }
        });
    }

    closeDeleteModal() {
        this.setState({
            deleteModal: false
        });
    }

    deleteInfo(location) {
        base.remove(`locations/${location}`);
        this.setState({
            deleteModal: false
        });
    }

    render() {

        const locationMap = Object.keys(this.state.baseLink).map( (item, index) => {
            const locationName = this.state.baseLink[`${item}`].location_name;
            return <div key={index} onClick={() => this.moveToLocation(item)} className='landingItem'>
                        <div>{locationName}</div>
                        <div className="deleteButton" onClick={(e) => this.openDeleteModal(e,item)}><i className='fas fa-trash-alt'></i></div>
                        <div className="editButton" onClick={(e) => this.openEditModal(e,item)}><i className='fas fa-pencil-alt'></i></div>
                    </div>
        });
        
        return (
            <React.Fragment>
                {this.state.deleteModal && <DeleteModal closeDeleteModal={this.closeDeleteModal.bind(this)} displayItem={this.state.deleteInfo.location_name} itemToDelete={this.state.deleteInfo.location} deleteItem={this.deleteInfo.bind(this)} />}
                {this.state.editModal && <EditModal closeEditModal={this.closeEditModal.bind(this)} editInfo={this.state.editInfo.location_name} submitEditInfo={this.submitEditInfo.bind(this)} location={this.state.editInfo.location} />}
                <Header nav={this.props} />
                <div className="mainBodyFlexContainer">
                    {locationMap}
                    <form onSubmit={this.addNewLocation}>
                        <input style={this.state.inputStyle} type="text" value={this.state.newLocation} onChange={this.handleInputChange} onFocus={this.resetInputStyle} placeholder='New location name' />
                        <button>Add location</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Landing;