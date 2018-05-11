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
            current_view: {}
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}/walls/${this.props.match.params.screen}`, {
            context: this,
            state: 'current_view'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {

        const viewMap = Object.keys(this.state.current_view).map((item, index) => {
            let returnValue;
            switch (this.state.current_view[`${item}`]){
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
                <Header location={this.props.match.params.location} tv={this.props.match.params.screen} currentview='Current View' nav={this.props} />
                {viewMap}
            </React.Fragment>
        )
    }
}

export default CurrentView;