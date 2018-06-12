import React, {Component} from 'react';
import base from '../base';

import Header from './Header';
import Red from './boards/Red';
import Green from './boards/Green';
import Blue from './boards/Blue';
import Text from './boards/Text';
import Room from './boards/Room';
import Multi from './boards/Multi';

class AddBoard extends Component {
    constructor(props){
        super(props);

        this.state = {
            baseLink: {
                walls: {}
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

    checkBoardOptions(array = ['']) {
        let unusedOptions = ['red', 'green', 'blue', 'text', 'room', 'multi'];

        for (let i=0; i<array.length; i++) {
            if (unusedOptions.indexOf(array[i]) !== -1) {
                unusedOptions.splice(unusedOptions.indexOf(array[i]), 1);
            }
        }

        return unusedOptions;
    }

    removeBoardChoice(item) {
        const newState = {...this.state};

        let index = newState.baseLink.walls[`${this.props.match.params.screen}`].options.indexOf(item);

        newState.baseLink.walls[`${this.props.match.params.screen}`].options.splice(index, 1);

        this.setState({
            ...newState
        });
    }

    addBoardChoice(item) {
        const newState = {...this.state};

        newState.baseLink.walls[`${this.props.match.params.screen}`].options.push(item);

        this.setState({
            ...newState
        });
    }

    determineThumbnail(current) {
        let returnValue;

        switch (current){
            case 'red':
                returnValue = 'Red'
                break;
            case 'green':
                returnValue = 'Green'
                break;
            case 'blue':
                returnValue =  'Blue'
                break;
            case 'text':
                returnValue =  'Text board'
                // <Text title={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.title} subtitle={this.state.baseLink.walls[`${this.props.match.params.screen}`].display_text.text.subtitle} />
                break;
            case 'room':
                returnValue =  'Room board'
                // <Room title={this.props.match.params.screen} location={this.state.baseLink.location_name} />
                break;
            case 'multi':
                returnValue = 'Multi board'
                // <Multi location={this.props.match.params.location} />
                break;
            default:
                returnValue = 'No current display'
        }
        return returnValue;
    }
    
    render() {

        let {options} = this.state.baseLink.walls[`${this.props.match.params.screen}`] || '';

        if (!options) { options = [undefined] };

        let unusedOptions = [];

        if (options[0] === undefined) {
            unusedOptions = [''];
        } else {
            unusedOptions = this.checkBoardOptions(options);
        }

        let optionsMap = options.map( (item, index) => {
            return (
                <div key={index} onClick={() => this.removeBoardChoice(item)} className='boardViewItem' >
                    <div className="boardViewThumb">
                        <h1>{this.determineThumbnail(item)}</h1>
                    </div>
                </div>
            )
        });

        let unusedMap = unusedOptions.map( (item, index) => {
            return (
                <div key={index} onClick={() => this.addBoardChoice(item)} className='boardViewItem' >
                    <div className="boardViewThumb">
                        <h1>{this.determineThumbnail(item)}</h1>
                    </div>
                </div>
            )
        });

        return (
            <React.Fragment>
                <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} currentview='Add Board' nav={this.props} />
                <div className="mainBodyContainer">
                    <div className='boardOptionsArea'>
                        <div>
                            Currently available boards:
                            <ul>
                                {optionsMap}
                            </ul>
                        </div>
                        <div>
                            Unavailable boards:
                            <ul>
                                {unusedMap}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddBoard;