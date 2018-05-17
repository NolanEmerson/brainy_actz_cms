import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
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
        
        this.state = {
            baseLink: {
                walls: {}
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

    determineCurrentThumb(current) {
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
                    returnValue = 'something broke'
            }
            return returnValue;
    }
    
    render() {

        const {current_view, options} = this.state.baseLink.walls[`${this.props.match.params.screen}`] || '';

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
                <div className="mainBodyContainer">
                    <div onClick={this.moveToLocation}>Current View:
                        <div className="currentViewItem">
                            {current_view}
                            <div className="currentViewThumb">
                                {this.determineCurrentThumb(current_view)}
                            </div>
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