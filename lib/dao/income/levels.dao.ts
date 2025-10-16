// DAO placeholders for Levels/Badges (no implementation)
import type { UserLevel } from '../../../modules/income/levels/levels.model'

export async function getAllLevels(): Promise<UserLevel[]> { throw new Error('Not implemented') }
export async function getUserLevelById(_id: string): Promise<UserLevel | null> { throw new Error('Not implemented') }
export async function createUserLevel(_data: UserLevel): Promise<UserLevel> { throw new Error('Not implemented') }
export async function updateUserLevel(_id: string, _data: Partial<UserLevel>): Promise<UserLevel> { throw new Error('Not implemented') }
export async function deleteUserLevel(_id: string): Promise<void> { throw new Error('Not implemented') }
