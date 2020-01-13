import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import UserList from './UserList'


const UserFetch = () => {
    const[users, setUser] = useState([]);

    const renderListCards = (users) => {
        return users.map (user => {
            return (<UserList 
                key = {user.id}
                id = {user.id}
                login = {user.login}
                site_admin = {user.site_admin}
                type = {user.type}
                following = {user.type}
                followers = {user.followers}
                />)
        })
    }
    useEffect (() => {   
        
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
            setUser(resp)
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
       
    },[]);

    return(
        <div>
        User Fetch
        <div>
            {renderListCards(users)}
            <br>
            
            </br>
        </div>
        </div>
    )

}

export default UserFetch


 /*-------- metoda z promisami --------
        let usersId = [1,2,'promise'];
        
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
        //.then(res => console.log(res));
        .then(resp => {
            if(!null){
            console.log(resp);
            resp.forEach(user => {

                console.log(users)
            })
            }
        })

        /*-------- metoda z async -------- 
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