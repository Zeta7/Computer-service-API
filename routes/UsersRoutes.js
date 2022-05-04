const express = require('express');
const { userExists } = require('../middlewares/UserMiddlewares');
const {
    createUserValidations,
    checkValidations,
} = require('../middlewares/ValidationsMiddlewares');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/UsersController');

const router = express.Router();

router.route('/').get(getAllUsers);
router.post('/', createUserValidations, checkValidations, createUser);

router
    .route('/:id')
    .get(userExists, getUserById)
    .patch(userExists, updateUser)
    .delete(userExists, deleteUser);

module.exports = { usersRoutes: router };
