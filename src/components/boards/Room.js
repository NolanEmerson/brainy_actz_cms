import React from 'react';
import '../../css/boards.css';
import back from '../../assets/images/room_back.jpg'

export default props => {
    return (
        <div className="roomBoard" style={{backgroundImage: `url(${back})`}}>
            <h1 className="roomBoardTitle">{props.title}</h1>
            <iframe src="https://www.youtube.com/embed/E357KstE4rk" frameBorder="0" style={{width: '39.3%', height: '60%'}} title='Room video' allowFullScreen ></iframe>
        </div>
    );
}