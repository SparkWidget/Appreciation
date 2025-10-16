// DAO placeholders for Referral (no implementation)
import type { Referral } from '../../../modules/income/referral/referral.model'

export async function getAllReferrals(): Promise<Referral[]> { throw new Error('Not implemented') }
export async function getReferralById(_id: string): Promise<Referral | null> { throw new Error('Not implemented') }
export async function createReferral(_data: Referral): Promise<Referral> { throw new Error('Not implemented') }
export async function updateReferral(_id: string, _data: Partial<Referral>): Promise<Referral> { throw new Error('Not implemented') }
export async function deleteReferral(_id: string): Promise<void> { throw new Error('Not implemented') }
