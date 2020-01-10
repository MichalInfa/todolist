import React from 'react';
import './ProjectDetailView.css';
import ListCard from './ListCard';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import Button from '../Button/Button'


const ProjectDetailView = () => {
    const[text, setText] = useState("");
    const[todolists, setTodolist] = useState([]);
    
    let history = useHistory();
    
    const renderListCards = (todolists) => {
    return todolists.map (
        listCard => {
            return (<ListCard key={listCard.id} name ={listCard.name}/>)
            }
        )
    }

    const addItemToList = () => {
        setTodolist([
            ...todolists,
            {   
                id: todolists.length,
                name: text
            }       
        ]);
        console.log(todolists);
    }

    return(
        <div className = "Top">
            <p className = "Heavy">
                To-dos
            </p>
            <hr />
            <div>
                {renderListCards(todolists)}
            </div>
            <div className = "ButtonWrapper">
                <form onSubmit = {(event) => {
                    event.preventDefault()
                    }}>
                    <label>
                        <input className="NoOutline" type = "text" placeholder = "Name this list..."
                        value = {text} onChange = {(event) => setText(event.target.value)}
                        />
                    </label>
                    <Button type = "submit" 
                    disabledProperties = {text.trim().length  < 6}
                    buttonClass = {text.trim().length  > 5 ? "Proper" : "NotProper"}
                    buttonText = {"Add on click"}
                    onClickFunction = {() => {
                        addItemToList()
                        setText("")
                    }
                    }/>

                </form>
            </div>
        </div>
    );

}

export default ProjectDetailView
