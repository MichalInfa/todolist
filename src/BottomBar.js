import React from 'react'
import './BottomBar.css'
import plus from './symbol.png'

const BottomBar = () => {
    return (
        <div className = "BottomBar">
            <img src = {plus} alt = "" />
            <br />
            Add another project
        </div>
    )
}

export default BottomBar