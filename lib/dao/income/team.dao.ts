// DAO placeholders for Team/Org Rewards (no implementation)
import type { TeamReward } from '../../../modules/income/team/team.model'

export async function getAllTeamRewards(): Promise<TeamReward[]> { throw new Error('Not implemented') }
export async function getTeamRewardById(_id: string): Promise<TeamReward | null> { throw new Error('Not implemented') }
export async function createTeamReward(_data: TeamReward): Promise<TeamReward> { throw new Error('Not implemented') }
export async function updateTeamReward(_id: string, _data: Partial<TeamReward>): Promise<TeamReward> { throw new Error('Not implemented') }
export async function deleteTeamReward(_id: string): Promise<void> { throw new Error('Not implemented') }
