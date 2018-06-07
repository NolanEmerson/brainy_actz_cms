import React, {Component} from 'react';

import Room from './Room';

class MultiModal extends Component {

    render() {

        const {location, title, close} = this.props;

        return (
            <div className='multiModal'>
                <span onClick={close}>X</span>
                <Room title={title} location={location} />
            </div>
        )
    }
}

export default MultiModal;