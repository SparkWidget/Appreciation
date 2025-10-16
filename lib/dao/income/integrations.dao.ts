// DAO placeholders for Integration-Based Rewards (no implementation)
import type { IntegrationReward } from '../../../modules/income/integrations/integrations.model'

export async function getAllIntegrationRewards(): Promise<IntegrationReward[]> { throw new Error('Not implemented') }
export async function getIntegrationRewardById(_id: string): Promise<IntegrationReward | null> { throw new Error('Not implemented') }
export async function createIntegrationReward(_data: IntegrationReward): Promise<IntegrationReward> { throw new Error('Not implemented') }
export async function updateIntegrationReward(_id: string, _data: Partial<IntegrationReward>): Promise<IntegrationReward> { throw new Error('Not implemented') }
export async function deleteIntegrationReward(_id: string): Promise<void> { throw new Error('Not implemented') }
