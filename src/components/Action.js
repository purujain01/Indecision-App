import React from 'react'

const Action = (props) => (
    <div>
        <button
        className="big-button" 
        onClick={props.handleShow}
        disabled={!props.dis}
        >
             What Should I Do ?
        </button>
    </div>
)

export default Action