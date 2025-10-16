// TODO: implement logic in future release
export interface IntegrationReward {
  id: string
  user_id: string
  provider: 'slack' | 'discord' | 'zapier' | 'other'
  amount: number
  created_at: string
}
