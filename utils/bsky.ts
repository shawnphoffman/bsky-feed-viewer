import AtpAgent from '@atproto/api'

function chunkArray<T>(arr: Array<T>, chunkSize: number) {
	const chunkedArray = []
	for (let i = 0; i < arr.length; i += chunkSize) {
		chunkedArray.push(arr.slice(i, i + chunkSize))
	}
	return chunkedArray
}

export const getRecords = async (uris: string[]) => {
	'use server'
	try {
		const agent = new AtpAgent({ service: 'https://bsky.social' })

		const loginResponse = await agent.login({
			identifier: process.env.BSKY_USERNAME!,
			password: process.env.BSKY_PASSWORD!,
		})
		if (!loginResponse?.success) {
			console.error('BLUESKY MOD LOGIN FAILED', loginResponse)
			return null
		}
		const outputPosts: any[] = []
		const chunkedUris = chunkArray(uris, 25)

		for (const chunk of chunkedUris) {
			// console.log('chunk', chunk)
			const posts = await agent.api.xrpc.call('app.bsky.feed.getPosts', {
				uris: chunk,
			})
			// console.log('posts', posts)
			if (posts.success) {
				outputPosts.push(...posts.data.posts)
			}
		}

		return outputPosts
	} catch (error) {
		console.log('❌❌❌ getRecord error', error)
	}
}

export type BskyPost = {
	uri: string
	cid: string
	replyParent: string | null
	replyRoot: string | null
	indexedAt: string
}
