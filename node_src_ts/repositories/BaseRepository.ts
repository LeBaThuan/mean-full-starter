import {Document, Model} from 'mongoose';
import {IBaseRepository} from './IBaseRepository';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(newResource: T): Promise<T> {
    return await this._model.create(newResource);
  }

  async delete(id: string): Promise<T> {
    return await this._model.findByIdAndRemove(id).exec();
  }

  async getAll(): Promise<T[]> {
    return await this._model.find().exec();
  }

  async getById(id: string): Promise<T> {
    return await this._model.findById(id).exec();
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return await this._model.find({_id: {$in: ids}}).exec();
  }

  async getOne(value: any, queryBy: string = '_id'): Promise<T> {
    if (queryBy === '_id') {
      return await this._model.findById(value).exec();
    }

    const query = {};
    query[queryBy] = value;
    return await this._model.findOne(query).exec();
  }

  async update(id: string, updatedResource: T): Promise<T> {
    return await this._model.findByIdAndUpdate(id, updatedResource, {new: true}).exec();
  }
}