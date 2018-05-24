import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import EditBoard from './EditBoard';
import Red from './boards/Red';
import Green from './boards/Green';
import Blue from './boards/Blue';
import Text from './boards/Text';
import Room from './boards/Room';

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
                editTitle: '',
                editSubtitle: ''
            },
            itemToEdit: ''
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

        const editTitle = this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${editItem}`].title;
        const editSubtitle = this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${editItem}`].subtitle;

        this.setState({
            editBoard: true,
            editInfo: {
                editTitle, editSubtitle
            },
            itemToEdit: editItem
        });
    }

    closeEditBoard() {
        this.setState({
            editBoard: false
        });
    }

    submitEditInfo(title, subtitle) {
        const newState = {...this.state};

        newState.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${this.state.itemToEdit}`].title = title;
        newState.baseLink.walls[`${this.props.match.params.screen}`].display_text[`${this.state.itemToEdit}`].subtitle = subtitle;

        this.setState({
            ...newState,
            editBoard: false
        });
    }

    determineThumbnail(current) {
        let returnValue;
        switch (current){
            case 'red':
                returnValue = <Red />;
                break;
            case 'green':
                returnValue = <Green />
                break;
            case 'blue':
                returnValue =  <Blue />
                break;
            case 'text':
                returnValue =  <Text title={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.title} subtitle={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.subtitle} />
                break;
            case 'room':
                returnValue =  <Room />
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
                        {item}
                        <div className="boardViewThumb">
                            {this.determineThumbnail(item)}
                        </div>
                        {item === 'text' ? <div className="boardEditButton" onClick={e => this.openEditBoard(e, item)}><i className='fas fa-pencil-alt'></i></div> : ''}
                    </div>
                )
            });
        }

        return (
            <React.Fragment>
                {this.state.editBoard && <EditBoard closeEditBoard={this.closeEditBoard.bind(this)} editInfo={this.state.editInfo} submitEditInfo={this.submitEditInfo} />}
                <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} nav={this.props} />
                <div className="mainBodyContainer">
                    <div>Current View:
                        <div className="boardViewItem" onClick={this.moveToLocation}>
                            {current_view}
                            <div className="boardViewThumb">
                                {this.determineThumbnail(current_view)}
                            </div>
                            {current_view === 'text' ? <div className="boardEditButton" onClick={e => this.openEditBoard(e, current_view)}><i className='fas fa-pencil-alt'></i></div> : ''}
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