import React from 'react'

const UserList = (props) =>{
    return (
        <div>
            <br />
            {props.id}
            <br /> 
            {props.login}
            <br />
            {props.site_admin}
            <br />
            {props.type}
            <br />
            {props.following}
            <br />
            {props.followers}
            <hr />
        </div>
    )
}

export default UserList