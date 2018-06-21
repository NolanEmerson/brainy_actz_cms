import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditBoard from './EditBoard';
import EditTransition from './EditTransition';

class Location extends Component {
    constructor(props){
        super(props);

        this.moveToLocation = this.moveToLocation.bind(this);
        this.changeCurrentView = this.changeCurrentView.bind(this);
        this.addNewScreen = this.addNewScreen.bind(this);
        this.submitEditInfo = this.submitEditInfo.bind(this);
        
        this.state = {
            baseLink: {
                walls: {}
            },
            editBoard: false,
            editInfo: {
                editFirstItem: '',
                editSecondItem: ''
            },
            itemToEdit: '',
            editTransition: false
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

    moveToLocation() {
        this.props.history.push(`/${this.props.match.params.location}/${this.props.match.params.screen}/current`);
    }

    changeCurrentView(item) {
        this.setState({
            baseLink: {
                walls: {
                    [`${this.props.match.params.screen}`]: {
                        current_view: item
                    }
                }
            }
        });
    }

    addNewScreen() {
        this.props.history.push(`/${this.props.match.params.location}/${this.props.match.params.screen}/add-board`);
    }

    openEditBoard(e, editItem){
        e.stopPropagation();

        let editFirstItem = '';
        let editSecondItem = '';

        if (editItem === 'text') {
            editFirstItem = this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${editItem}`].title;
            editSecondItem = this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${editItem}`].subtitle;
        } else if (editItem === 'room') {
            editFirstItem = this.state.baseLink.walls[`${this.props.match.params.screen}`].room_options.background;
            editSecondItem = this.state.baseLink.walls[`${this.props.match.params.screen}`].room_options.video;
        }
        

        this.setState({
            editBoard: true,
            editInfo: {
                editFirstItem, editSecondItem
            },
            itemToEdit: editItem
        });
    }

    closeEditBoard() {
        this.setState({
            editBoard: false
        });
    }

    submitEditInfo(firstItem, secondItem, itemToEdit) {
        const newState = {...this.state};

        if (itemToEdit === 'text') {
            newState.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${itemToEdit}`].title = firstItem;
            newState.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${itemToEdit}`].subtitle = secondItem;
        } else if (itemToEdit === 'room') {
            newState.baseLink.walls[`${this.props.match.params.screen}`].room_options.background = firstItem;
            newState.baseLink.walls[`${this.props.match.params.screen}`].room_options.video = secondItem;
        }

        this.setState({
            ...newState,
            editBoard: false
        });
    }

    openTransitionBoard(e) {
        e.stopPropagation();

        this.setState({
            editTransition: true
        });
    }

    closeTransitionBoard() {
        this.setState({
            editTransition: false
        });
    }

    submitTransitionEdit(speed, boards) {
        this.setState({
            baseLink: {
                walls: {
                    [`${this.props.match.params.screen}`]: {
                        transition_options: {
                            boards, speed
                        }
                    }
                }
            },
            editTransition: false
        })
    }

    determineThumbnail(current) {
        let returnValue;
        switch (current){
            case 'red':
                returnValue = 'Red'
                break;
            case 'green':
                returnValue = 'Green'
                break;
            case 'blue':
                returnValue =  'Blue'
                break;
            case 'text':
                returnValue =  'Text board'
                // <Text title={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.title} subtitle={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.subtitle} />
                break;
            case 'room':
                returnValue =  'Room board'
                // <Room title={this.props.match.params.screen} location={this.state.baseLink.location_name} />
                break;
            case 'multi':
                returnValue = 'Multi board'
                // <Multi location={this.props.match.params.location} />
                break;
            case 'transition':
                returnValue = 'Transition board'
                break;
            default:
                returnValue = 'No current display'
        }
        return returnValue;
    }
    
    render() {

        const {current_view, options} = this.state.baseLink.walls[`${this.props.match.params.screen}`] || '';

        let optionsMap;

        if(options) {
            optionsMap = options.map( (item, index) => {
                return (
                    <div key={index} onClick={() => this.changeCurrentView(item)} className='boardViewItem'>
                        <div className="boardViewThumb">
                            <h1>{this.determineThumbnail(item)}</h1>
                        </div>
                        {item === 'text' || item === 'room' ? <div className="boardEditButton" onClick={e => this.openEditBoard(e, item)}><i className='fas fa-pencil-alt'></i></div> : ''}
                        {item === 'transition' ? <div className='boardEditButton' onClick={(e) => this.openTransitionBoard(e)}><i className='fas fa-pencil-alt'></i></div> : ''}
                    </div>
                )
            });
        }

        return (
            <React.Fragment>
                {this.state.editBoard && <EditBoard closeEditBoard={this.closeEditBoard.bind(this)} editInfo={this.state.editInfo} submitEditInfo={this.submitEditInfo} itemToEdit={this.state.itemToEdit} />}
                {this.state.editTransition && <EditTransition closeTransitionBoard={this.closeTransitionBoard.bind(this)} submitTransitionEdit={this.submitTransitionEdit.bind(this)} currentBoards={this.state.baseLink.walls[`${this.props.match.params.screen}`].transition_options.boards} speed={this.state.baseLink.walls[`${this.props.match.params.screen}`].transition_options.speed} />}
                <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} nav={this.props} />
                <div className="mainBodyContainer">
                    <div>
                        Current View: <br />
                        <div className="boardViewItem" onClick={this.moveToLocation}>
                            <div className="boardViewThumb">
                                <h1>{this.determineThumbnail(current_view)}</h1>
                            </div>
                            {current_view === 'text' || current_view === 'room' ? <div className="boardEditButton" onClick={e => this.openEditBoard(e, current_view)}><i className='fas fa-pencil-alt'></i></div> : ''}
                        </div>
                    </div>
                    {options && <div>
                        Change current view:<br />
                        {optionsMap}
                    </div>}
                    <button onClick={this.addNewScreen}>Add new screen options</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Location;