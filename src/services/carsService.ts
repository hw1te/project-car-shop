import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/errors';

export default class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }
  public async read(): Promise<ICar[]> {
    const foundList = await this._cars.read();
    if (!foundList) throw Error(ErrorTypes.ObjectNotFound);
    return foundList;
  }
  public async readOne(_id: string): Promise<ICar> {
    const result = await this._cars.readOne(_id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }
  public async update(_id: string, payload: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._cars.update(_id, payload);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }
  public async delete(_id: string): Promise<ICar> {
    const result = await this._cars.delete(_id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async create(payload:unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._cars.create(parsed.data);
    return result;
  }
}