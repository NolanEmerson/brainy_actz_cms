import React, {Component} from 'react';

class EditModal extends Component {
    constructor(props) {
        super(props);
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleRoom = this.toggleRoom.bind(this);

        this.state = {
            editInfo: '',
            isRoom: false
        }
    }

    componentDidMount() {
        const {editInfo, isRoom} = this.props;
        this.setState({
            editInfo,
            isRoom
        });
    }

    handleInputChange(e) {
        this.setState({
            editInfo: e.target.value
        });
    }

    toggleRoom() {
        this.setState({
            isRoom: !this.state.isRoom
        });
    }

    render() {

        return (
            <div className="editModalBackground" onClick={this.props.closeEditModal}>
                <div className="editModalArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit information</h2>
                    <input type="text" value={this.state.editInfo} onChange={this.handleInputChange} ></input>
                    {this.props.wallboard && <div>
                        <label htmlFor="roomCheck">Is this in an escape room?</label>
                        <input type="checkbox" className="roomCheck" checked={this.state.isRoom} onChange={this.toggleRoom}/>
                    </div>}
                    <div className="modalButtons">
                        <button onClick={this.props.closeEditModal}>Cancel</button>
                        <button onClick={() => this.props.submitEditInfo(this.props.location, this.state.editInfo, this.props.editInfo, this.state.isRoom)} className='modalSubmitButton'>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditModal;