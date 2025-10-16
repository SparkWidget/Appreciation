// TODO: implement logic in future release
export type LevelName = 'bronze' | 'silver' | 'gold' | 'platinum'
export interface UserLevel {
  id: string
  user_id: string
  level: LevelName
  badge?: string
  created_at: string
}
