'use client'

import { useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'

export default function AddButton({}) {
	const ref = useRef(false)
	const router = useRouter()
	const { pending: isFormPending } = useFormStatus()

	useEffect(() => {
		if (!isFormPending && ref.current) {
			router.push('/')
			router.refresh()
		}
		if (isFormPending) {
			ref.current = true
		}
	}, [isFormPending, router])

	return (
		<Button type="submit" variant="primary" className="text-white" disabled={isFormPending}>
			Add Post
		</Button>
	)
}
