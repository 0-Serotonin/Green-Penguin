const express = require('express');
const router = express.Router()
const Comment = require('../models/commentModel')

router.route('/createComment').post((req,res) =>{
    console.log(req.body)
    let newComment = new Comment()
    const threadId = req.body.threadId
    const comment = req.body.comment
    const userID = req.body.userID
    const user = req.body.user
    if(req.body.responseTo){
        
        const responseTo = req.body.responseTo
        newComment = Comment({
            comment,
            threadId,
            responseTo,
            userID,
            user
        })
    }
    else{
        newComment = Comment({
            comment,
            threadId,
            userID,
            user
        })
    }
    console.log(`The new comment is ${newComment}`)
    newComment.save((err, newComment) =>{
        if(err) return res.json({success:false,err})
        Comment.find({"_id": newComment._id})
        .populate("threadId")
        .populate("responseTo")
        .exec((err,result) =>{
            if(err){
                return res.json({success:false,err})
            }
            return res.status(200).json({success:true,result})
        })
    })
})

router.route('/getComment').post((req,res) =>{
    Comment.find({"threadId": req.body.threadId})
        .populate("threadId")
        .exec((err,comments) =>{
            if(err) return res.json({success:false,err})
            res.status(200).json({success:true,comments})
        })
        
})

router.route('/deleteComment').delete((req,res) =>{
    Comment.deleteOne({_id: req.body.commentId})
        .exec((err) =>{
            if(err){
                return res.json({success:false,err})
            }
            res.status(200).json({success:true})
        })
    
})

router.route('/updateComment').post((req,res) =>{
    const filter = {_id: req.body.commentId}
    const update = {comment: req.body.content}
    Comment.findOneAndUpdate(filter,update)
        .exec((err, data) =>{
            if(err){
                return res.json({success:false, err})
            }
            res.status(200).json({success:true, data})
        })
})



module.exports = router