import React, {Component} from 'react';
import base from '../../base';

import Red from './Red';
import Green from './Green';
import Blue from './Blue';
import Text from './Text';
import Room from './Room';
import Multi from './Multi';

class Transition extends Component {
    constructor(props){
        super(props);

        this.updateDisplay = this.updateDisplay.bind(this);

        this.state = {
            baseLink: {
                transition_options: []
            },
            currentDisplay: 0,
            transitioning: false,
            opacity: 0
        };
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}/walls/${this.props.screen}`, {
            context: this,
            state: 'baseLink'
        });

        setInterval(this.updateDisplay, 3000);
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    updateDisplay() {
        this.setState({
            opacity: 100
        });

        setTimeout( () => {
            if (this.state.currentDisplay === this.state.baseLink.transition_options.length -1){
                let currentDisplay = 0;
                this.setState({
                    currentDisplay
                });
            } else {
                let {currentDisplay} = this.state;
                currentDisplay = currentDisplay + 1;
                this.setState({
                    currentDisplay
                });
            }
            this.setState({
                opacity: 0
            })
        }, 500)
        
    }

    render() {
        
        console.log('Transition state: ', this.state);

        const {transition_options} = this.state.baseLink;
        const {currentDisplay} = this.state;

        let returnValue = '';
        switch (transition_options[currentDisplay]) {
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

        return (
            <div className='transitionBoard'>
                {returnValue}
                <div className="nextDisplay" style={{opacity: this.state.opacity}}>

                </div>
            </div>
        );
    }
}

export default Transition;