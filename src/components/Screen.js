import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Location extends Component {
    constructor(props){
        super(props);

        this.moveToLocation = this.moveToLocation.bind(this);
        this.changeCurrentView = this.changeCurrentView.bind(this);
        
        this.state = {
            screenInfo: {}
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}/walls/${this.props.match.params.screen}`, {
            context: this,
            state: 'screenInfo'
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
            screenInfo: {
                current_view: item
            }
        });
    }
    
    render() {
        console.log('Props: ', this.props);
        console.log('State: ', this.state);

        const {current_view, options} = this.state.screenInfo;

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
                <Header location={this.props.match.params.location} nav={this.props} />
                <div onClick={this.moveToLocation}>Current View: {current_view}</div>
                {options && <div>
                    Change current view:<br />
                    {optionsMap}
                </div>}
            </React.Fragment>
        );
    }
}

export default Location;