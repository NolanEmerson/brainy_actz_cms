import React, {Component} from 'react';

class EditBoard extends Component {
    constructor(props) {
        super(props);
    
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            editTitle: '',
            editSubtitle: ''
        }
    }

    componentDidMount() {
        const {editTitle, editSubtitle} = this.props.editInfo;
        this.setState({
            editTitle,
            editSubtitle
        });
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitPrevention(e) {
        e.preventDefault();
        this.props.submitEditInfo(this.state.editTitle, this.state.editSubtitle);
    }

    render() {

        return (
            <div className="editModalBackground" onClick={this.props.closeEditBoard}>
                <div className="editModalBoardArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit board display</h2>
                    <form onSubmit={(e) => this.submitPrevention(e)}>
                        <div>
                            <label htmlFor="editTitle" className='modalLabel'>Title</label>
                            <input type="text" value={this.state.editTitle} onChange={(e) => this.handleInputChange(e)} name='editTitle' />
                        </div>
                        <div>
                            <label htmlFor="editSubtitle" className='modalLabel'>Subtitle</label>
                            <input type="text" value={this.state.editSubtitle} onChange={(e) => this.handleInputChange(e)} name='editSubtitle' />
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