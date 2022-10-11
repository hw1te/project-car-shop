export interface IService<T> {
  create(payload:unknown): Promise<T>,
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T>,
  update(_id: string, payload: unknown): Promise<T>,
  delete(_id: string): Promise<T>,
}