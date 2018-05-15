import React, {Component} from 'react';
import base from '../base';
import Header from './Header';

class AddBoard extends Component {
    constructor(props){
        super(props);

        this.state = {
            baseLink: {
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
            state: 'baseLink'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    checkBoardOptions(array) {
        let unusedOptions = ['red', 'green', 'blue', 'text', 'room'];

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
        console.log(newState.baseLink.walls[`${this.props.match.params.screen}`].options);

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
    
    render() {
        console.log('Add board props: ', this.props);
        console.log('Add board state: ', this.state);

        let {options} = this.state.baseLink.walls[`${this.props.match.params.screen}`];

        let unusedOptions = this.checkBoardOptions(options);

        let optionsMap = options.map( (item, index) => {
            return (
                <li key={index} onClick={() => this.removeBoardChoice(item)} >{item}</li>
            )
        });

        let unusedMap = unusedOptions.map( (item, index) => {
            return (
                <li key={index} onClick={() => this.addBoardChoice(item)} >{item}</li>
            )
        });

        return (
            <React.Fragment>
                <Header location={this.state.baseLink.location_name} tv={this.props.match.params.screen} currentview='Add Board' nav={this.props} />
                <div className='boardOptionsArea'>
                    <div>
                        Currently selectable boards
                        <ul>
                            {optionsMap}
                        </ul>
                    </div>
                    <div>
                        Unselectable boards
                        <ul>
                            {unusedMap}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddBoard;