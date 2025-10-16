// DAO placeholders for Marketplace/Store (no implementation)
import type { StoreItem, Transaction } from '../../../modules/income/marketplace/marketplace.model'

export async function getAllStoreItems(): Promise<StoreItem[]> { throw new Error('Not implemented') }
export async function getStoreItemById(_id: string): Promise<StoreItem | null> { throw new Error('Not implemented') }
export async function createStoreItem(_data: StoreItem): Promise<StoreItem> { throw new Error('Not implemented') }
export async function updateStoreItem(_id: string, _data: Partial<StoreItem>): Promise<StoreItem> { throw new Error('Not implemented') }
export async function deleteStoreItem(_id: string): Promise<void> { throw new Error('Not implemented') }

export async function createTransaction(_data: Transaction): Promise<Transaction> { throw new Error('Not implemented') }
export async function listTransactionsByUser(_userId: string): Promise<Transaction[]> { throw new Error('Not implemented') }
