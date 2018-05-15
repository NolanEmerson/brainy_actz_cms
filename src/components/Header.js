import React, {Component} from 'react';

class Header extends Component {

    render() {

        console.log('Header props: ', this.props);

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
                <span onClick={() =>this.props.nav.history.push('/')}>Brainy Actz</span>
                <span onClick={() =>this.props.nav.history.push(`/${this.props.nav.match.params.location}`)}> {location}</span>
                <span onClick={() =>this.props.nav.history.push(`/${this.props.nav.match.params.location}/${this.props.tv}`)}> {tv}</span> 
                {currentview}
            </div>
        );
    }
}

export default Header;