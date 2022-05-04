const { User } = require('../models/UserModel');

const getAllUsers = async (request, response) => {
    try {
        const users = await User.findAll();
        response.status(200).json({ users });
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (request, response) => {
    try {
        const { user } = request;
        response.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const newUser = await User.create({ name, email, password });
        response.status(201).json({ newUser });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (request, response) => {
    try {
        const { user } = request;
        const { name, email, password } = request.body;
        await user.update({ name, email, password });
        response.status(200).json({ status: 'succes' });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (request, response) => {
    try {
        const { user } = request;
        await user.update({ status: 'disable' });

        response.status(200).json({ status: 'succes' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
