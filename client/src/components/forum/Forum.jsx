import React, {useState, useEffect } from "react"; //To handle change, need to track the state of the input
import {Link} from "react-router-dom";
import Pagination from './Pagination';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Forum(){

    const [threads, setThreads] = useState([{
        title:'',
        content:''
    }])

    const[pageNumber,setPageNumber] = useState(1)
    const[postPerPage] = useState(10)

    useEffect(() =>{
        fetch('/api/thread/getThread')
         .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(jsonRes => setThreads(jsonRes))
    }, [])

    const indexOfLastPost = pageNumber * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = threads.slice(indexOfFirstPost, indexOfLastPost)
    
    function paginate(pageNumber){
        setPageNumber(pageNumber)
    }

    return(
        <div class="container">
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1 class="font-weight-light">Forum</h1>
        </div>

        <div class ="row">
        <div class="col-lg-10">
        <h3 style ={{fontFamily:'Playfield display',fontWeight:'bold', height:'10vh'}}> Current Threads</h3>
        </div>

        <div class="col-lg-2">
        <NavLink className="nav-link" to="/createPost">
            <Button>CREATE A POST</Button>
        </NavLink>
        {/* <Link to="/createPost" className="btn btn-primary">Create Post</Link> */}
        </div>

        <div class="container">
        {currentPosts.map((thread) =>(

            <div key={String(thread._id)}>
              <h4 style ={{fontFamily:'Arial',fontWeight:'bold'}}> 
                <Link to={`/thread/${String(thread._id)}`}>{thread.title}</Link>
              </h4>
                <p>{thread.content}</p>
            </div>
        ))}
        <Pagination postPerPage={postPerPage} totalPosts={threads.length} paginate={paginate}/> 
        </div>
        </div>
      </div>
    )

}
const Button = styled.button`
  background-color: white;
  padding: 8px 8px 8px 32px;
  color: black;
  font-size: 12px;
  border-radius: 10px;
  margin: 1px 100px
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABmJLR0QA/wD/AP+gvaeTAAAA7UlEQVQ4jb2UTQ6CQAyFv4gxEXfq0jvoxp97qZxJb+Fag3oBFihnYKESXdCJk8kUERNf0jTTljd9pQB/RgD0xTdCD4iAGCiAJ/CQ8xoI6xItgEwINLsC8zpE+QciYzkwq5KmdXRS4hdNclQhCfG+/MpHFivFieQTJX8wBG3xATB2yDPg5nQG0AFGVt1Eni9MYOjcdvS1bsGd4cBOBpR75M4qAXZSs5OzO7s7noVuOrO9IWhZZBtFUsfxLra+YOiRYOysxFOgq1zCnO++gKlGZDCj3OwqorQOkS15RbmQd95v7QAsq6R9ws//s0Z4AYPMj/ARKOC7AAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: 8px 8px;
`;
export default Forum;
