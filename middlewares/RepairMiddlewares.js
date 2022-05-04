const { Repair } = require('../models/RepairModel');

const repairExists = async (request, response, next) => {
    try {
        const { id } = request.params;

        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return response.status(404).json({
                status: 'error',
                message: 'Repair not found given that id.',
            });
        }
        request.repair = repair;
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = { repairExists };