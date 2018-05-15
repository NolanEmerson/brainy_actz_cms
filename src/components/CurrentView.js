import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import Red from './boards/Red';
import Green from './boards/Green';
import Blue from './boards/Blue';

class CurrentView extends Component {
    constructor(props){
        super(props);

        this.state = {
            current_view: {
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
            state: 'current_view'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {
        console.log('Props: ', this.props);
        console.log('State: ', this.state);
        
        const viewMap = Object.keys(this.state.current_view.walls[`${this.props.match.params.screen}`].current_view).map((item, index) => {
            let returnValue;
            switch (this.state.current_view.walls[`${this.props.match.params.screen}`].current_view){
                case 'red':
                    returnValue = <Red key={index} />;
                    break;
                case 'green':
                    returnValue = <Green key={index} />
                    break;
                case 'blue':
                    returnValue =  <Blue key={index} />
                    break;
                default:
                    returnValue = 'something broke'
            }
            return returnValue;
            // return <div key={index}>{`${item}: ${this.state.current_view[`${item}`]}`}</div>
        });

        return (
            <React.Fragment>
                <Header location={this.state.current_view.location_name} tv={this.props.match.params.screen} currentview='Current View' nav={this.props} />
                {viewMap}
            </React.Fragment>
        )
    }
}

export default CurrentView;