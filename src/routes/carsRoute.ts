import { Router } from 'express';
import CarsController from '../controllers/carsController';
import CarsModel from '../models/carsModel';
import CarsService from '../services/carsService';

const route = Router();

const cars = new CarsModel();
const carsService = new CarsService(cars);
const carsController = new CarsController(carsService);

route.post('/', (req, res) => carsController.create(req, res));
route.get('/', (req, res) => carsController.read(req, res));
route.get('/:id', (req, res) => carsController.readOne(req, res));
route.put('/:id', (req, res) => carsController.update(req, res));

export default route;