import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.moveToLocation = this.moveToLocation.bind(this);
        this.editInput = this.editInput.bind(this);
        this.addItem = this.addItem.bind(this);

        this.state = {
            locationNames: {},
            newItem: ''
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`/locations`, {
            context: this,
            state: 'locationNames'
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    moveToLocation(item) {
        console.log(item);
        this.props.history.push(`/${item}`);
    }

    addItem(e) {

        const {newItem} = this.state

        e.preventDefault();
        this.setState({
            locationNames: {
                newItem
            },
            newItem: ''
        });
    }

    editInput(e) {
        this.setState({
            newItem: e.target.value
        })
    }

    render() {
        const locationMap = Object.keys(this.state.locationNames).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)}>{item}</div>
        });
        
        return (
            <React.Fragment>
                <Header />
                {locationMap}
                <form onSubmit={this.addItem}>
                    <input type="text" value={this.state.newItem} onChange={this.editInput} placeholder='New location name' />
                    <button>Add location</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Landing;