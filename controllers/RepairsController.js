const { Repair } = require('../models/RepairModel');
const { User } = require('../models/UserModel');
const { catchAsync } = require('../utils/catchAsync');

const getAllRepair = catchAsync(async (request, response, next) => {
    const repairs = await Repair.findAll({
        include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    response.status(200).json({ repairs });
});

const getIdRepair = catchAsync(async (request, response, next) => {
    const { repair } = request;
    response.status(200).json(repair);
});

const createRepair = catchAsync(async (request, response, next) => {
    const { date, computerNumber, comments, userId } = request.body;
    const newRepair = await Repair.create({
        date,
        computerNumber,
        comments,
        userId,
    });
    response.status(201).json({ newRepair });
});

const updateRepair = catchAsync(async (request, response, next) => {
    const { repair } = request;
    const { status } = request.body;
    await repair.update({ status });
    response.status(200).json({ status: 'succes' });
});

const deleteRepair = catchAsync(async (request, response, next) => {
    const { repair } = request;
    await repair.update({ status: 'cacelled' });
    response.status(200).json({ status: 'succes' });
});

module.exports = {
    getAllRepair,
    getIdRepair,
    createRepair,
    updateRepair,
    deleteRepair,
};
