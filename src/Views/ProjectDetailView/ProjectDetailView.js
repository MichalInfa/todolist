import React from 'react';
import './ProjectDetailView.css';
import ListCard from './ListCard';
import {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import TopHeader from '../../Components/TopHeader/TopHeader';

const ProjectDetailView = (props) => {
    const[text, setText] = useState("");

    const[todolists, setTodolist] = useState([]);
    const {id} = props.match.params

    useEffect (() => {   
        fetch('http://localhost:3000/projects/'+ id + '/to_do_lists')
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){
                setTodolist(resp)
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {
            if(error.status === 401){ 
                console.log("Blad: Zadany adres nie istnieje")
            }
        });      
    },[id,setTodolist]);

    const renderListCards = (todolists) => {
        return todolists.map (listCard => {
            return (<ListCard 
                key = {listCard.id}
                name = {listCard.name}
                projectid = {id}
                taskid = {listCard.id}            
                />)
                
                
        })
    }

 async function addToDoList(listElement = {}) {
        
        const resp = await fetch('http://localhost:3000/projects/' + id + '/to_do_lists',{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        return resp.json(); 
    };

    return(
        <div>
            <TopHeader title = "backtoprojects" />
            <div className = "Top">
                <p className = "Heavy"> To-dos </p>
                <hr />
                <div className = "MiddlePart">
                    <div>
                        {renderListCards(todolists)}
                    </div>
                    <div className = "ButtonWrapper">  
                        <form onSubmit = {(event) => event.preventDefault()}>
                            <label>
                                <input className="NoOutline" type = "text" placeholder = "Name this list..."
                                value = {text} onChange = {(event) => setText(event.target.value)}/>
                            </label>
                            <Button type = "submit" 
                                disabledProperties = {text.trim().length  < 6}
                                buttonClass = {text.trim().length  > 5 ? "Proper" : "NotProper"}
                                buttonText = {"Add on click"}
                                onClickFunction = {() => {
                                    addToDoList({name: text}).then((element) => {
                                        setTodolist([
                                            ...todolists,
                                            element
                                        ])
                                    })
                                    setText("")
                                }
                            }/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailView
