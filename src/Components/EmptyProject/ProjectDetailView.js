import React from 'react';
import './ProjectDetailView.css';
import ListCard from './ListCard';
import {useState, useEffect} from 'react';
import Button from '../Button/Button'


const ProjectDetailView = () => {
    const[text, setText] = useState("");
    const[todolists, setTodolist] = useState([]);



    const renderListCards = (todolists) => {
        return todolists.map (listCard => {
            return (<ListCard key = {listCard.id} name = {listCard.name}/>)
        })
    }

    const addItemToList = () => {
        setTodolist([ ...todolists, {id: todolists.length, name: text}]);
        console.log(todolists);
    }

    useEffect (() => {
            
        /*-------- metoda z promisami --------*/
        let usersId = [1,2,3];
        
        function getUserData(name) {
            return fetch(`https://api.github.com/users/${name}`)
                .then(resp => {
                    if(resp.status !== 200){
                        return null;
                    }
                    else{
                        return resp.json();
                    }
                });
        }

        Promise.all(usersId.map(getUserData))
        .then(res => console.log(res));

        
        /*-------- metoda z async -------- */
        async function getUsers(names) {
            let jobs = [];
              
            for(let name of names) {
                let job = fetch(`https://api.github.com/users/${name}`)
                    .then(successResponse => {
                        if (successResponse.status !== 200) {
                            return null;
                        } 
                        else {
                            return successResponse.json();
                        }
                    }, 
                    failResponse => {
                        return null;
                    });
                jobs.push(job);
            }            
            let results = await Promise.all(jobs);
            
            return results;
        }

        async function getResponse(){
            let users = await getUsers(['mojombo', 'remy', 'no.such.users']);
            console.log(users);
        }

        getResponse()
      
 /*
        fetch("https://api.github.com/users")
            .then(resp => {
                if(resp.status !== 200){
                    return null;
                }
                else
                {
                    return resp.json();
                }
            })
            .then(resp => {
                if(!null){
                console.log(resp);
                resp.forEach(user => {
                    console.groupCollapsed(`Użytkownik ${user.id}`)
                    console.log(`Login: ${user.login}`);
                    console.log(`Site_admin: ${user.site_admin}`);
                    console.log(`Type: ${user.type}`);
                    console.groupEnd();
                })
                }
                else{
                    console.log("Null!!!!");
                }
            })
            .catch(error => {
                if(error.status === 401){ 
                    console.log("Blad: Zadany adres nie istnieje")
                }
            });
*/
    },[]);
    

    return(
        <div className = "Top">
            <p className = "Heavy">
                To-dos
            </p>
            <hr />
            <div className = "MiddlePart">
                <div>{renderListCards(todolists)}</div>
                
                <div className = "ButtonWrapper">  
                    <form onSubmit = {(event) => {event.preventDefault()}}>
                        <label>
                            <input className="NoOutline" type = "text" placeholder = "Name this list..."
                            value = {text} onChange = {(event) => setText(event.target.value)}/>
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
        </div>
    );
}

export default ProjectDetailView
