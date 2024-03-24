import { Suspense } from 'react'
import { Card, Text, Title } from '@tremor/react'

import PostsTable from './table'

import { BskyPost, getRecords } from '@/utils/bsky'

export default async function PostsPage() {
	const deletePost = async (cid: string) => {
		'use server'
		const options = {
			method: 'DELETE',
			headers: {
				'x-force-key': process.env.FEEDGEN_SECRET || '',
			},
		}
		await fetch(`${process.env.API_HOST}/posts/${cid}`, options)
	}

	const resp = await fetch(`${process.env.API_HOST}/posts`, {
		cache: 'no-store',
		headers: {
			'x-force-key': process.env.FEEDGEN_SECRET || '',
			'Content-Type': 'application/json',
		},
		method: 'GET',
	})

	const posts: BskyPost[] = await resp.json()

	let fetchedPosts: any[] = []
	const postUris = posts.map(post => post.uri)
	const fetchedRecords = await getRecords(postUris)
	if (fetchedRecords) {
		fetchedPosts = fetchedRecords
	}

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Posts</Title>
			<Text>A list of posts in the sqlite db</Text>
			<Card className="mt-6">
				<PostsTable posts={posts} fetchedPosts={fetchedPosts} deletePost={deletePost} />
			</Card>
		</main>
	)
}
