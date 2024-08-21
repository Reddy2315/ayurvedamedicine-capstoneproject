import { Medicine } from "./Medicine";

export interface OrderItem {
    id: number;
    medicineId: number;
    quantity: number;
    itemTotal: number;
    medicineDetails?: Medicine; // Optional property for medicine details
  }

