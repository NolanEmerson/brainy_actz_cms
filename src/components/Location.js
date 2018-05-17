import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditModal from './EditModal';

class Location extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewTV = this.addNewTV.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        
        this.state = {
            baseLink: {
                walls: {}
            },
            newTV: '',
            editModal: false,
            editInfo: {
                location: '',
                screen: ''
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

    submitEditInfo(location, newScreen, originalScreen) {
        const newState = {...this.state};

        if(originalScreen !== newScreen){
            Object.defineProperty(newState.baseLink.walls, newScreen,
                Object.getOwnPropertyDescriptor(newState.baseLink.walls, originalScreen));
            delete newState.baseLink.walls[originalScreen];
        }

        console.log(newState);
        base.remove(`/locations/${this.props.match.params.location}/walls/${originalScreen}`);

        this.setState({
            ...newState,
            editModal: false
        });
    }

    addNewTV(e) {

        e.preventDefault();

        let {newTV} = this.state;

        let inputObject = {
            [`${newTV}`]: {
                current_view: '',
                options: ['text']
            }
        };

        this.setState({
            newTV: '',
            baseLink: {
                walls: {
                    ...inputObject
                }
            }
        });
    }
    
    render() {

        const wallMap = Object.keys(this.state.baseLink.walls).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)} className='locationItem'>
                <div>{item}</div>
                <div className="deleteButton">Del</div>
                <div className="editButton" onClick={(e) => this.openEditModal(e,item)}>Edit</div>
            </div>
        });
        
        return (
            <React.Fragment>
                {this.state.editModal && <EditModal closeEditModal={this.closeEditModal.bind(this)} editInfo={this.state.editInfo.screen} submitEditInfo={this.submitEditInfo.bind(this)} location={this.state.editInfo.location} />}
                <Header location={this.state.baseLink.location_name} nav={this.props} />
                <div className="mainBodyFlexContainer">
                    {wallMap}
                    <form onSubmit={this.addNewTV}>
                        <input type="text" value={this.state.newTV} onChange={this.handleInputChange} placeholder='New tv name' />
                        <button>Add tv</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Location;