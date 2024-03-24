// import { cache } from 'react'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const url = requestUrl.searchParams.get('url')

	return NextResponse.json({ error: 'No URL provided', url })
}

// async function getSubject(subject: string) {
//   if (subject.startsWith('did:')) {
//     const { data: repo } = await client.api.tools.ozone.moderation.getRepo(
//       {
//         did: subject,
//       },
//       { headers: client.proxyHeaders() },
//     )
//     return { repo }
//   } else if (subject.startsWith('at://')) {
//     const { data: record } = await client.api.tools.ozone.moderation.getRecord(
//       {
//         uri: subject,
//       },
//       { headers: client.proxyHeaders() },
//     )
//     return { record }
//   } else {
//     return {}
//   }
// }
