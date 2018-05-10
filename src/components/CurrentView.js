import React, {Component} from 'react';

import base from '../base';

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
            return <div key={index}>{`${item}: ${this.state.currentView[`${item}`]}`}</div>
        });

        return (
            <div>
                {viewMap}
            </div>
        )
    }
}

export default CurrentView;