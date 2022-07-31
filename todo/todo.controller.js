const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')

const todoService = require('./todo.service');

// routes
router.post('/save', registerSchema, save);
router.get('/getAll',getAll);
router.get('/getByName/:name',getByName);
router.get('/getTodoListByName/:name',getTodoListByName);




module.exports = router;



function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function save(req, res, next) {
    todoService.create(req.body)
        .then(() => res.json({ message: 'Todo Saved successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    todoService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getByName(req, res, next) {
    
    todoService.getByName(req.params.name)
        .then(todos => res.json(todos))
        .catch(next);
}

function getTodoListByName(req, res, next) {
    
    todoService.getTodoListByName(req.params.name)
        .then(todos => res.json(todos))
        .catch(next);
}