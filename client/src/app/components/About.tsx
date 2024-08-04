import Metadata from './Metadata';

export default function About() {
	return (
		<>
			<Metadata pageName="About" slug="about" />

			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-300 ">
						The world's best films
					</p>
					<h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-6xl">
						MetaCritic 100
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-200">
						MetaCritic 100 is an engaging hobby project that allows film
						enthusiasts to track their viewing progress through the
						top-rated films on Metacritic. This fun, unofficial site is
						not affiliated with Metacritic but instead uses their ratings
						as a foundation for a personal movie-watching challenge. It
						offers users a playful way to explore and track their journey
						through critically acclaimed cinema, turning the pursuit of
						watching top-rated films into an enjoyable, goal-oriented
						experience.
					</p>

					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-200">
						Metacritic is a renowned review aggregator that compiles
						critic reviews for various media, including films, TV shows,
						music, and video games. For movies, Metacritic calculates a
						weighted average of critic scores, resulting in a "Metascore"
						ranging from 0 to 100. This score provides a quick snapshot of
						critical consensus, with higher scores indicating more
						favorable reviews.
					</p>

					<p className="mt-6 text-base leading-8 text-gray-600 dark:text-slate-200">
						Site by{' '}
						<a
							href="https://danedwardsdeveloper.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-indigo-500 underline underline-offset-2 hover:text-indigo-600 hover:decoration-indigo-500 transition duration-200"
						>
							Dan Edwards
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
