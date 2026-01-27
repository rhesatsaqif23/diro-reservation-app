interface ClassResponseDTO {
  ID: string;
  Name: string;
  DurationMinutes: number;
  Price: number;
  Description: string;
  RequiredCourtType: string;
  ImageURL: string | null;
  IsActive: boolean;
  CreatedAt: string;
}
