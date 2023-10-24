var express = require("express");
const router = express.Router()

var userService = require("../services/userService.js")
router.get('/',userService.getAllUsers)
router.put('/:id',userService.editRoleUser)
router.get('/:id', userService.getUserById)




module.exports = router
