
export interface Order {
  id: number;
  status: string;
  customerId: number;
  orderItems: {
    medicineId: number;
    quantity: number;
  }[];
  customerDetails?: Customer; 
}



import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";


// export interface Order {
//   id: number;
//   status: string;
//   customerId: number;
//   orderItems: OrderItem[]; // Array of OrderItem including medicine details
// }
