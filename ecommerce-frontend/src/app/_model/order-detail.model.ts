import {OrderQuantityModel} from './order-quantity.model';

export interface OrderDetailsModel {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContactNumber: string;
  orderProductQuantityList: OrderQuantityModel[];
}
