const { Repair } = require('../models/RepairModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const repairExists = catchAsync(async (request, response, next) => {
    const { id } = request.params;

    const repair = await Repair.findOne({
        where: { id },
        status: 'pending',
    });
    if (!repair) {
        return next(new AppError('Repair not found given that id.', 404));
    }
    request.repair = repair;
    next();
});
module.exports = { repairExists };
