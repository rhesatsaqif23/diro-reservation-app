export interface Court {
  id: string;
  name: string;
  type?: string | null;
  is_active: boolean;
  is_available: boolean;
  created_at: string;
}
