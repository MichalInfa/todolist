import React from 'react'
import './Comment.css'
import Button from '../../Components/Button/Button'

const Comment = (props) => {

    return(
        <div className = "CommentsContainer">
            <div className = "CommentsCircle">
                {props.name[0]}
            </div>
            <div className = "CommentsArea">
                {props.name}
                <p className = "CommentDescription">
                    {props.description}
                </p>
            </div>
            <div className = "CommentsDate">
                {props.date}
            </div>
            <Button
                buttonClass = "DeleteComment"
                buttonText = "X"
                onClickFunction = {(event) => {
                    props.onDeleteComment(event)
                    event.preventDefault()
                }}
            />
        </div>
    )
}

export default Comment