import React , {useEffect,useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    var [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    
    useEffect(() => {
        var commentNumber = 0
        props.CommentLists.map((comment) =>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists,props.parentCommentId])
    
    

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment,index) =>(
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId && 
                    <div className='child-comment-width'>
                        <SingleComment CommentLists={props.CommentLists} comment={comment} threadId={props.threadId} 
                            refreshFunction={props.refreshFunction} deleteComment={props.deleteComment} editComment={props.editComment} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} threadId={props.threadId}
                            refreshFunction={props.refreshFunction} deleteComment={props.deleteComment} editComment={props.editComment} />
                    </div>
                }
            </React.Fragment>
        ))
    
    function handleChange(event){
        event.preventDefault()
        setOpenReplyComments(!OpenReplyComments)
        setChildCommentNumber(ChildCommentNumber++)
    }
    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p className='view-comment-text' onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment