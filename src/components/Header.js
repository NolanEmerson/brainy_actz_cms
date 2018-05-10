import React, {Component} from 'react';

class Header extends Component {

    render() {

        let location = '';
        let tv = '';
        let currentview = '';

        if(this.props.location){
            location = '> ' + this.props.location;
        }
        if(this.props.tv){
            tv = '> ' + this.props.tv;
        }
        if(this.props.currentview){
            currentview = '> ' + this.props.currentview;
        }

        return (
            <div className="headerContainer">
                Brainy Actz {location} {tv} {currentview}
            </div>
        );
    }
}

export default Header;