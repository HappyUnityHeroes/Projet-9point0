import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
      },
    },
  },
  plugins: [],
}
export default config
