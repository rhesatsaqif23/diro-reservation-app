import { BookingSummary } from "@/src/domain/booking";
import { BookingSummaryDTO } from "@/src/services/booking.service";

export function mapBookingSummaryDTO(dto: BookingSummaryDTO): BookingSummary {
  return {
    id: dto.id,
    date: dto.date,
    start_time: dto.start_time,
    end_time: dto.end_time,
    status: dto.status,

    class: {
      id: dto.class.id,
      name: dto.class.name,
      price: dto.class.price,
    },

    court: {
      id: dto.court.id,
      name: dto.court.name,
    },

    user: {
      name: dto.user.name,
      email: dto.user.email,
    },

    base_price: dto.base_price,
    admin_fee: dto.admin_fee,
    total: dto.total,
  };
}
