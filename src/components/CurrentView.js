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
            currentView: {}
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}/${this.props.match.params.screen}`, {
            context: this,
            state: 'currentView'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {

        const viewMap = Object.keys(this.state.currentView).map((item, index) => {
            switch (this.state.currentView[`${item}`]){
                case 'red':
                    return <Red />
                case 'green':
                    return <Green />
                case 'blue':
                    return <Blue />
            }
            // return <div key={index}>{`${item}: ${this.state.currentView[`${item}`]}`}</div>
        });

        return (
            <React.Fragment>
                <Header location={this.props.match.params.location} tv={this.props.match.params.screen} nav={this.props} />
                {viewMap}
            </React.Fragment>
        )
    }
}

export default CurrentView;