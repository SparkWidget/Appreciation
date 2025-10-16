// DAO placeholders for Creator Monetization (no implementation)
import type { CreatorEarning } from '../../../modules/income/creator/creator.model'

export async function getAllCreatorEarnings(): Promise<CreatorEarning[]> { throw new Error('Not implemented') }
export async function getCreatorEarningById(_id: string): Promise<CreatorEarning | null> { throw new Error('Not implemented') }
export async function recordCreatorEarning(_data: CreatorEarning): Promise<CreatorEarning> { throw new Error('Not implemented') }
export async function updateCreatorEarning(_id: string, _data: Partial<CreatorEarning>): Promise<CreatorEarning> { throw new Error('Not implemented') }
export async function deleteCreatorEarning(_id: string): Promise<void> { throw new Error('Not implemented') }
