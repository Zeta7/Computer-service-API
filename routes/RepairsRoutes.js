const express = require('express');
const router = express.Router();
const { repairExists } = require('../middlewares/RepairMiddlewares');

const {
    getAllRepair,
    getIdRepair,
    createRepair,
    updateRepair,
    deleteRepair,
} = require('../controllers/RepairsController');

router
    .route('/')
    .get(getAllRepair)
    .post(createRepair);

router
    .route('/:id')
    .get(repairExists, getIdRepair)
    .patch(repairExists, updateRepair)
    .delete(repairExists, deleteRepair);

module.exports = { repairsRoutes: router };
