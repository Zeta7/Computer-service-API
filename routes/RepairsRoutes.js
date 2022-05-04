const express = require('express');
const { repairExists } = require('../middlewares/RepairMiddlewares');
const {
    createRepairValidations,
    checkValidations,
} = require('../middlewares/ValidationsMiddlewares');

const {
    getAllRepair,
    getIdRepair,
    createRepair,
    updateRepair,
    deleteRepair,
} = require('../controllers/RepairsController');
const { Router } = require('express');

const router = express.Router();

router.route('/').get(getAllRepair);
router.post('/', createRepairValidations, checkValidations, createRepair);

router
    .route('/:id')
    .get(repairExists, getIdRepair)
    .patch(repairExists, updateRepair)
    .delete(repairExists, deleteRepair);

module.exports = { repairsRoutes: router };
