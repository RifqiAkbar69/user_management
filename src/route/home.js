var express = require("express");
const router = express.Router()


router.get('/', (request, response) => {
    response.status(200).send( {
        message: "home",
    })
})

// router.get('/:id', (request, response) => {
//     const {id} = request.params
//     response.status(200).send( {
//         message: "home",
//         id: id,
//     })
// })

module.exports = router
