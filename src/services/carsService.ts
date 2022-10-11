import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../errors/errors';

export default class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }
  public async read(): Promise<ICar[]> {
    const foundList = await this._cars.read();
    if (!foundList) throw Error(ErrorTypes.EntityNotFound);
    return foundList;
  }
  public async readOne(_id: string): Promise<ICar> {
    const foundCar = await this._cars.readOne(_id);
    if (!foundCar) throw Error(ErrorTypes.EntityNotFound);
    return foundCar;
  }
  public async update(_id: string, payload: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._cars.update(_id, payload);
    if (!updated) throw Error(ErrorTypes.EntityNotFound);
    return updated;
  }
  public async delete(_id: string): Promise<ICar> {
    const deleted = await this._cars.delete(_id);
    if (!deleted) throw Error(ErrorTypes.EntityNotFound);
    return deleted;
  }

  public async create(payload:unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const created = await this._cars.create(parsed.data);
    return created;
  }
}