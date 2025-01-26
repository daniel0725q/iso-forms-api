const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const { createDiagramSchema, updateDiagramSchema, getDiagramSchema } = require('../schemas/diagram.schema');
const jwt = require('jsonwebtoken');
const DiagramService = require('../services/diagram.service');

const router = express.Router();
const service = new DiagramService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      const diagrams = await service.find(companyId);
      res.json(diagrams);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getDiagramSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      const diagram = await service.findOne(id, companyId);
      res.json(diagram);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createDiagramSchema, 'body'),
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      const body = req.body;
      body.userId = userId;
      body.companyId = companyId;
      const newDiagram = await service.create(body);
      res.status(201).json(newDiagram);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getDiagramSchema, 'params'),
  validationHandler(updateDiagramSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      const body = req.body;
      const diagram = await service.update(id, body, companyId);
      res.json(diagram);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getDiagramSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorization = req.headers.authorization;
      const token = authorization.substring(7);
      const userId = jwt.decode(token).uid;
      const companyId = jwt.decode(token).company;
      await service.delete(id, companyId);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;