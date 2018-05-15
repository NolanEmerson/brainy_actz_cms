import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Location extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewTV = this.addNewTV.bind(this);
        
        this.state = {
            wallNames: {
                walls: {}
            },
            newTV: ''
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.match.params.location}`, {
            context: this,
            state: 'wallNames'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    moveToLocation(item) {
        this.props.history.push(`/${this.props.match.params.location}/${item}`);
    }

    handleInputChange(e) {
        this.setState({
            newTV: e.target.value
        })
    }

    addNewTV(e) {

        e.preventDefault();

        let {newTV} = this.state;

        let inputObject = {
            [`${newTV}`]: {
                current_view: '',
                options: []
            }
        };

        this.setState({
            newTV: '',
            wallNames: {
                walls: {
                    ...inputObject
                }
            }
        });

        // base.push(`/locations/${this.props.match.params.location}/walls`, {data: inputObject});
    }
    
    render() {

        const wallMap = Object.keys(this.state.wallNames.walls).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)}>{item}</div>
        });
        
        return (
            <React.Fragment>
                <Header location={this.state.wallNames.location_name} nav={this.props} />
                {wallMap}
                <form onSubmit={this.addNewTV}>
                    <input type="text" value={this.state.newTV} onChange={this.handleInputChange} placeholder='New tv name' />
                    <button>Add tv</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Location;