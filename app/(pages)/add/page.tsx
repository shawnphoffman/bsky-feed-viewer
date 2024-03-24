import { Card, Text, TextInput, Title } from '@tremor/react'

import AddButton from '@/components/addButton'

export type Post = {
	uri: string
	cid: string
	replyParent: string | null
	replyRoot: string | null
	indexedAt: string
}

export default async function AddPostPage({}: {}) {
	async function addPost(formData: FormData) {
		'use server'

		const rawFormData = {
			cid: formData.get('cid'),
			uri: formData.get('uri'),
			indexedAt: formData.get('indexedAt'),
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-force-key': process.env.FEEDGEN_SECRET || '',
			},
			body: JSON.stringify(rawFormData),
		}

		await fetch(`${process.env.API_HOST}/posts`, options)
	}

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Add Post</Title>
			<Text>Add a post to the ShawnBot feed</Text>
			<form action={addPost}>
				<Card className="mt-6 mx-auto max-w-md gap-4 flex flex-col">
					<div>
						<h2 className="text-tremor-title font-semibold text-tremor-content">CID</h2>
						<TextInput name="cid" required placeholder="abcdef..." />
					</div>
					<div>
						<h2 className="text-tremor-title font-semibold text-tremor-content">URI</h2>
						<TextInput name="uri" required placeholder="at://did:plc:..." />
					</div>
					<div>
						<h2 className="text-tremor-title font-semibold text-tremor-content">Indexed At</h2>
						<TextInput name="indexedAt" required placeholder="2024-01-01T00:00:00.000Z" />
					</div>
					<AddButton />
				</Card>
			</form>
		</main>
	)
}
