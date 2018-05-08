import React, {Component} from 'react';
import base from '../base';

class Screen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            ScreenNames: []
        }
    }

    componentDidMount() {
		base.fetch(`/locations`, { context: this }).then( response => {
		console.log('Screen response: ', response);
		this.setupScreens(response['Irvine, CA']);
		});
	}

	setupScreens(Screens) {
		const ScreenNames = Object.keys(Screens);

		this.setState({
		ScreenNames
		});
	}

    render() {
        const ScreenMap = this.state.ScreenNames.map( (item, index) => {
            return <div key={index}>{item}</div>
        });

        return (
            <div>
                {ScreenMap}
            </div>
        );
    }
}

export default Screen;