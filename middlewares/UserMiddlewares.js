const { User } = require('../models/UserModel');

const userExists = async (request, response, next) => {
    console.log('corre middlewares');
    try {
        const { id } = request.params;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return response.status(404).json({
                status: 'error',
                message: 'User not found given that id.',
            });
        }
        request.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = { userExists };
