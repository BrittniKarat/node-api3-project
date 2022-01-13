const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const Posts = require('../posts/posts-model')
const Users = require('./users-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const allUsers = await Users.get()
    res.status(200).json(allUsers)
  }
  catch(err) {
    next(err)
  } 
});

router.get('/:id', logger, validateUserId, async (req, res, next) => {
  try{
    const user = await Users.getById(req.user.id)
    res.status(200).json(user)
  }
  catch(err) {
    next(err)
  }
});

router.post('/', logger, validateUser, async (req, res, next) => {
   try{
     const newUser = await Users.insert(req.body)
     res.status(201).json(newUser)
   }
   catch(err){
     next(err)
   }
});

router.put('/:id', logger, validateUserId,  validateUser, async (req, res, next) => {
  try{
   const updatedUser = await Users.update(req.user.id, req.body)
   req.body.name === req.user.name ? next({ status: 400, message: "There is nothing to change" }) : res.status(200).json(updatedUser)
  }
  catch(err){
    next(err)
  }
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  try{
    await Users.remove(req.user.id)
    res.status(200).json(req.user)
  }
  catch(err){
    next(err)
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  try{
    const posts = await Users.getUserPosts(req.user.id)
    res.status(200).json(posts)
  }
  catch (err){
    next(err)
  }
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  try {
    const newPost = await Posts.insert({ user_id: req.user.id, ...req.body })
    console.log(newPost)
    res.status(201).json(newPost)
  } catch (err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router;