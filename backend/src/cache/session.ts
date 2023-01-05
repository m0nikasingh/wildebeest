import type { Person } from 'wildebeest/backend/src/activitypub/actors'

const expirationTtl = 7 * 24 * 60 * 60

export async function storeUserSession(kv: KVNamespace, email: string, obj: Person) {
	await kv.put('sessions/' + email, JSON.stringify(obj), { expirationTtl })
}

export async function getUserSession(kv: KVNamespace, email: string): Promise<Person | null> {
	return kv.get('sessions/' + email, { type: 'json' })
}
