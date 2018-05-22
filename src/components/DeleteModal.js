import React, {Component} from 'react';

class DeleteModal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    deleteItem(e) {
        e.stopPropagation();
        console.log('wew lad');
    }

    render() {

        console.log(this.props);

        return (
            <div className="deleteModalBackground" onClick={this.props.closeDeleteModal}>
                <div className="deleteModalArea" onClick={e => e.stopPropagation()}>
                    Are you sure you want to delete all information for ___?
                    <div className="modalButtons">
                        <button onClick={this.props.closeDeleteModal}>Return</button>
                        <button onClick={(e) => this.deleteItem(e)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteModal;