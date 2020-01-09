import React from 'react'
import './Detail.css'
import symbol_2 from '../../Images/symbol_2.png'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'


const Detail = (props) => {
    const[text, setText] = useState("");

    let history = useHistory();
    return (
        <div className = "Detail">
            <div>
                <img src = {symbol_2} alt = "" width = {200} height = {100}/>
                <p className = "Heavy">
                    All right, let's get your project started!<br />
                </p>
            </div>
            <div className = "Form">
                <form onSubmit = {(event) => event.preventDefault}>
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
                        <button type = "submit"
                        disabled = {text.trim().length  < 6}
                        className = {text.trim().length  > 5 ? "Proper" : "NotProper"}
                        onClick = {() => history.push("/")}>
                            Submit
                        </button>
                </form>
            </div>
        </div>
        
    )
}

export default Detail