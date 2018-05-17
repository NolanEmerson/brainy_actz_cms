import React, {Component} from 'react';
import base from '../base';

import Header from './Header';

class Location extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewTV = this.addNewTV.bind(this);
        
        this.state = {
            baseLink: {
                walls: {}
            },
            newTV: ''
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
                options: ['text']
            }
        };

        this.setState({
            newTV: '',
            baseLink: {
                walls: {
                    ...inputObject
                }
            }
        });
    }
    
    render() {

        const wallMap = Object.keys(this.state.baseLink.walls).map( (item, index) => {
            return <div key={index} onClick={() => this.moveToLocation(item)} className='locationItem'>
                <div>{item}</div>
                <div className="deleteButton">Del</div>
                <div className="editButton">Edit</div>
            </div>
        });
        
        return (
            <React.Fragment>
                <Header location={this.state.baseLink.location_name} nav={this.props} />
                <div className="mainBodyFlexContainer">
                    {wallMap}
                    <form onSubmit={this.addNewTV}>
                        <input type="text" value={this.state.newTV} onChange={this.handleInputChange} placeholder='New tv name' />
                        <button>Add tv</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Location;