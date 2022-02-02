const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Gets back all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

//submits a post
router.post('/', async (req, res)=> {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

   try {
    const savedPost = await post.save();
    res.json(savedPost);
   } catch(err) {
       res.json({message:err});
   }
});

//Gets back a specific post
router.get('/:postId', async (req, res)=>{
   try {
    const findPost = await Post.findById({_id: req.params.postId});
    res.json(findPost);
   } catch(err) {
       res.json({message:err});
   }
})

//Delete a specific post
router.delete('/:postId', async (req, res)=> {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.postId);
        res.json(deletePost);
    } catch(err) {
        res.json({message:err});
    }
})

//Update a specific post
router.patch('/:postId', async (req, res)=> {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {
            $set: {
                title: req.body.title
            }
        });

        res.json(updatedPost);

    }catch (err) {
        res.json({message:err});
    }
})

module.exports = router;