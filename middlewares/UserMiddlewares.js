const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const protectToken = catchAsync(async (request, response, next) => {
    let token;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
    ) {
        token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Sesion invalid', 403));
    }
    //VALIDATE TOKEN
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token is no longer avvalible', 403)
        );
    }

    request.sessionUser = user;
    next();
});

const protectAdmin = catchAsync(async (request, response, next) => {
    if (request.sessionUser.role !== 'admin') {
        return next(new AppError('Access not granted', 403));
    }
    next();
});

const userExists = catchAsync(async (request, response, next) => {
    const { id } = request.params;

    const user = await User.findOne({ where: { id, status: 'active' } });
    if (!user) {
        return next(new AppError('User not found given that id.', 404));
    }
    request.user = user;
    next();
});

const protectAccountOwner = catchAsync(async (request, response, next) => {
    const { user, sessionUser } = request;
    if (user.id !== sessionUser.id) {
        return next(new AppError('You cdo not own this account', 403));
    }
    next();
});

module.exports = {
    userExists,
    protectToken,
    protectAdmin,
    protectAccountOwner,
};
