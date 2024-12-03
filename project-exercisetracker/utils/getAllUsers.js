const User = require('../Schema/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username');
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = getAllUsers;