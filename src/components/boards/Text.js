import React from 'react';
import '../../css/boards.css';

export default props => {
    
    return (
        <div className="textBoard">
            <h1 className="textBoardTitle">{props.title || 'Placeholder title'}</h1>
            <h2 className="textBoardSubtitle">{props.subtitle || 'Placeholder title'}</h2>
        </div>
    );
}