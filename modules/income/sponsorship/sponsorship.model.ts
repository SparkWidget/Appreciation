// TODO: implement logic in future release
export interface Sponsorship {
  id: string
  brand: string
  campaign_id?: string
  budget: number
  created_at: string
}

export interface SponsorReward {
  id: string
  sponsorship_id: string
  user_id: string
  amount: number
  created_at: string
}
