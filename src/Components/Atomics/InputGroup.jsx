import React from 'react'

function InputGroup({label, children, margin}) {
    let classMargin = margin?'input-group mt-2':'input-group'
    return (  
        <div className={classMargin}>
            <span className="input-group-text">
                <small>{label}</small>
            </span>
            {children}
        </div>
    );
}

export default InputGroup;