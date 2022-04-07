import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Comments from './Comments'


function Thread(){
    const {id} = useParams()
    const [CommentLists,setCommentLists] = useState([])
    const [data,setData] = useState({
        title:'',
        content:'',
        user:''
    })
    const threadId = {
        threadId:id
    }
    useEffect(() =>{
        fetch(`http://localhost:3001/api/thread/${id}`)
         .then((res) =>{
             if(res.ok){
                 return res.json()
             }
         })
         .then((foundThread) => {
             let text = {
                 title: foundThread.title,
                 content: foundThread.content,
                 user: foundThread.user
             }
             setData(text)
         })

        axios.post("http://localhost:3001/api/comment/getComment",threadId)
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
            <h2 style={userName}>Posted by: {data.user}</h2>
            <h2 style={title}>{data.title}</h2>
            <p style={content}>{data.content}</p>
            <Comments CommentLists={CommentLists} refreshFunction={updateComment} deleteComment={deleteComment} editComment={editComment}/>
    </div>
    )
}

export default Thread;
