import type { Env } from 'wildebeest/backend/src/types/env'
import { DEFAULT_THUMBNAIL } from 'wildebeest/backend/src/config'

const INSTANCE_VERSION = '4.0.2'

export const onRequest: PagesFunction<Env, any> = async ({ env, request }) => {
	const domain = new URL(request.url).hostname
	return handleRequest(domain, env)
}

export async function handleRequest(domain: string, env: Env) {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'content-type, authorization',
		'content-type': 'application/json; charset=utf-8',
	}

	const res: any = {}

	res.thumbnail = DEFAULT_THUMBNAIL

	// Registration is disabled because unsupported by Wildebeest. Users
	// should go through the login flow and authenticate with Access.
	// The documentation is incorrect and registrations is a boolean.
	res.registrations = false

	res.version = INSTANCE_VERSION
	res.rules = []
	res.uri = domain
	res.title = env.INSTANCE_TITLE
	res.email = env.ADMIN_EMAIL
	res.description = env.INSTANCE_DESCR

	res.short_description = res.description

	return new Response(JSON.stringify(res), { headers })
}
