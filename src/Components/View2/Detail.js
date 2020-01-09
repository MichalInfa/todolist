import React from 'react'
import './Detail.css'
import symbol_2 from '../../Images/symbol_2.png'
import {useState} from 'react'
import {Link} from 'react-router-dom'
const Detail = (props) => {
    const[text, setText] = useState("");

    return (
        <div className = "Detail">
            <div>
                <img src = {symbol_2} alt = "" width = {200} height = {100}/>
                <p className = "Heavy">
                    All right, let's get your project started!<br />
                </p>
            </div>
            <div className = "frm">
                <form>
                    <label>
                            Name this project
                        <br />
                        <input type = "text" placeholder="e.g. Office renovation"
                         onChange = {(event) => setText(event.target.value)}/>
                    </label>
                    <label>
                        <br />
                            Add an optional descripiton
                        <br />
                        <input type = "textarea" placeholder="e.g. Plans and scheduling for expanding office" />
                    </label>
                </form>
            </div>
            <div>
                <form>
                    <Link to = "/">
                    <button type = "submit"
                    disabled = {(text.replace(/\s/g, '')).length  < 6}
                    className = {(text.replace(/\s/g, '')).length  > 5 ? "Proper" : "NotProper"}
                    >
                        Submit
                    </button>
                    </Link>
                </form>
            </div>
        </div>
        
    )
}

export default Detail