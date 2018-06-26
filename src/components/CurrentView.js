import React, {Component} from 'react';
import base from '../base';

import Red from './boards/Red';
import Green from './boards/Green';
import Blue from './boards/Blue';
import Text from './boards/Text';
import Room from './boards/Room';
import Multi from './boards/Multi';
import Transition from './boards/Transition';
import Teaser from './boards/Teaser';

class CurrentView extends Component {
    constructor(props){
        super(props);

        this.state = {
            baseLink: {
                walls: {
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

    determineCurrentView() {
        if (this.state.baseLink.walls[`${this.props.match.params.screen}`]){
            let returnValue;
            switch (this.state.baseLink.walls[`${this.props.match.params.screen}`].current_view){
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
                    returnValue =  <Room title={this.props.match.params.screen} location={this.props.match.params.location} />
                    break;
                case 'multi':
                    returnValue = <Multi location={this.props.match.params.location} />
                    break;
                case 'transition':
                    returnValue = <Transition location={this.props.match.params.location} screen={this.props.match.params.screen} speed={this.state.baseLink.walls[`${this.props.match.params.screen}`].transition_options.speed}/>
                    break;
                case 'teaser':
                    returnValue = <Teaser title={this.props.match.params.screen} location={this.props.match.params.location} />
                    break;
                default:
                    returnValue = 'something broke'
            }
            return returnValue;
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="mainContainer">
                    {this.determineCurrentView()}
                </div>
            </React.Fragment>
        )
    }
}

export default CurrentView;