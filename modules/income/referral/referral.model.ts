// TODO: implement logic in future release
export interface Referral {
  id: string
  user_id: string
  referred_user_id: string
  reward_amount?: number
  status: 'pending' | 'approved' | 'paid'
  created_at: string
}
