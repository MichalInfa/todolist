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

const Comments = (props) => {

    let {projectid} = useParams()
    let {listid} = useParams()

    let history = useHistory()

    const[visibleComments, setVisibleComments] = useState(false)

    const comments = useSelector(state => state.comments)
    const dispatch = useDispatch()

    useEffect(() => {
        setVisibleComments(props.visible)

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
    },[dispatch, listid, projectid, history.location.search, props.visible])

    // async function deleteComment(url = '', listElement = {}){
    //     await fetch(url, {
    //          method: "DELETE",
    //          headers: {
    //              "Content-type": "application/json; charset=UTF-8"
    //          },
    //          body: JSON.stringify(listElement)
    //      })
    //      .catch(error => {
    //          return alert("Failed DELETE request from ToDosView. \nDetailed error: \"" + error + "\"");
    //      });  
    //  }
 

    const renderAmountOfComments = (comments) => {
        if(comments && comments.meta && comments.meta.total_count)
            return comments.meta.total_count;

        return "0";
    }

    const renderCurrentPage = (comments) => {

        if(comments && comments.meta && comments.meta.current_page)
            return comments.meta.current_page;

        return "1";
    }

    const renderTopBar = () => {
        return(
            <div className = "CommentsTopBarContainer">
                <div className = "CommentsTopBarCircle">
                    {renderAmountOfComments(comments)}
                </div>
                <div className = "CommentsTopBarInfo">
                    Comments
                </div>   
                <div className = "CommentsHr"/>
                <div className = "CommentsCurrentPage">
                    {renderCurrentPage(comments)}
                </div>
            </div>
        )
    }

    const renderCommentsList = (commentsList) => {
        if(commentsList && commentsList.comments){
            return (
                commentsList.comments.map (comment => {
                return (
                    <Comment 
                        key = {comment.id} 
                        name = {comment.user_name} 
                        description = {comment.body}
                        date = {comment.post_date}

                        onDeleteComment = {() => {
                            /*deleteComment(``,{
                                id: taskList.id
                            })
                            .then(() => {
                                tasks.tasks.splice(indexOfElement(taskList.id),1)
                                dispatch(getTaskList(tasks.tasks))
                                }
                            )
                            */
                        }}
                    />
                    )
                })
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

    const renderPagination = () => {
        return(
            <PaginationBar 
                onClickFunction = {number => 
                    history.push(`?page=${number}`)
                }
                position = {"Comments"}
            />)
    }

    const renderCommentSection = () => {
        return (
            visibleComments ?
            (
                <div className = "CommentsSection">
                    {renderTopBar()}
                    {renderCommentsList(comments)}
                    {renderPagination()}
                </div>
            )
            :
            ""
        );
    }

    return(
        <>
        {renderCommentSection()}
        </>
    )
}

export default Comments