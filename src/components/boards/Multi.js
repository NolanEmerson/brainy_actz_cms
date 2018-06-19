import React, {Component} from 'react';
import '../../css/boards.css';
import base from '../../base';

import MultiModal from './MultiModal';

class Multi extends Component{

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.updateModal = this.updateModal.bind(this);

        this.state = {
            baseLink: {
                location_name: ''
            },
            showModal: false,
            modalLocation: '',
            modalTitle: ''
        }
    }

    componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location}`, {
            context: this,
            state: 'baseLink'
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    toggleModal(location, title) {
        const {showModal} = this.state;

        this.setState({
            showModal: !showModal
        });

        this.updateModal(location, title)
    }

    updateModal(location, title) {
        this.setState({
            modalLocation: location,
            modalTitle: title
        })
    }

    determineRooms(location) {
        switch (location) {
            case 'Irvine, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://alejandravonhartz.com/wp-content/uploads/2016/04/MG_9926-1030x687.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            <div>The Secrets of The Master</div>
                            {/* <Room title='The Secrets of The Master' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/1a/dc/d1/1adcd1520d5bc2ffc8f38a8fab5485fe.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Great Car Heist')}>
                            The Great Car Heist
                            {/* <Room title='The Great Car Heist' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/b4/25/80/b42580335dda2ec9b66f645697a1e529.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'Mystery at the Lost Point Lodge')}>
                            Mystery at the Lost Point Lodge
                            {/* <Room title='Mystery at the Lost Point Lodge' location={location} /> */}
                        </div>                  
                    </React.Fragment>
                );
            case 'San Diego, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/b4/25/80/b42580335dda2ec9b66f645697a1e529.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'Mystery at the Lost Point Lodge')}>
                            Mystery at the Lost Point Lodge
                            {/* <Room title='Mystery at the Lost Point Lodge' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://vignette.wikia.nocookie.net/the-guild-of-elyssi/images/4/46/1433695181-fantasy-art-temple-trees-forest-jungle-landscapes-decay-ruins-1920x1180.jpg/revision/latest?cb=20161122235106)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Lost Jungle Safari')}>
                            The Lost Jungle Safari
                            {/* <Room title='The Barbershop Backlash' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/EMY0Wfm2liledc68a/videoblocks-fair-entrance-with-ferris-wheel-spinning-in-background-at-night_scmmb2-isl_thumbnail-full01.png)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Great Carnival Challenge')}>
                            The Great Carnival Challenge
                            {/* <Room title='The Great Carnival Challenge' location={location} /> */}
                        </div>
                    </React.Fragment>
                );
            case 'Temecula, CA':
                return (
                    <React.Fragment>
                        <div className='multiHolder' style={{backgroundImage: 'url(http://i.imgur.com/xuvGxmR.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Smuggler')}>
                            The Smuggler
                            {/* <Room title='The Smuggler' location={location} /> */}
                        </div>    
                        <div className='multiHolder' style={{backgroundImage: 'url(http://longwallpapers.com/Desktop-Wallpaper/ghost-pirate-ship-backgrounds-For-Desktop-Wallpaper.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Great Pirate Escape')}>
                            The Great Pirate Escape
                            {/* <Room title='The Great Pirate Escape' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.imgur.com/SMm1WRp.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Legacy')}>
                            The Legacy
                            {/* <Room title='The Legacy' location={location} /> */}
                        </div>              
                    </React.Fragment>
                );
            case 'Reno, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://alejandravonhartz.com/wp-content/uploads/2016/04/MG_9926-1030x687.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            The Secrets of The Master
                            {/* <Room title='The Secrets of The Master' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.imgur.com/SMm1WRp.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Legacy')}>
                            The Legacy
                            {/* <Room title='The Legacy' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://wallup.net/wp-content/uploads/2017/12/01/560344-merry-christmas-holiday-winter-snow-beautiful-tree-gift-santa-748x421.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, "Santa's Cabin")}>
                            Santa's Cabin
                            {/* <Room title="Santa's Cabin" location={location} /> */}
                        </div>                  
                    </React.Fragment>
                );
            case 'Las Vegas, NV':
                return (
                    <React.Fragment>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://alejandravonhartz.com/wp-content/uploads/2016/04/MG_9926-1030x687.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Secrets of The Master')}>
                            The Secrets of The Master
                            {/* <Room title='The Secrets of The Master' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.imgur.com/SMm1WRp.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Legacy')}>
                            The Legacy
                            {/* <Room title='The Legacy' location={location} /> */}
                        </div>
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/1a/dc/d1/1adcd1520d5bc2ffc8f38a8fab5485fe.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'The Great Car Heist')}>
                            The Great Car Heist
                            {/* <Room title='The Great Car Heist' location={location} /> */}
                        </div>                  
                        <div className='multiHolder' style={{backgroundImage: 'url(https://ak5.picdn.net/shutterstock/videos/3051865/thumb/1.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'High Roller')}>
                            High Roller
                            {/* <Room title='High Roller' location={location} /> */}
                        </div>  
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/19/09/8d/19098d3499be084a426b8f1e578b62ee.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, "The Smokin' Gun")}>
                            The Smokin' Gun
                            {/* <Room title="The Smokin' Gun" location={location} /> */}
                        </div>  
                        <div className='multiHolder' style={{backgroundImage: 'url(https://i.pinimg.com/originals/f5/c6/f7/f5c6f7cf04af48c91710209477460f27.jpg)', backgroundSize: 'cover'}} onClick={() => this.toggleModal(location, 'Backstage VIP Pass')}>
                            Backstage VIP Pass
                            {/* <Room title='Backstage VIP Pass' location={location} /> */}
                        </div>  
                    </React.Fragment>
                );
            default:
                return null;
        }
    }

    render() {

        const {modalLocation, modalTitle} = this.state;

        return (
            <div className='multiFlexContainer'>
                {this.state.showModal && <MultiModal location={modalLocation} title={modalTitle} close={this.toggleModal.bind(this)} />}
                {this.determineRooms(this.state.baseLink.location_name)}
            </div>
        );
    }
}

export default Multi;