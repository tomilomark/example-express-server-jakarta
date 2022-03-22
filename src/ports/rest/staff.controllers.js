const express = require('express');
const router = express.Router();
const {dtoValidator} = require('../../infra/dto-validator');
const {employeeDTO, searchDTO} = require('./dto/staff.dto.js');
const {staffService} = require('../../app/services/staff.service.js');

/**
 * Each of resolvers should have logic of access control.
 * Access control can be implemented as middleware for all resolvers or for each individual (depends on requirements)
 * Also, access control can be presented as npm package, separate service or part of this service (depends on common arch.)
 */

router.get('/', async (req, res, next) => {
    try {
        const {search, limit, offset} = req.query;
        const searchDto = { search, limit, offset };
        dtoValidator.validate(searchDto, searchDTO);

        const employees = await staffService.getEmployees(searchDto);
        return res.json({employees});
    } catch(e) {
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const employee = await staffService.getEmployeeById(req.params.id);
        return res.json({employee});
    } catch(e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        dtoValidator.validate(req.body, employeeDTO);
        const employee = await staffService.addEmployee(req.body);

        return res.json({employee});
    } catch(e) {
        next(e);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        dtoValidator.validate(req.body, employeeDTO);
        const employee = await staffService.updateEmployee(req.params.id, req.body);

        return res.json({employee});
    } catch(e) {
        next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const count = await staffService.deleteEmployee(req.params.id);

        return res.json({count})
    } catch(e) {
        next(e);
    }
})



module.exports.staffController = router;