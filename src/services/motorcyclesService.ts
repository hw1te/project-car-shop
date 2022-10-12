import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/errors';

export default class MotorcyclesService implements IService<IMotorcycle> {
  constructor(private _motorcycles: IModel<IMotorcycle>) { }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._motorcycles.read();
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const result = await this._motorcycles.readOne(_id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async update(_id: string, payload: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._motorcycles.update(_id, payload);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const result = await this._motorcycles.delete(_id);
    if (!result) throw Error(ErrorTypes.ObjectNotFound);
    return result;
  }

  public async create(payload:unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._motorcycles.create(parsed.data);
    return result;
  }
}