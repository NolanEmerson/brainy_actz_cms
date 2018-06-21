import React, {Component} from 'react';
import base from '../../base';

import Red from './Red';
import Green from './Green';
import Blue from './Blue';
// import Text from './Text';
// import Room from './Room';
// import Multi from './Multi';

class Transition extends Component {
    constructor(props){
        super(props);

        this.updateDisplay = this.updateDisplay.bind(this);

        this.state = {
            baseLink: {
                transition_options: {
                    speed: {},
                    boards: []
                }
            },
            currentDisplay: 0,
            transitioning: false,
            display: 'none'
        };
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}/walls/${this.props.screen}`, {
            context: this,
            state: 'baseLink'
        });

        setInterval(this.updateDisplay, 5000);
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    updateDisplay() {
        this.setState({
            display: '',
        });

        setTimeout( () => {

            if (this.state.currentDisplay === this.state.baseLink.transition_options.boards.length -1){
                let currentDisplay = 0;
                this.setState({
                    currentDisplay,
                    display: 'none',
                });
            } else {
                let {currentDisplay} = this.state;
                currentDisplay = currentDisplay + 1;
                this.setState({
                    currentDisplay,
                    display: 'none',
                });
            }

        }, 1000)
        
    }

    determineNewDisplay(options, currentChoice) {

        let returnValue = '';
        switch (options[currentChoice]) {
            case 'red':
                    returnValue = <Red />;
                    break;
                case 'green':
                    returnValue = <Green />
                    break;
                case 'blue':
                    returnValue =  <Blue />
                    break;
                default:
                    returnValue = 'No current value'
        }

        return returnValue;
    }

    render() {

        const {transition_options} = this.state.baseLink;
        const {currentDisplay} = this.state;
        let nextDisplay = null;
        if (currentDisplay === transition_options.boards.length -1) {
            nextDisplay = 0;
        } else {
            nextDisplay = currentDisplay + 1;
        }

        return (
            <div className='transitionBoard'>
                {this.determineNewDisplay(transition_options.boards, currentDisplay)}
                <div className="nextDisplay" style={{display: this.state.display}}>
                    {this.determineNewDisplay(transition_options.boards, nextDisplay)}
                </div>
            </div>
        );
    }
}

export default Transition;