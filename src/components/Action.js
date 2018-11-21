import React from 'react';

const Action = (props) => {
    return (
        <div>
            <button 
            className="big-button"
            onClick={props.onActionClick}
            disabled={!props.hasOption}
            >
            What should I do
            </button>
        </div>
    );
}

export default Action;
