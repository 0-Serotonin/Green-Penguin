import React, {useState,useContext} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {UserContext} from "../UserContext";

function CreatePost(){
    const {User} = useContext(UserContext);
    let navigate = useNavigate()
    const [input, setInput] = useState({ //will track the two fields, title and content
        title:'',
        content:''
    })
    const isTextareaDisabled = (input.content.length===0 || input.title.length===0 || input.title.length>50 || input.content.length>500)

    function handleChange(event){
        const {name, value} = event.target;
        setInput(prevInput =>{
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event){
        event.preventDefault();
        const newThread = {
            title: input.title,
            content: input.content,
            userID: User.googleId,
            user: User.name,
            userId: User.googleId
        }
        axios.post('/api/thread/createThread', newThread)
        navigate('/forum')
    }

    return(
        <div className="container">
            <h1 className="thread-form-title">New Post</h1>
            <form>
                <div class="form-group">
                    <input onChange={handleChange} name="title" value={input.title} autoComplete="off" className="title-form-textarea" placeholder="Insert title here (Limit to 50 characters)"></input>
                </div>
                <div class="form-group">
                    <textarea onChange={handleChange} name="content" value={input.content} autoComplete="off" className="comment-form-textarea" placeholder="Insert content here (Limit to 500 characters)"></textarea>
                </div>
                <button  onClick={handleClick} className="btn btn-lg btn-info" disabled={isTextareaDisabled}>Create Thread</button>
            </form>
        </div>
    )

}

export default CreatePost;