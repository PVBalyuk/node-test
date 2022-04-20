import { IBaseModel } from '../baseModel';

export interface IOrder extends IBaseModel, IOrderCreation {
  total: number;
}

export interface IOrderCreation {
  total: number;
}
