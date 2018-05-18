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
        console.log(this.props);
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

    render() {
        return (
            <div className="modalBackground" onClick={this.props.closeEditBoard}>
                <div className="modalArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit board display</h2>
                    <div>
                        <label htmlFor="editTitle" className='modalLabel'>Title</label>
                        <input type="text" value={this.state.editTitle} onChange={(e) => this.handleInputChange(e)} name='editTitle' />
                    </div>
                    <div>
                        <label htmlFor="editSubtitle" className='modalLabel'>Subtitle</label>
                        <input type="text" value={this.state.editSubtitle} onChange={(e) => this.handleInputChange(e)} name='editSubtitle' />
                    </div>
                    <div className="modalButtons">
                        <button onClick={() => this.props.submitEditInfo(this.props.location, this.state.editTitle, this.props.editTitle)}>Submit</button>
                        <button onClick={this.props.closeEditBoard}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBoard;