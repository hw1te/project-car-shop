import { Schema, model as createModel } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const carSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class Car extends MongoModel<ICar> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}

export default Car;