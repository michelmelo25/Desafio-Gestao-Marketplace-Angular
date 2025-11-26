import { IProductResponse } from './product-response';

export interface IProductsResponse {
  messsage: string;
  data: IProductResponse[];
}
