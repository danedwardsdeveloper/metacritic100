export default function GradientBackground() {
	return (
		<div
			className="absolute inset-0 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 
		dark:bg-gradient-to-r dark:from-gray-900 dark:via-indigo-900 dark:to-teal-900"
		>
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] 
                   from-blue-200 via-purple-200 to-pink-200 opacity-30
				   dark:opacity-0
                  "
			></div>
			<div
				className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] 
                   from-yellow-100 via-green-100 to-blue-100 opacity-20
				   dark:opacity-0
                   "
			></div>
		</div>
	);
}
