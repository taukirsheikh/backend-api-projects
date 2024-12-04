const User = require('../Schema/User');

const addExercise = async (req, res) => {
    try {
        console.log("Adding exercise");
        const { _id } = req.params;
        const { description, duration, date=new Date().toDateString() } = req.body;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let exercise = { description, duration, date: new Date(date).toDateString() }
        Object.assign(user, exercise);
        user.log.push(exercise);
        console.log(user);
        await user.save();
        // Optionally exclude 'log' field from the response:
        const { log, ...userWithoutLog } = user.toObject();
        res.json(userWithoutLog);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = addExercise;