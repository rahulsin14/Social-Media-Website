const express = require('express');

const router = express.Router();
const USERApi=require('../../../controllers/api/v1/users_api');
router.post('/create-session',USERApi.createSession);
module.exports=router;