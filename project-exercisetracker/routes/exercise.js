const express=require('express')
const router = express.Router();
const UserSchema = require('../Schema/User')
const SaveAndRetriveUser = require('../utils/userSaveandRetrive') //
const getAllUsers = require('../utils/getAllUsers')
const addExercise = require('../utils/addExercise')
router.post('/users', SaveAndRetriveUser);
router.get('/users', getAllUsers);
router.post('/users/:_id/exercises', addExercise);

module.exports = router;