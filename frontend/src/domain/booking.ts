export interface BookingSummary {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;

  class: {
    id: string;
    name: string;
    price: number;
  };

  court: {
    id: string;
    name: string;
  };

  user: {
    name: string;
    email: string;
  };

  base_price: number;
  admin_fee: number;
  total: number;
}
