/** @type {import('tailwindcss').Config} */
export default {
	plugins: [require('@tailwindcss/forms')],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
			},
		},
	},
	variants: {
		extend: {
			translate: ['data-closed'],
			opacity: ['data-closed'],
		},
	},
};
