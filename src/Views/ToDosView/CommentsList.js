import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { PROJECT_URL } from '../../constants'
import { getComments, deleteComment } from '../../Actions'
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
        dispatch(getComments(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search))

    }, [dispatch, listid, projectid, history.location.search, props.visible])
 
    const renderTopBar = () => {
        return(
            <div className = "CommentsTopBarContainer">
                <div className = "CommentsTopBarCircle">
                    {comments.meta.total_count}
                </div>
                <div className = "CommentsTopBarInfo">
                    Comments
                </div>   
                <div className = "CommentsHr"/>
                <div className = "CommentsCurrentPage">
                    {comments.meta.current_page}
                </div>
            </div>
        )
    }

    const indexOfElement = (itemId) => {
        for(let i = 0; i < comments.comments.length; i++)
        {
            if(comments.comments[i].id === itemId)
                return i;
        }
        return null;
    }


    const renderCommentsList = (commentsList) => {
        return (commentsList.comments.map (comment => {
            return (
                <Comment 
                    key = {comment.id} 
                    name = {comment.user_name} 
                    description = {comment.body}
                    date = {comment.post_date}

                    onDeleteComment = {() => {
                        dispatch(deleteComment(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments/${comment.id}`,{
                            id: comment.id
                        },`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search),
                            comments.comments.splice(indexOfElement(comment.id),1),
                            //reloadComments(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search)
                            //getCommentsMeta(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search)
                        )
                        //dispatch(getComments(`${PROJECT_URL}/${projectid}/to_do_lists/${listid}/comments` + history.location.search))
                    }}


                />
                )
            })
        )
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




// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'
// return <Loader
// type = "ThreeDots"
// color = 'rgb(82, 167, 82)'
// height = {100}
// width = {100}
// timeout = {3000}/>
