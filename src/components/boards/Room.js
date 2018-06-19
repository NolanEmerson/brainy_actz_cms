import React, {Component} from 'react';
import '../../css/boards.css';
import back from '../../assets/images/room_back.jpg'

class Room extends Component {

    constructor(props){
        super(props);

        this.determineVideoLocation = this.determineVideoLocation.bind(this);
        this.determineVideoScreen = this.determineVideoScreen.bind(this);

        this.state = {
            background: back
        };
    }

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
                    // this.setState({
                    //     background: 'https://alejandravonhartz.com/wp-content/uploads/2016/04/MG_9926-1030x687.jpg'
                    // });
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Great Car Heist':
                    // this.setState({
                    //     background: 'https://i.pinimg.com/originals/1a/dc/d1/1adcd1520d5bc2ffc8f38a8fab5485fe.jpg'
                    // });
                    return "https://www.youtube.com/embed/sP5KNGfRvus"                    
                case 'Mystery at the Lost Point Lodge':
                    // this.setState({
                    //     background: 'https://i.pinimg.com/originals/b4/25/80/b42580335dda2ec9b66f645697a1e529.jpg'
                    // });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'San Diego, CA') {
            switch (this.props.title){
                case 'The Lost Jungle Safari':
                    // this.setState({
                    //     background: ''
                    // });
                    return "https://www.youtube.com/embed/9eN70vk-5RY"
                case 'The Great Carnival Challenge':
                    // this.setState({
                    //     background: ''
                    // });
                    return "https://www.youtube.com/embed/nitnrhisMWU"
                case 'Mystery at the Lost Point Lodge':
                    // this.setState({
                    //     background: ''
                    // });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Temecula, CA') {
            switch (this.props.title){
                case 'The Great Pirate Escape':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/zs04lKFSUpQ"
                case 'The Legacy':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'The Smuggler':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Reno, NV') {
            switch (this.props.title){
                case 'The Secrets of The Master':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Legacy':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'Santa\'s Cabin':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/tg6APSEkcIA"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else if (location === 'Las Vegas, NV') {
            switch (this.props.title){
                case 'The Secrets of The Master':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/E357KstE4rk"
                case 'The Legacy':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/dy-rn3zXDoI"
                case 'The Great Car Heist':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/sP5KNGfRvus"
                case 'High Roller':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                case 'The Smokin\' Gun':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                case 'Backstage VIP Pass':
                    this.setState({
                        background: ''
                    });
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
                default:
                    return "https://www.youtube.com/embed/4o5baMYWdtQ"
            }
        } else {

        }
    }

    render() {
        return (
            <div className="roomBoard" style={{backgroundImage: `url(${this.state.background})`}}>
                <h1 className="roomBoardTitle">{this.props.title}</h1>
                <iframe src={this.determineVideoLocation()} frameBorder="0" style={{width: '39.3%', height: '60%'}} title='Room video' allowFullScreen ></iframe>
            </div>
        );
    }
}

export default Room;