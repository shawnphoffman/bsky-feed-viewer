'use server'

import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'

import DeleteButton from '@/components/deleteButton'
import type { BskyPost } from '@/utils/bsky'

function getAgeBackgrounds(dateString: string) {
	// Parse the input date string to a Date object
	const date = new Date(dateString)

	// Calculate the difference in milliseconds between the input date and the current date
	const differenceInMilliseconds = Date.now() - date.getTime()

	// Convert the difference to weeks
	const differenceInWeeks = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)

	// Assign a bg color
	if (differenceInWeeks >= 8) {
		return 'bg-red-700 text-white font-medium'
	}
	if (differenceInWeeks >= 6) {
		return 'bg-red-800 text-black'
	}
	if (differenceInWeeks >= 4) {
		return 'bg-red-900 text-black'
	}
	if (differenceInWeeks >= 2) {
		return 'bg-red-950 text-gray-300'
	}
	return ''
}

type TableProps = {
	posts: BskyPost[]
	fetchedPosts: any[]
	deletePost: (cid: string) => void
}

export default async function PostsTable({ posts = [], fetchedPosts = [], deletePost }: TableProps) {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeaderCell>URI</TableHeaderCell>
					<TableHeaderCell>Indexed At</TableHeaderCell>
					<TableHeaderCell>Actions</TableHeaderCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{posts.map((post, i) => {
					const author = fetchedPosts[i]?.author?.displayName
					const text = fetchedPosts[i]?.record?.text
					return (
						<TableRow key={post.cid} className={getAgeBackgrounds(post.indexedAt)}>
							<TableCell className="flex flex-col gap-2">
								<div>{post.uri}</div>
								<div className="px-4">
									{author && <div className="font-medium text-tremor-brand">{author}</div>}
									{text && (
										<div className="whitespace-pre-wrap border border-gray-700 px-4 py-2 rounded-lg bg-gray-950 w-fit max-w-full text-gray-500">
											{text}
										</div>
									)}
								</div>
							</TableCell>
							<TableCell>
								{new Date(post.indexedAt).toLocaleString('en-US', {
									timeZone: 'America/Los_Angeles',
								})}
							</TableCell>
							<TableCell>
								<DeleteButton cid={post.cid} action={deletePost} />
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
