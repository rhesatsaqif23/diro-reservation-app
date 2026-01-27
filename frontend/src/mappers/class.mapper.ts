import { Class } from "@/src/domain/class";

export function mapClassDTOToDomain(dto: ClassResponseDTO): Class {
  return {
    id: dto.ID,
    name: dto.Name,
    duration_minutes: dto.DurationMinutes,
    price: dto.Price,
    description: dto.Description,
    required_court_type: dto.RequiredCourtType,
    image_url: dto.ImageURL,
    is_active: dto.IsActive,
    created_at: dto.CreatedAt,
  };
}
