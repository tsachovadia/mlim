/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from style guide
        'primary-blue': '#2563EB',
        'primary-blue-50': '#EFF6FF',
        'primary-blue-100': '#DBEAFE',
        'primary-blue-200': '#BFDBFE',
        'primary-blue-600': '#2563EB',
        'primary-blue-700': '#1D4ED8',
        'primary-blue-800': '#1E40AF',
        
        // Confidence level colors
        'success-green': '#16A34A',
        'success-green-50': '#F0FDF4',
        'warning-amber': '#D97706',
        'warning-amber-50': '#FFFBEB',
        'info-blue': '#0EA5E9',
        'info-blue-50': '#F0F9FF',
        
        // Neutral colors
        'neutral-50': '#F9FAFB',
        'neutral-100': '#F3F4F6',
        'neutral-200': '#E5E7EB',
        'neutral-300': '#D1D5DB',
        'neutral-400': '#9CA3AF',
        'neutral-500': '#6B7280',
        'neutral-600': '#4B5563',
        'neutral-700': '#374151',
        'neutral-800': '#1F2937',
        'neutral-900': '#111827',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}

