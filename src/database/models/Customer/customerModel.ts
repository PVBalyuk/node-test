import { IBaseModel } from '../baseModel';

export interface ICustomer extends IBaseModel, ICustomerCreation {}
export interface ICustomerCreation {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  refreshToken?: string | null;
}
