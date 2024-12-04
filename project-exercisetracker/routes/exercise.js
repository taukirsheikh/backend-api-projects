const express=require('express')
const router = express.Router();
const UserSchema = require('../Schema/User')
const SaveAndRetriveUser = require('../utils/userSaveandRetrive') //
const getAllUsers = require('../utils/getAllUsers')
const addExercise = require('../utils/addExercise')
const getExerciseLogs = require('../utils/getExerciseLogs')

router.post('/users', SaveAndRetriveUser);
router.get('/users', getAllUsers);
router.post('/users/:_id/exercises', addExercise);
router.get('/users/:_id/logs', getExerciseLogs);

module.exports = router;