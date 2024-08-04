import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
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
