import React, {Component} from 'react';

class EditTeaser extends Component {
    constructor(props) {
        super(props);

        this.submitNewInfo = this.submitNewInfo.bind(this);

        this.state = {
            speed: 10
        };
    }

    updateSpeed(e) {
        this.setState({
            speed: e.target.value
        });
    }

    submitNewInfo() {
        this.props.submitTeaserEdit(this.state.speed);
    }

    componentDidMount() {
        this.setState({
            speed: this.props.speed
        });
    }

    render() {

        return (
            <div className="editModalBackground"  onClick={this.props.closeTeaserBoard}>
                <div className="editModalBoardArea" onClick={e => e.stopPropagation()}>
                    <h2>Edit teaser board</h2>
                    <div>
                        <span>Boards will show for ___ seconds: </span>
                        <input type="text" value={this.state.speed} onChange={e => this.updateSpeed(e)} />
                    </div>
                    {/* <div>
                        <span>Currently chosen boards hilighted</span>
                        <div className="editTransitionBoardOptions">
                            {roomsMap}
                        </div>
                    </div> */}
                    <div className="modalBoardButtons">
                        <button onClick={this.props.closeTeaserBoard}>Cancel</button>
                        <button onClick={this.submitNewInfo}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTeaser;