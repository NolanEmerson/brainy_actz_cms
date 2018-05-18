import React, {Component} from 'react';

class EditModal extends Component {
    constructor(props) {
        super(props);
    
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            editInfo: ''
        }
    }

    componentDidMount() {
        const {editInfo} = this.props;
        this.setState({
            editInfo
        });
    }

    handleInputChange(e) {
        this.setState({
            editInfo: e.target.value
        });
    }

    render() {
        return (
            <div className="modalBackground" onClick={this.props.closeEditModal}>
                <div className="modalArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit information</h2>
                    <input type="text" value={this.state.editInfo} onChange={this.handleInputChange} ></input>
                    <div className="modalButtons">
                        <button onClick={() => this.props.submitEditInfo(this.props.location, this.state.editInfo, this.props.editInfo)}>Submit</button>
                        <button onClick={this.props.closeEditModal}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditModal;