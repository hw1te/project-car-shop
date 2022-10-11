import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const data = await this._service.create(req.body);
    return res.status(201).json(data);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const data = await this._service.read();
    return res.status(200).json(data);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const data = await this._service.readOne(id);
    return res.status(200).json(data);
  }
}