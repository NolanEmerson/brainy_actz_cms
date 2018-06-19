import React, {Component} from 'react';

class EditBoard extends Component {
    constructor(props) {
        super(props);
    
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            editFirstItem: '',
            editSecondItem: ''
        }
    }

    componentDidMount() {
        const {editFirstItem, editSecondItem} = this.props.editInfo;
        this.setState({
            editFirstItem,
            editSecondItem
        });
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitPrevention(e) {
        e.preventDefault();
        this.props.submitEditInfo(this.state.editFirstItem, this.state.editSecondItem, this.props.itemToEdit);
    }

    render() {
        
        return (
            <div className="editModalBackground" onClick={this.props.closeEditBoard}>
                <div className="editModalBoardArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit board display</h2>
                    <form onSubmit={(e) => this.submitPrevention(e)}>
                        <div>
                            <label htmlFor="editFirstItem" className='modalLabel'>{this.props.itemToEdit === 'room' ? 'Background Link' : 'Title'}</label>
                            <input type="text" value={this.state.editFirstItem} onChange={(e) => this.handleInputChange(e)} name='editFirstItem' />
                        </div>
                        <div>
                            <label htmlFor="editSecondItem" className='modalLabel'>{this.props.itemToEdit === 'room' ? 'Video Link' : 'Subtitle'}</label>
                            <input type="text" value={this.state.editSecondItem} onChange={(e) => this.handleInputChange(e)} name='editSecondItem' />
                        </div>
                        <div className="modalBoardButtons">
                            <button onClick={this.props.closeEditBoard}>Cancel</button>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditBoard;