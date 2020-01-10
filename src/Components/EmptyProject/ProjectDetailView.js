import React from 'react';
import './ProjectDetailView.css';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

const ProjectDetailView = () => {
    const[text, setText] = useState("");
    const[message, showMessage] = useState(0);
    
    let history = useHistory();
    
    return(
        <div className = "Top">
            <p className = "Heavy">
                To-dos
            </p>
            <hr />
            <div>
                {message > 0 ? text : ""}
            </div>
            <div className = "ButtonWrapper">
                <form>
                    <label>
                        <input className="NoOutline" type = "text" placeholder = "Name this list..."
                        onChange = {(event) => setText(event.target.value)}
                        />
                    </label>
                    <button type = "submit" 
                    className = "Proper"
                    onClick = {(event) => showMessage(1)}> 
                    Add this list
                    </button>
                </form>
            </div>

        </div>
        
    );

}

export default ProjectDetailView


/*import React from 'react';
import './ProjectDetailView.css';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import { queries } from '@testing-library/react';

const ProjectDetailView = (props) => {
    const[text, setText] = useState("");
    
    let history = useHistory();
    
    return(
        <div className = "Top">
            <p className = "Heavy">
                To-dos
            </p>
            <hr />
            <div>
                
            {props.location.text !== "" ? props.location.text : ""}
                
            </div>
            <div className = "ButtonWrapper">
                <form onSubmit = {(event) => event.preventDefault}>
                    <label>
                        <input className="NoOutline" type = "text" placeholder = "Name this list..."
                        onChange = {(event) => setText(event.target.value)}
                        />
                    </label>
                    <button type = "submit" 
                    onClick = {() => history.push({pathname: "/project/" + props},{search: "?query=abc"},{response: text})}> 
                    Add this list
                    </button>
                </form>
            </div>

        </div>
        
    );

}

export default ProjectDetailView
*/