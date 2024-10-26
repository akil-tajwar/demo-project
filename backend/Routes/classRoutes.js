const express = require("express");
const {
    createClass,
    getAllClass,
    deleteClass,
    updateClass
} = require("../Controllers/classController");

const router = express.Router();


//post
router.post('/createClass', createClass);

//get
router.get('/getAllClass', getAllClass);

//delete
router.delete('/deleteClass/:id', deleteClass);

//patch
router.patch('/updateClass/:id', updateClass);


module.exports = router;