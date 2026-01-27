export interface BookingSummary {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;

  admin_fee?: number;

  class: {
    id: string;
    name: string;
    price: number;
  };

  court: {
    id: string;
    name: string;
  };
}
