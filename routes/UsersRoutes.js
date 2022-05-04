const express = require('express');
const router = express.Router();
const { userExists } = require('../middlewares/UserMiddlewares');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/UsersController');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(userExists, getUserById)
    .patch(userExists, updateUser)
    .delete(userExists, deleteUser);

module.exports = { usersRoutes: router };
