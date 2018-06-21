import React, {Component} from 'react';
// import base from '../base';

class EditTransition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseLink: {}
        };
    }

    render() {

        return (
            <div className="editModalBackground">
                <div className="editModalBoardArea">
                    <h2>Edit transition board</h2>
                    <div>
                        <span>Boards will show for ___ seconds : </span>
                        <input type="text" />
                    </div>
                    <div>
                        <span>Currently chosen boards hilighted</span>
                        <div className="editTransitionBoardOptions">
                        
                        </div>
                    </div>
                    <div className="modalBoardButtons">
                        <button>Cancel</button>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTransition;