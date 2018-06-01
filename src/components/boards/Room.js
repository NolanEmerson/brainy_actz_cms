import React, {Component} from 'react';
import '../../css/boards.css';
import back from '../../assets/images/room_back.jpg'

class Room extends Component {

    determineVideoLocation(){
        switch(this.props.location){
            case 'Irvine, CA':
                return this.determineVideoScreen('Irvine, CA');
            case 'San Diego, CA':
                return this.determineVideoScreen('San Diego, CA');
            case 'Temecula, CA':
                return this.determineVideoScreen('Temecula, CA');
            case 'Reno, NV':
                return this.determineVideoScreen('Reno, NV');
            case 'Las Vegas, NV':
                return this.determineVideoScreen('Las Vegas, NV');
            default:
                return "https://www.youtube.com/embed/4o5baMYWdtQ"
        }
    }

    determineVideoScreen(location){
        if (location === 'Irvine, CA'){
            switch (this.props.title){
                case 'The Secrets of The Master':
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Great Car Heist':
                    return "https://www.youtube.com/embed/sP5KNGfRvus"
                case 'Mystery at the Lost Point Lodge':
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'San Diego, CA') {
            switch (this.props.title){
                case 'The Barbershop Backlash':
                    return "https://www.youtube.com/embed/5TywfVbUaDQ"
                case 'The Great Carnival Challenge':
                    return "https://www.youtube.com/embed/nitnrhisMWU"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Temecula, CA') {
            switch (this.props.title){
                case 'The Great Pirate Escape':
                    return "https://www.youtube.com/embed/zs04lKFSUpQ"
                case 'The Legacy':
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'The Lost Jungle Safari':
                    return "https://www.youtube.com/embed/9eN70vk-5RY"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Reno, NV') {
            switch (this.props.title){
                case 'The Secrets of The Master':
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Legacy':
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'Santa\'s Cabin':
                    return "https://www.youtube.com/embed/tg6APSEkcIA"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Las Vegas, NV') {
            switch (this.props.title){
                case 'The Secrets of The Master':
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Legacy':
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'The Great Car Heist':
                    return "https://www.youtube.com/embed/sP5KNGfRvus"
                case 'High Roller':
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                case 'The Smokin\' Gun':
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                case 'Backstage VIP Pass':
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else {

        }
    }

    render() {

        return (
            <div className="roomBoard" style={{backgroundImage: `url(${back})`}}>
                <h1 className="roomBoardTitle">{this.props.title}</h1>
                <iframe src={this.determineVideoLocation()} frameBorder="0" style={{width: '39.3%', height: '60%'}} title='Room video' allowFullScreen ></iframe>
            </div>
        );
    }
}

export default Room;