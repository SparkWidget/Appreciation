// TODO: implement logic in future release
export interface StoreItem {
  id: string
  sku: string
  title: string
  cost_points: number
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  item_id: string
  points_spent: number
  created_at: string
}
