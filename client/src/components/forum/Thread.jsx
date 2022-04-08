import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import Comments from './Comments'
import {UserContext} from '../UserContext'
import {useNavigate} from "react-router-dom";

function Thread(){
    let navigate = useNavigate()
    const {User} = useContext(UserContext)
    const {id} = useParams()
    const [CommentLists,setCommentLists] = useState([])
    const [data,setData] = useState({
        title:'',
        content:'',
        user:'',
        userId:''
    })
    const threadId = {
        threadId:id
    }
    useEffect(() =>{
        axios.get(`/api/thread/${id}`)
         .then((res) => {
             let text = {
                 title: res.data.title,
                 content: res.data.content,
                 user: res.data.user,
                 userId: res.data.userId
             }
             setData(text)
         })

        axios.post("/api/comment/getComment",threadId)
         .then((response)=>{
             if(response.data.success){
                 setCommentLists(response.data.comments)
             }
             else{
                 alert('Failed to get comments')
             }
         })
    }, [CommentLists.length])

    function updateComment(incomingComment){
        setCommentLists(CommentLists.concat(incomingComment))
    }

    let index=0
    function deleteComment(comment){
        for (let i = 0; i<CommentLists.length; i++){
            if(CommentLists[i]._id === comment._id){
                index = i
            }
        }
        setCommentLists(CommentLists.splice(index,1))
    }

    function editComment(comment){
        for (let i = 0; i<CommentLists.length; i++){
            if(CommentLists[i]._id === comment._id){
                index = i
            }
        }
        setCommentLists(CommentLists.splice(index,1))
        setCommentLists(CommentLists.concat(comment))

    }

    function deleteThread(event){
        event.preventDefault()
        axios.delete('/api/thread/deleteThread', {data: {
            threadId: id}
        })
            .then((response) =>{
                if(response.data.success){
                    alert("Thread has been successfully deleted")
                }
                else{
                    alert("There was an error deleting the thread")
                }
            })
        navigate('/forum')
    }

    const content = {
        color: "black",
        padding: "8px",
        fontSize:"30px"
    };
    const title = {
        color: "black",
        padding: "8px",
        fontSize:"70px"
    };

    const userName = {
        color: "black",
        fontSize:"15px"
    }

    return(
        
    <div class="container"> 
            {console.log("User Id is :", data.userId , "Google Id is: ",Number(User.googleId))}
            <h2 style={userName}>Posted by: {data.user}</h2>
            <div onClick={deleteThread} className="comment-action" 
                style={{visibility: data.userId ===  Number(User.googleId) ? "visible" : "hidden"}} >Delete</div>
            <h2 style={title}>{data.title}</h2>
            <p style={content}>{data.content}</p>
            <Comments CommentLists={CommentLists} refreshFunction={updateComment} deleteComment={deleteComment} editComment={editComment}/>
    </div>
    )
}

export default Thread;
