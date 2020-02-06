import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { PROJECT_URL } from '../../constants'
import { getCommentsList } from '../../Actions'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import PaginationBar from '../../Components/PaginationBar/PaginationBar'
import Comment from './Comment'
import './CommentsList.css'
import Button from '../../Components/Button/Button'

const Comments = () => {

    let {projectid} = useParams()
    let {listid} = useParams()

    let history = useHistory()

    const[visibleComments, setVisibleComments] = useState(false)


    const comments = useSelector(state => state.comments)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }
            else{
                return resp.json();
            }
        })
        .then(resp => {
            dispatch(getCommentsList(resp.comments, resp.meta))
        })
        .catch(error => {
            return alert("Failed GET request from ToDosView. \nDetailed error: \"" + error + "\"");
        });
    },[dispatch, listid, projectid, history.location.search])

    const renderCommentsList = (commentsList) => {
        if(commentsList && commentsList.comments){
            return (
                visibleComments ?
                commentsList.comments.map (comment => {
                return (
                    <Comment 
                        key = {comment.id} 
                        name = {comment.user_name} 
                        description = {comment.body}
                    />
                    )
                })
                : ""
            )
        }
        else{
            return <Loader
            type = "ThreeDots"
            color = 'rgb(82, 167, 82)'
            height = {100}
            width = {100}
            timeout = {3000}
            />    
        }
    }

    const renderAmountOfComments = (comments) => {
        if(comments && comments.meta && comments.meta.total_count)
            return comments.meta.total_count;

        return "0";
    }

    const renderTopBar = () => {
        return(
            visibleComments ? (
                <div className = "CommentsTopBarContainer">
                    <div className = "CommentsTopBarCircle">
                        {renderAmountOfComments(comments)}
                    </div>
                    <div className = "CommentsTopBarInfo">
                        Comments
                    </div>   
                    <div className = "CommentsHr"/>
                </div>
            )
            : ""
        )
    }

    const renderPagination = () => {
        return(
            visibleComments ? (
                <PaginationBar 
                    onClickFunction = {number => 
                        history.push(`?page=${number}`)
                    }
                    position = {"Comments"}
                />)
                : "")
    }

    return(
        <div className = "CommentsSection">
            <div className = {visibleComments ? "Hidden" : "CommentsButton" }>
                <Button 
                    buttonText = {"Show Comments"}
                    buttonClass = {"CommentButton"}
                    onClickFunction = {() => {
                        setVisibleComments(true);
                    }}
                />
            </div>
                {renderTopBar()}
                {renderCommentsList(comments)}
                {renderPagination()}
        </div>
    )
}

export default Comments