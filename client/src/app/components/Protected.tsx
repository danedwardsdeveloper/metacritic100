import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from '@heroicons/react/20/solid';

import { useAuth } from '../contexts/AuthContext';

export default function Protected() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="relative bg-white">
			<div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
				<div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
					<div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
						<img
							alt=""
							src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
							className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
						/>
					</div>
				</div>
				<div className="px-6 lg:contents">
					<div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
						<p className="text-base font-semibold leading-7 text-indigo-600">
							Protected
						</p>
						<h1
							className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
								isAuthenticated ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{isAuthenticated
								? 'You are authorized to view this page'
								: 'You are not authorized to view this page'}
						</h1>
						<p className="mt-6 text-xl leading-8 text-gray-700">
							This is a placeholder text. It's used to fill up space
							where real content will eventually go. You can use it to
							visualize the layout and design of your project without
							having to write the actual content yet. Placeholder text is
							often used in web design, graphic design, and other
							creative fields.
						</p>
						<div className="mt-10 max-w-xl text-base leading-7 text-gray-700 lg:max-w-none">
							<p>
								This is a placeholder text. It's used to fill up space
								where real content will eventually go. You can use it to
								visualize the layout and design of your project without
								having to write the actual content yet. Placeholder text
								is often used in web design, graphic design, and other
								creative fields.
							</p>
							<ul role="list" className="mt-8 space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<CloudArrowUpIcon
										aria-hidden="true"
										className="mt-1 h-5 w-5 flex-none text-indigo-600"
									/>
									<span>
										<strong className="font-semibold text-gray-900">
											Push to deploy.
										</strong>{' '}
										This is a placeholder text. It's used to fill up
										space where real content will eventually go.
									</span>
								</li>
								<li className="flex gap-x-3">
									<LockClosedIcon
										aria-hidden="true"
										className="mt-1 h-5 w-5 flex-none text-indigo-600"
									/>
									<span>
										<strong className="font-semibold text-gray-900">
											SSL certificates.
										</strong>{' '}
										This is a placeholder text. It's used to fill up
										space where real content will eventually go.
									</span>
								</li>
								<li className="flex gap-x-3">
									<ServerIcon
										aria-hidden="true"
										className="mt-1 h-5 w-5 flex-none text-indigo-600"
									/>
									<span>
										<strong className="font-semibold text-gray-900">
											Database backups.
										</strong>{' '}
										This is a placeholder text. It's used to fill up
										space where real content will eventually go.
									</span>
								</li>
							</ul>
							<p className="mt-8">
								This is a placeholder text. It's used to fill up space
								where real content will eventually go. You can use it to
								visualize the layout and design of your project without
								having to write the actual content yet. Placeholder text
								is often used in web design, graphic design, and other
								creative fields.
							</p>
							<h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
								No server? No problem.
							</h2>
							<p className="mt-6">
								This is a placeholder text. It's used to fill up space
								where real content will eventually go. You can use it to
								visualize the layout and design of your project without
								having to write the actual content yet. Placeholder text
								is often used in web design, graphic design, and other
								creative fields.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
