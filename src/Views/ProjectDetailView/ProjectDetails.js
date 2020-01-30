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


const ProjectDetailView = () => {
    
    document.title = `To-Do List`

    const[text, setText] = useState("");

    const[todolists, setTodolist] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[amountOfPages, setAmountOfPages] = useState(1);
    const[amountOfToDos, setAmountOfToDos] = useState(1);
    const[perPage, setPerPage] = useState(1);

    let {projectid} = useParams();

    let history = useHistory();

    if(history.location.pathname === `/projects/${projectid}`)
        history.push(`/projects/${projectid}/to_do_lists`)
    if(history.location.pathname === `/projects/${projectid}/`)
        history.push(`/projects/${projectid}/to_do_lists`)

    useEffect (() => {   
        fetch(PROJECT_URL + `/${projectid}/to_do_lists` + history.location.search)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){
                console.log(resp.meta)
                setAmountOfPages(resp.meta.total_pages)
                setCurrentPage(resp.meta.current_page)
                setTodolist(resp.to_do_lists)
                setAmountOfToDos(resp.meta.total_count)
                setPerPage(resp.meta.per_page)
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {   
            return alert("Failed GET request from ProjectDetailsView. \nDetailed error: \"" + error + "\"");
        });          
    },[
        projectid,
        setTodolist, 
        setCurrentPage,
        setAmountOfPages,
        setAmountOfToDos,
        setPerPage,
        history.location.search]);

    const renderListCards = (todolists) => {
        return todolists.map (listCard => {
            return (<ListCard 
                key = {listCard.id}
                name = {listCard.name}
                projectid = {projectid}
                taskid = {listCard.id}            
                />)               
        })
    }

 async function addToDoList(listElement = {}) {
    const resp = await fetch(PROJECT_URL + `/${projectid}/to_do_lists`,{
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
                <div className = "Heavy"> To-dos </div>
                <div className = "MiddleDetailViewPart">
                    <div className = "PaginationPosition">
                        <PaginationBar
                            amountOfPages = {amountOfPages}
                            onClickFunction = {(number) => {
                                history.push(`?page=${number}`)
                            }}
                            currentPage = {currentPage}
                        />
                    </div>
                    
                    <div>
                        {/*renderListCards(todolists)*/}
                        {renderListCards(todolists.slice(0,perPage))}
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
                                    
                                    addToDoList({name: text})
                                    .then((element) => {
                                        if (amountOfToDos % perPage === 0){
                                            setAmountOfPages(amountOfPages + 1)
                                        }
                                        setAmountOfToDos(amountOfToDos + 1)
                                        setTodolist([
                                            ...todolists,
                                            element
                                        ])
                                    })
                                    .catch(error => {
                                        return alert("Failed POST request from ProjectDetailView. \nDetailed error: \"" + error + "\"");
                                    })
                                    setText("")
                                }
                            }/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailView
