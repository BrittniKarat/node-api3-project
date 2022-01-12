const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
const Posts = require('../posts/posts-model')
const Users = require('./users-model')
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
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
   console.log("She shoots, she: ", updatedUser)
   res.status(200).json({ message: "You did something there"})
  }
  catch(err){
    console.log("ID: ", req.user.id, "name: ", req.user.name, "or", req.body)
    next(err)
  }
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // and another middleware to check that the request body is valid
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', logger, validateUserId, validatePost, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, validateUser, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;