import { auth } from '../app/auth'
import Navbar from './navbar'

export default async function Nav() {
	const session = await auth()
	return <Navbar user={session?.user} />
}
