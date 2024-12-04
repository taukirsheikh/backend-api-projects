const User = require('../Schema/User');

const getExerciseLogs=async(req,res) =>{
    try{
        const {_id}=req.params;
        const users = await User.findById(_id).select('-description -duration -date');
        res.json(users);
    }catch(error){
        res.status(400).json({error: error});
    }

}
module.exports=getExerciseLogs