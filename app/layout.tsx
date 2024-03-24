import './globals.css'

import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'

import Nav from '@/components/nav'

export const metadata = {
	title: 'ShawnBot Feed Admin',
	description: 'A feed admin UI',
}

type Props = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className="h-full bg-gray-950">
			<body className="h-full">
				<Suspense>
					<Nav />
				</Suspense>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
