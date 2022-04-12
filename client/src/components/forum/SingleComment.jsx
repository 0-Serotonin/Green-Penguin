import React, { useState, useContext } from 'react'
import axios from 'axios'
import {UserContext} from '../UserContext'

function SingleComment(props) {
    const {User} = useContext(UserContext)
    const [EditCommentValue, setEditCommentValue] = useState({
        content:props.comment.comment,
    })
    const [CanEdit, setCanEdit] = useState(false)
    const [OpenReply, setOpenReply] = useState("")
    const [CommentValue, setCommentValue] = useState({
        content:'',
    })
    const isTextareaDisabled = (CommentValue.content.length===0 || User === '')

    function handleClick(event){
        console.log('Comment Clicked')
        event.preventDefault()
        const variable ={
            comment:CommentValue.content,
            threadId:props.threadId,
            responseTo:props.comment._id,
            userID: Number(User.googleId),
            user: User.name
        }
        
        axios.post('/api/comment/createComment', variable)
            .then(response =>{
                if(response.data.success){
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                }
                else{
                    alert('Comment could not be posted')
                }
            })
    }

    function handleChange(event){
        const {name, value} = event.target
        setCommentValue(prevInput =>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }

    function enableReply(event){
        event.preventDefault()
        setOpenReply(!OpenReply)
    }
    
    function deleteReply(event){
        event.preventDefault()
        axios.delete('/api/comment/deleteComment', {data: {
            commentId: props.comment._id}
        })
            .then((response) =>{
                if(response.data.success){
                    alert("Comment has been successfully deleted")
                    props.deleteComment(props.comment)
                    
                }
                else{
                    alert("There was an error deleting the comment")
                }
            })
        
    }

    function editComment(event){
        const {name, value} = event.target
        setEditCommentValue((prevInput) =>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }

    function updateComment(event){
        event.preventDefault()
        const updateComment = {
            content: EditCommentValue.content,
            commentId: props.comment._id
        }
        axios.post('/api/comment/updateComment', updateComment)
            .then((response) => {
                if(response.data.success){
                    alert("Comment edited successfully")
                    props.editComment(props.comment)
                    
                }
                else{
                    alert("Comment edit failed")
                }
            })
    }


    function editReply(event){
        event.preventDefault()
        setCanEdit(!CanEdit)
    }

    const userName = {
        color: "black",
        fontSize:"15px",
        fontStyle: "italic"
    }

    return (
        
        <div>
            <h3 style={userName}>{props.comment.user} commented: </h3>
            <h5>{props.comment.comment}</h5>
            <div className='comment-actions'>
                        <div onClick={enableReply} className="comment-action">Reply</div>
                        <div onClick={editReply} className="comment-action" 
                            style={{visibility: props.comment.userID ===  Number(User.googleId) ? "visible" : "hidden"}}  >Edit</div>
                        <div onClick={deleteReply} className="comment-action" 
                            style={{visibility: props.comment.userID ===  Number(User.googleId) ? "visible" : "hidden"}} >Delete</div>
            </div>
            {OpenReply && (
            <form>
                <div>
                    <textarea onChange={handleChange} name="content" value={CommentValue.content} autoComplete="off"
                        className="comment-form-textarea" placeholder='Reply here'></textarea>
                </div>
                <button onClick={handleClick} className="comment-form-button comment-form-cancel-button" disabled={isTextareaDisabled}>Submit</button>
            </form>
            )}

            {CanEdit &&  (
                <form>
                    <div>
                        <textarea  onChange={editComment} name="content" value={EditCommentValue.content} autoComplete="off"
                            className="comment-form-textarea"></textarea>
                    </div>
                    <button onClick={updateComment} className="comment-form-button comment-form-cancel-button">Submit</button>
                </form>
            )
            }

        </div>
        
    )
}

export default SingleComment