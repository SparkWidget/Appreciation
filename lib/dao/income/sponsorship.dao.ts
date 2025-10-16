// DAO placeholders for Sponsorship (no implementation)
import type { Sponsorship, SponsorReward } from '../../../modules/income/sponsorship/sponsorship.model'

export async function getAllSponsorships(): Promise<Sponsorship[]> { throw new Error('Not implemented') }
export async function getSponsorshipById(_id: string): Promise<Sponsorship | null> { throw new Error('Not implemented') }
export async function createSponsorship(_data: Sponsorship): Promise<Sponsorship> { throw new Error('Not implemented') }
export async function updateSponsorship(_id: string, _data: Partial<Sponsorship>): Promise<Sponsorship> { throw new Error('Not implemented') }
export async function deleteSponsorship(_id: string): Promise<void> { throw new Error('Not implemented') }

export async function createSponsorReward(_data: SponsorReward): Promise<SponsorReward> { throw new Error('Not implemented') }
export async function listSponsorRewardsBySponsorship(_sponsorshipId: string): Promise<SponsorReward[]> { throw new Error('Not implemented') }
