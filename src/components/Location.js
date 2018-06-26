import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

class Location extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewTV = this.addNewTV.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.resetInputStyle = this.resetInputStyle.bind(this);
        
        this.state = {
            baseLink: {
                walls: {}
            },
            newTV: '',
            editModal: false,
            editInfo: {
                location: '',
                screen: ''
            },
            deleteModal: false,
            deleteInfo: {
                location: '',
                screen: ''
            },
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
            }
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}`, {
            context: this,
            state: 'baseLink'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    moveToLocation(item) {
        this.props.history.push(`/${this.props.match.params.location}/${item}`);
    }

    handleInputChange(e) {
        this.setState({
            newTV: e.target.value
        })
    }

    openEditModal(e, screen) {
        e.stopPropagation();

        const location = this.state.baseLink[`${this.props.match.params.location}`];

        this.setState({
            editModal: true,
            editInfo: {
                location,
                screen
            }
        });
    }

    closeEditModal() {
        this.setState({
            editModal: false
        });
    }

    submitEditInfo(location, newScreen, originalScreen, isRoom) {
        const newState = {...this.state};

        newState.baseLink.walls[`${originalScreen}`].is_room = isRoom;

        if(originalScreen !== newScreen){
            Object.defineProperty(newState.baseLink.walls, newScreen,
                Object.getOwnPropertyDescriptor(newState.baseLink.walls, originalScreen));
            delete newState.baseLink.walls[originalScreen];
        }

        base.remove(`/locations/${this.props.match.params.location}/walls/${originalScreen}`);

        this.setState({
            ...newState,
            editModal: false
        });
    }

    addNewTV(e) {

        e.preventDefault();

        let {newTV} = this.state;

        if (newTV === '') {
            this.setState({
                inputStyle: {
                    borderColor: 'red',
                    borderStyle: 'solid'
                }
            });
            return;
        }

        let inputObject = {
            [`${newTV}`]: {
                current_view: '',
                options: ['text'],
                display_text: {
                    text: {
                        title: 'Pacific Life',
                        subtitle: 'Team Building Day!'
                    }
                },
                is_room: true,
                room_options: {
                    background: "",
                    video: ""
                },
                transition_options: {
                    boards: ['text'],
                    speed: 30
                }
            }
        };

        this.setState({
            newTV: '',
            baseLink: {
                walls: {
                    ...inputObject
                }
            },
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
            }
        });
    }

    resetInputStyle() {
        this.setState({
            inputStyle: {
                borderColor: '#afafaf',
                borderStyle: 'inset'
            }
        });
    }

    openDeleteModal(e, screen) {
        e.stopPropagation();

        const location = this.props.match.params.location;

        this.setState({
            deleteModal: true,
            deleteInfo: {
                location,
                screen
            }
        });
    }

    closeDeleteModal() {
        this.setState({
            deleteModal: false
        });
    }

    deleteInfo(location, screen) {
        base.remove(`locations/${location}/walls/${screen}`);
        this.setState({
            deleteModal: false
        });
    }
    
    render() {

        const wallMap = Object.keys(this.state.baseLink.walls).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)} className='locationItem'>
                <div>{item}</div>
                <div className="deleteButton" onClick={(e) => this.openDeleteModal(e,item)}><i className='fas fa-trash-alt'></i></div>
                <div className="editButton" onClick={(e) => this.openEditModal(e,item)}><i className='fas fa-pencil-alt'></i></div>
            </div>
        });
        
        return (
            <React.Fragment>
                {this.state.deleteModal && <DeleteModal closeDeleteModal={this.closeDeleteModal.bind(this)} displayItem={this.state.deleteInfo.screen} itemToDelete={this.state.deleteInfo.location} deleteItem={this.deleteInfo.bind(this)} />}
                {this.state.editModal && <EditModal closeEditModal={this.closeEditModal.bind(this)} editInfo={this.state.editInfo.screen} submitEditInfo={this.submitEditInfo.bind(this)} location={this.state.editInfo.location} isRoom={this.state.baseLink.walls[`${this.state.editInfo.screen}`].is_room} wallboard={true} />}
                <Header location={this.state.baseLink.location_name} nav={this.props} />
                <div className="mainBodyFlexContainer">
                    {wallMap}
                    <form onSubmit={this.addNewTV}>
                        <input type="text" style={this.state.inputStyle} onFocus={this.resetInputStyle} value={this.state.newTV} onChange={this.handleInputChange} placeholder='New tv name' />
                        <button>Add tv</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Location;