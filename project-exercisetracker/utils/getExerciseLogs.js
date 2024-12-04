const User = require('../Schema/User');

const getExerciseLogs=async(req,res) =>{
    try{
        const {_id}=req.params;
        // GET /api/users/12345/logs?from=2024-01-01&to=2024-01-31&limit=10

        const { from, to, limit } = req.query;
        const users = await User.findById(_id).select('-description -duration -date');
        if(from) users.log=users.log.filter(item=>new Date(item.date) >= new Date(from));
        if(to) users.log=users.log.filter(item=>new Date(item.date) <= new Date(to));
        if(limit) users.log=users.log.slice(0, limit);
        // Convert date strings back to dates before returning
        users.log=users.log.map(item=>item.date=new Date(item.date).toDateString());
        res.json(users);
    }catch(error){
        res.status(400).json({error: error});
    }

}
module.exports=getExerciseLogs