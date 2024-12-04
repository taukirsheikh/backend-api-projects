const User = require('../Schema/User');
const addExercise = async (req, res) => {
    try {
        console.log("Adding exercise");
        const { _id } = req.params;
        const {
          description,
          duration,
          date = new Date().toISOString().split('T')[0], // Default to current date if not provided
        } = req.body;


        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let exercise = { description, duration, date};
        Object.assign(user, exercise);
        user.log.push(exercise);
        user.count = user.log.length;
        
        await user.save();
        
        user.date = new Date(user.date).toDateString();
        // Optionally exclude 'log' field from the response
        const { log, count, ...userWithoutLog } = user.toObject();
        console.log(user);
        res.json(userWithoutLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = addExercise;
