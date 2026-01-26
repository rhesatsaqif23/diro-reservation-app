export interface Court {
  id: string;
  name: string;
  type?: string | null;
  is_active: boolean;
  created_at: string;
}
