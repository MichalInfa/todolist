import React from 'react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './NewProjectCard.css'
import symbol_2 from '../../Images/symbol_2.png'
import Button from '../../Components/Button/Button'
import TopHeader from '../../Components/TopHeader/TopHeader'
import {PROJECT_URL} from '../../constants'

const NewProjectForm = () => {
    document.title = `Add project`
    const[projectname, setName] = useState("");
    
    const[projectdescription, setDescription] = useState("");

async function addObject(url = '', listElement = {}){
        const respond = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        return respond.json()
    } 

    let history = useHistory();
    return (
        <div>
            <TopHeader title = "backtoproject" />
        <div className = "Top">
            <div>
                <img className = "SmallLogo" src = {symbol_2} alt = ""/>
                <div className = "HeavyTitle">
                    All right, let's get your project started!<br />
                </div>
            </div>
            <div className = "Form">
                <form onSubmit = {(event) => event.preventDefault()}>
                    <label>
                        <p className = "Default">
                            Name this project
                        </p>
                        <div className = "BorderForm">
                            <input className = "FullSize" type = "text" placeholder = "e.g. Office renovation"
                            onChange = {(event) => setName(event.target.value)}/>
                         </div>
                    </label>
                    <label>
                        <p className = "Default">
                            Add an optional descripiton
                        </p>
                        <div className = "BorderForm">
                        <textarea className="Description"
                            placeholder = "e.g. Plans and scheduling for expanding office" 
                            onChange = {(event) => setDescription(event.target.value)}/>
                        </div>
                    </label>
                    <Button type = "submit"
                        disabledProperties = {projectname.trim().length  < 6}
                        buttonClass = {projectname.trim().length  > 5 ? "Proper" : "NotProper"}
                        buttonText = {"Create this project"}
                        onClickFunction = {() => {

                            addObject(PROJECT_URL,{
                                name: projectname,
                                description: projectdescription
                                })
                            .then(respond => {
                                if(respond != null){
                                history.push("/projects")
                                }
                            })
                            .catch(error => {
                                return alert("Failed POST request from NewProjectView. \nDetailed error: \"" + error + "\"");    
                            })
                            }
                        }/>
                </form>
            </div>
        </div>
    </div> 
    )
}

export default NewProjectForm