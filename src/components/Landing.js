import React, {Component} from 'react';
import base from '../base';

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

		// base.fetch(`/locations`, { context: this }).then( response => {
        //     console.log('Response: ', response);
        //     this.setupLocations(response);
        // });
    }

	// setupLocations(locations) {
	// 	const locationNames = Object.keys(locations);

	// 	this.setState({
	// 	    locationNames
	// 	});
    // }
    
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
            <div>
                {locationMap}
                <form onSubmit={this.addItem}>
                    <input type="text" value={this.state.newItem} onChange={this.editInput}/>
                    <button>Click me</button>
                </form>
            </div>
        );
    }
}

export default Landing;