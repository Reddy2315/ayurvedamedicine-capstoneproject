
import { OrderItem } from "./OrderItem";


export interface OrderList {
    id: number;
    status: string;
    orderAmount: number;
    orderDate: Date;
    orderItems: OrderItem[];
  }



