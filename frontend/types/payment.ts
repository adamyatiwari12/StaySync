export type PaymentStatus = "pending" | "paid";

export type PaymentMethod =
  | "cash"
  | "upi"
  | "bank_transfer"
  | "manual";

export interface Payment {
  _id: string;
  amount: number;
  month: number;
  year: number;
  status: PaymentStatus;
  paidAt?: string;
  paymentMethod?: PaymentMethod;

  tenantId: {
    _id: string;
    username: string;
    email: string;
  };

  roomId: {
    _id: string;
    roomNumber: string;
  };
}

export interface CreatePaymentData {
  tenantId: string;
  roomId: string;
  amount: number;
  month: number;
  year: number;
}