import React from 'react'
import Option from './Option'

const Options = (props) => (
    <div>
        <div className="widget-header">
          <h3 className="widget-header__title">Your Options</h3>
          <button
           className="button button--link" 
           onClick={props.handleRemove}
           >
              Remove All
           </button>
        </div>
        {props.options.length === 0 && <p className="widget__message">Enter the value</p>}
        {
            props.options.map((option, index) => 
            <Option 
            key={option} 
            text={option}
            count={index+1}
            handleRemoveOption={props.handleRemoveOption} 
            />
            )
        }
    </div>
)


export default Options