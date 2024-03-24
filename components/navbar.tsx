'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'

import logo from '../app/icon.png'

const navigation = [
	{ name: 'Post List', href: '/' },
	{ name: 'Add Post', href: '/add' },
]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Navbar({ user }: { user: any }) {
	const pathname = usePathname()

	return (
		<Disclosure as="nav" className="bg-tremor-background">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="flex flex-shrink-0 items-center">
									<Image src={logo} height={32} width={32} alt="ShawnBot" style={{ borderRadius: '50%' }} />
								</div>
								<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
									{navigation.map(item => (
										<a
											key={item.name}
											href={item.href}
											className={classNames(
												pathname === item.href
													? 'border-tremor-brand text-tremor-content-emphasis'
													: 'border-transparent text-tremor-content hover:text-gray-200 hover:border-gray-500',
												'inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium'
											)}
										>
											{item.name}
										</a>
									))}
								</div>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-tremor-background text-sm">
											<Image
												className="h-8 w-8 rounded-full"
												src={user?.image || 'https://avatar.vercel.sh/shawnphoffman'}
												height={32}
												width={32}
												alt={`${user?.name || 'placeholder'} avatar`}
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-tremor-background py-1">
											{user ? (
												<Menu.Item>
													{({ active }) => (
														<button
															className={classNames(
																active ? 'bg-gray-900' : '',
																'flex w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200'
															)}
															onClick={() => signOut()}
														>
															Sign out
														</button>
													)}
												</Menu.Item>
											) : (
												<Menu.Item>
													{({ active }) => (
														<button
															className={classNames(
																active ? 'bg-gray-900' : '',
																'flex w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200'
															)}
															onClick={() => signIn('github')}
														>
															Sign in
														</button>
													)}
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-tremor-background p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200">
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 pt-2 pb-3">
							{navigation.map(item => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										pathname === item.href
											? 'bg-gray-800 border-tremor-brand text-gray-200'
											: 'border-transparent text-gray-400 hover:bg-gray-800 hover:border-gray-500 hover:text-gray-200',
										'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
									)}
									aria-current={pathname === item.href ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
						<div className="border-t border-gray-700 pt-4 pb-3">
							{user ? (
								<>
									<div className="flex items-center px-4">
										<div className="flex-shrink-0">
											<Image className="h-8 w-8 rounded-full" src={user.image} height={32} width={32} alt={`${user.name} avatar`} />
										</div>
										<div className="ml-3">
											<div className="text-base font-medium text-gray-200">{user.name}</div>
											<div className="text-sm font-medium text-gray-500">{user.email}</div>
										</div>
									</div>
									<div className="mt-3 space-y-1">
										<button
											onClick={() => signOut()}
											className="block align-left w-full px-4 py-2 text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200"
										>
											Sign out
										</button>
									</div>
								</>
							) : (
								<div className="mt-3 space-y-1">
									<button
										onClick={() => signIn('github')}
										className="flex w-full px-4 py-2 text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200"
									>
										Sign in
									</button>
								</div>
							)}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
