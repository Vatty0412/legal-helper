/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#111827',
				dusk: '#0f172a',
				blaze: '#d97706',
				mint: '#059669',
				parchment: '#fefce8',
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				body: ['"Manrope"', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
