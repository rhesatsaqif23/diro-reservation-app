export interface Class {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description?: string | null;
  required_court_type: string;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
}
