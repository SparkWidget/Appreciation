// DAO placeholders for Rewards (no implementation)
import type { RewardPoint } from '../../../modules/income/rewards/rewards.model'

export async function getAllRewards(): Promise<RewardPoint[]> { throw new Error('Not implemented') }
export async function getRewardById(_id: string): Promise<RewardPoint | null> { throw new Error('Not implemented') }
export async function createReward(_data: RewardPoint): Promise<RewardPoint> { throw new Error('Not implemented') }
export async function updateReward(_id: string, _data: Partial<RewardPoint>): Promise<RewardPoint> { throw new Error('Not implemented') }
export async function deleteReward(_id: string): Promise<void> { throw new Error('Not implemented') }
