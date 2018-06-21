import React, {Component} from 'react';
// import base from '../base';

class EditTransition extends Component {
    constructor(props) {
        super(props);

        this.toggleItem = this.toggleItem.bind(this);
        this.submitNewInfo = this.submitNewInfo.bind(this);

        this.state = {
            boards: {
                red: false,
                green: false,
                blue: false,
                text: false,
                room: false,
                multi: false
            },
            speed: 10
        };
    }

    updateSpeed(e) {
        this.setState({
            speed: e.target.value
        });
    }

    toggleItem(item) {

        const currentChoice = this.state.boards[`${item}`]

        this.setState({
            boards: {
                ...this.state.boards,
                [`${item}`]: !currentChoice
            }
        });
    }

    submitNewInfo() {
        const selectedBoards = [];
        const boardKeys = Object.keys(this.state.boards);

        for (let i=0; i<boardKeys.length; i++) {
            if (this.state.boards[`${boardKeys[i]}`]) {
                selectedBoards.push(boardKeys[i]);
            }
        }

        this.props.submitTransitionEdit(this.state.speed, selectedBoards);
    }

    componentDidMount() {
        const {boards} = this.state;

        for (let i=0; i<this.props.currentBoards.length; i++) {
            boards[`${this.props.currentBoards[i]}`] = true;
        }

        this.setState({
            ...boards,
            speed: this.props.speed
        })
    }

    render() {

        const roomsMap = Object.keys(this.state.boards).map((item, index) => {
            let itemCaps = item.split('');
            itemCaps[0] = itemCaps[0].toUpperCase();
            itemCaps = itemCaps.join('');
            return (
                <div key={index} onClick={() => this.toggleItem(item)} className={this.state.boards[`${item}`] ? 'editTransItemSelected' : 'editTransItem'}>
                    {itemCaps}
                </div>
            );
        })

        return (
            <div className="editModalBackground"  onClick={this.props.closeTransitionBoard}>
                <div className="editModalBoardArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit transition board</h2>
                    <div>
                        <span>Boards will show for ___ seconds: </span>
                        <input type="text" value={this.state.speed} onChange={e => this.updateSpeed(e)} />
                    </div>
                    <div>
                        <span>Currently chosen boards hilighted</span>
                        <div className="editTransitionBoardOptions">
                            {roomsMap}
                        </div>
                    </div>
                    <div className="modalBoardButtons">
                        <button onClick={this.props.closeTransitionBoard}>Cancel</button>
                        <button onClick={this.submitNewInfo}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTransition;