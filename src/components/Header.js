import React, {Component} from 'react';
import logo from '../assets/images/brainy_logo.png'

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            landing: {
                color: 'white'
            },
            location: {
                color: 'white'
            },
            tv: {
                color: 'white'
            },
            currentView: {
                color: 'white'
            }
        }
    }

    headerHovered(item) {
        this.setState({
            [`${item}`]: {
                color: '#d8f800'
            }
        });
    }

    headerUnhovered(item) {
        this.setState({
            [`${item}`]: {
                color: 'white'
            }
        });
    }

    render() {

        let location = '';
        let tv = '';
        let currentview = '';

        if(this.props.location){
            location = this.props.location ;
        }
        if(this.props.tv){
            tv = this.props.tv;
        }
        if(this.props.currentview){
            currentview = this.props.currentview;
        }

        return (
            <div className="headerContainer">
                <img src={logo} alt="" className='headerLogo'/>
                <span className='headerItem' onClick={() =>this.props.nav.history.push('/')} style={this.state.landing} onMouseEnter={() => this.headerHovered('landing')} onMouseLeave={() => this.headerUnhovered('landing')} >Brainy Actz </span>
                {this.props.location && <span> > </span>}
                <span className='headerItem' onClick={() =>this.props.nav.history.push(`/${this.props.nav.match.params.location}`)} style={this.state.location} onMouseEnter={() => this.headerHovered('location')} onMouseLeave={() => this.headerUnhovered('location')}> {location}</span>
                {this.props.tv && <span> > </span>}
                <span className='headerItem' onClick={() =>this.props.nav.history.push(`/${this.props.nav.match.params.location}/${this.props.tv}`)} style={this.state.tv} onMouseEnter={() => this.headerHovered('tv')} onMouseLeave={() => this.headerUnhovered('tv')}> {tv}</span>
                {this.props.currentview && <span> > </span>}
                <span className='headerItem' style={this.state.currentView} onMouseEnter={() => this.headerHovered('currentView')} onMouseLeave={() => this.headerUnhovered('currentView')}>{currentview}</span>
            </div>
        );
    }
}

export default Header;