import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/errors';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(payload: T): Promise<T> {
    const result = await this._model.create({ ...payload });
    return result;
  }

  public async read(): Promise<T[]> {
    const result = this._model.find();
    return result;
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const result = this._model.findOne({ id });
    return result;
  }

  public async update(id: string, payload: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.findByIdAndUpdate(
      { id },
      { ...payload } as UpdateQuery<T>,
      { new: true },
    );
    return result;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.findByIdAndDelete({ id });
    return result;
  }
}

export default MongoModel;