import React, {useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import {UserContext} from '../UserContext'

function Comments(props) {
    const {User} = useContext(UserContext)
    const {id} = useParams()
    const [input,setInput] = useState({
    comment:''
    })
    const isTextareaDisabled = input.comment.length===0
    function handleChange(event){
        const {name,value} = event.target
        setInput((prevInput) =>{
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event){
        event.preventDefault()
        const newComment = {
            comment: input.comment,
            threadId: id,
            userID: User.googleId,
            user: User.name
        }
        axios.post('http://localhost:3001/api/comment/createComment', newComment)
         .then((response)=>{
            if(response.data.success){
                props.refreshFunction(response.data.result)
                
            }
            else{
                alert('Failed to save comment')
            }
        })
    }
    const mystyle = {
        color: "white",
        backgroundColor: "black",
        padding: "8px",
        border: "1.8px solid #555555",
        borderRadius: "10px"
      };
      
    return(
        <div>
            <br/>
            {/* Root Comment Form */}
            <form>
                <div class="form-group">
                    <input onChange={handleChange} name="comment" value={input.comment} autoComplete="off" 
                        className="comment-form-textarea" placeholder="Penny for your thoughts?"/>
                </div> 
                <button style={mystyle} onClick={handleClick} className="comment-form-button"
                     disabled={isTextareaDisabled}>Comment</button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3vh' }}></div>
            <p className='thread-form-title'> Comments </p>
            {props.CommentLists && props.CommentLists.map((comment,index) => (
            (!comment.responseTo && 
                <React.Fragment>
                    <div className="parent-comment-width">
                        <SingleComment CommentLists={props.CommentLists} comment={comment} threadId={id} 
                            refreshFunction={props.refreshFunction} deleteComment={props.deleteComment} editComment={props.editComment} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} threadId={id}
                            refreshFunction={props.refreshFunction} deleteComment={props.deleteComment} editComment={props.editComment} />
                    </div>
                </React.Fragment>
            )))}

        </div>
    )
}

export default Comments 
