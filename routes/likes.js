const express=require('express');
const router=express.Router();

const like_controller=require('../controllers/likes_controller');

router.post('/toggle',like_controller.like);

module.exports=router;