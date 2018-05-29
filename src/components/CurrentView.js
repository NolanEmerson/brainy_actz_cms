import React, {Component} from 'react';
import base from '../base';

// import Header from './Header';
import Red from './boards/Red';
import Green from './boards/Green';
import Blue from './boards/Blue';
import Text from './boards/Text';
import Room from './boards/Room';

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
                    returnValue =  <Room title={this.props.match.params.screen} />
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
                {/* <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} currentview='Current View' nav={this.props} /> */}
                <div className="mainContainer">
                    {this.determineCurrentView()}
                </div>
            </React.Fragment>
        )
    }
}

export default CurrentView;