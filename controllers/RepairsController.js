const { Repair } = require('../models/RepairModel');
const { User } = require('../models/UserModel');

const getAllRepair = async (request, response) => {
    try {
        const repairs = await Repair.findAll({
            include: [{ model: User }],
        });
        response.status(200).json({ repairs });
    } catch (error) {
        console.log(error);
    }
};

const getIdRepair = async (request, response) => {
    try {
        const { repair } = request;
        response.status(200).json(repair);
    } catch (error) {
        console.log(error);
    }
};

const createRepair = async (request, response) => {
    try {
        const { date, computerNumber, comments, userId } = request.body;
        const newRepair = await Repair.create({
            date,
            computerNumber,
            comments,
            userId,
        });
        response.status(201).json({ newRepair });
    } catch (error) {
        console.log(error);
    }
};

const updateRepair = async (request, response) => {
    try {
        const { repair } = request;
        const { date, comments } = request.body;
        await repair.update({ date, comments });
        response.status(200).json({ status: 'succes' });
    } catch (error) {
        console.log(error);
    }
};

const deleteRepair = async (request, response) => {
    try {
        const { repair } = request;
        await repair.update({ status: 'disable' });
        response.status(200).json({ status: 'succes' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllRepair,
    getIdRepair,
    createRepair,
    updateRepair,
    deleteRepair,
};
