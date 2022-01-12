const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log('Method: ', req.method, '|URL: ', req.url, '|Timestamp: ', Date.now());
  next();
}

async function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id)
  if(user){
    req.user = user
    next()
  } else {
    next({ status: 404, message: "user not found" })
  }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    next({ status: 400, message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text){
    next({ status: 400, message: "missing required text field" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}