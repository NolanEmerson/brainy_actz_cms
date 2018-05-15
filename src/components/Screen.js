import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Location extends Component {
    constructor(props){
        super(props);

        this.moveToLocation = this.moveToLocation.bind(this);
        this.changeCurrentView = this.changeCurrentView.bind(this);
        this.addNewScreen = this.addNewScreen.bind(this);
        
        this.state = {
            baseLink: {
                walls: {
                    Lobby: {
                        current_view: '',
                        options: []
                    },
                    Room: {
                        current_view: '',
                        options: []
                    }
                }
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
    
    render() {
        console.log('Props: ', this.props);
        console.log('State: ', this.state);

        const {current_view, options} = this.state.baseLink.walls[`${this.props.match.params.screen}`];

        let optionsMap;

        if(options) {
            optionsMap = options.map( (item, index) => {
                return (
                    <div key={index} onClick={() => this.changeCurrentView(item)}>
                        {item}
                    </div>
                )
            });
        }

        return (
            <React.Fragment>
                <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} nav={this.props} />
                <div onClick={this.moveToLocation}>Current View: {current_view}</div>
                {options && <div>
                    Change current view:<br />
                    {optionsMap}
                </div>}
                <button onClick={this.addNewScreen}>Add new screen options</button>
            </React.Fragment>
        );
    }
}

export default Location;