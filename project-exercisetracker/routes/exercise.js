const express=require('express')
const router = express.Router();
const UserSchema = require('../Schema/User')
const SaveAndRetriveUser = require('../utils/userSaveandRetrive') //

router.post('/users', SaveAndRetriveUser);

module.exports = router;