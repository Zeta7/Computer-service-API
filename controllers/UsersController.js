const { User } = require('../models/UserModel');
const { catchAsync } = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const getAllUsers = catchAsync(async (request, response, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    response.status(200).json({ users });
});

const getUserById = catchAsync(async (request, response, next) => {
    const { user } = request;
    user.password = undefined;
    response.status(200).json(user);
});

const createUser = catchAsync(async (request, response, next) => {
    const { name, email, password, role } = request.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role: role || 'client',
    });

    newUser.password = undefined;
    response.status(201).json({ newUser });
});

const updateUser = catchAsync(async (request, response, next) => {
    const { user } = request;
    const { name } = request.body;
    await user.update({ name });
    response.status(200).json({ status: 'succes' });
});

const deleteUser = catchAsync(async (request, response, next) => {
    const { user } = request;
    await user.update({ status: 'deleted' });
    response.status(200).json({ status: 'succes' });
});

const loginUser = catchAsync(async (request, response, next) => {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email, status: 'active' } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }
    //generato json web token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;
    response.status(200).json({ token, user });
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};
