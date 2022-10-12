import { Router } from 'express';
import MotorcyclesModel from '../models/motorcyclesModel';
import MotorcyclesService from '../services/motorcyclesService';
import MotorcyclesController from '../controllers/motorcyclesController';

const route = Router();

const motorcycles = new MotorcyclesModel();
const motorcyclesService = new MotorcyclesService(motorcycles);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

route.post('/', (req, res) => motorcyclesController.create(req, res));
route.get('/', (req, res) => motorcyclesController.read(req, res));
route.get('/:id', (req, res) => motorcyclesController.readOne(req, res));
route.put('/:id', (req, res) => motorcyclesController.update(req, res));
route.delete('/:id', (req, res) => motorcyclesController.delete(req, res));

export default route;