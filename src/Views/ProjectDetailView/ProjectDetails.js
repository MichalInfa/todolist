import React from 'react';
import './ProjectDetails.css';
import ListCard from './ListCard';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Button from '../../Components/Button/Button';
import TopHeader from '../../Components/TopHeader/TopHeader';
import PaginationBar from '../../Components/PaginationBar/PaginationBar';

import {PROJECT_URL} from '../../constants';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {addToDoList}  from '../../Actions';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const ProjectDetailView = () => {
    
    document.title = `To-Do List`
    let {projectid} = useParams();

    const[text, setText] = useState("");
    const[reload, setReload] = useState(false)

    const todolists = useSelector(state => state.todolist)
    const dispatch = useDispatch()

    let history = useHistory();

    if(history.location.pathname === `/projects/${projectid}`)
        history.push(`/projects/${projectid}/to_do_lists`)
    if(history.location.pathname === `/projects/${projectid}/`)
        history.push(`/projects/${projectid}/to_do_lists`)

    async function addElementToList(listElement = {}) {
        const resp = await fetch(PROJECT_URL + `/${projectid}/to_do_lists`,{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        return resp.json(); 
    };

    useEffect (() => {  
        if(reload)
            setReload(!reload)
        fetch(PROJECT_URL + `/${projectid}/to_do_lists` + history.location.search)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
                dispatch(addToDoList(resp.to_do_lists, resp.meta))
        })
        .catch(error => {   
            return alert("Failed GET request from ProjectDetailsView. \nDetailed error: \"" + error + "\"");
        }); 
       
    },[projectid,
        dispatch,
        reload,
        history.location.search]);

    const renderListCards = (todolists) => {
        if(todolists && todolists.lists && todolists.meta){
            return todolists.lists.map (listCard => {
                return (<ListCard 
                    key = {listCard.id}
                    name = {listCard.name}
                    projectid = {projectid}
                    taskid = {listCard.id}
                    />)               
            })
        }
        else{
            return <Loader
                type = "ThreeDots"
                color = 'rgb(82, 167, 82)'
                height = {50}
                width = {50}
                timeout = {3000}
                />
        }
    }

    return(
        <div>
            <TopHeader title = "backtoprojects" />
            <div className = "Top">
                <div className = "Heavy"> To-dos </div>
                <div className = "MiddleDetailViewPart">

                    <div>
                        {renderListCards(todolists)}
                    </div>
                    <div className = "ButtonWrapper">  
                        <form onSubmit = {(event) => event.preventDefault()}>
                            <label>
                                <input className="NoOutline" type = "text" placeholder = "Name this list..."
                                value = {text} onChange = {(event) => setText(event.target.value)}/>
                            </label>
                            <div className = "ButtonForm">
                            <Button type = "submit" 
                                disabledProperties = {text.trim().length  < 6}
                                buttonClass = {text.trim().length  > 5 ? "Proper" : "NotProper"}
                                buttonText = {"Add on click"}
                                onClickFunction = {() => {
                                    
                                    addElementToList({name: text})
                                    setReload(!reload)
                                    setText("")
                                }
                            }/>
                            </div>
                        </form>
                    </div>
                    <div className = "PaginationPosition">
                        <PaginationBar
                            position = "ProjectDetails"
                            onClickFunction = {(number) => {
                                history.push(`?page=${number}`)
                            }}
                        />
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailView
