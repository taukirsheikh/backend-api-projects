const User = require('../Schema/User')
const SaveAndRetriveUser =async(req,res)=>{
    try{
        console.log("Saving user");
        const {username} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(409).json({ error: 'Username already exists' });
        }
        const user = new User({username});
        await user.save();
        console.log(user);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: error});
    }

}

module.exports = SaveAndRetriveUser;