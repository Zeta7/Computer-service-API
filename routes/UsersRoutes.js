const express = require('express');
const {
    userExists,
    protectAccountOwner,
    protectAdmin,
    protectToken,
} = require('../middlewares/UserMiddlewares');
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
    loginUser,
} = require('../controllers/UsersController');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);
router.route('/login').post(loginUser);

router.use(protectToken);
router.route('/').get(protectAdmin, getAllUsers);
router
    .route('/:id')
    .get(protectAdmin, userExists, getUserById)
    .patch(userExists, protectAccountOwner, updateUser)
    .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRoutes: router };
