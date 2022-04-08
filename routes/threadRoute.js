const express = require('express');
const router = express.Router()
const Thread = require('../models/threadModel')


router.route('/createThread').post((req,res) =>{    
    const title = req.body.title
    const content = req.body.content
    const user = req.body.user
    const userId = req.body.userId
    const newThread = new Thread({
        title,
        content,
        userId,
        user
    })
    newThread.save()
})

router.get('/getThread', (req,res) =>{
    console.log('Finding threads')
    Thread.find()
        .then(foundThread => res.json(foundThread))
        .catch(err => console.log(err));
    
})

router.route('/:id').get((req,res) =>{
    const id = req.params.id
    Thread.findById(id, (err,thread) =>{
        if(err){
            console.log(err)
        }
        else{
            res.status(200).json(thread)
        }
    })
})

router.route('/deleteThread').delete((req,res) =>{
    Thread.deleteOne({_id: req.body.threadId})
        .exec((err) =>{
            if(err){
                return res.json({success:false,err})
            }
            res.status(200).json({success:true})
        })
})

module.exports = router
