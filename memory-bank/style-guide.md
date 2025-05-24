# STYLE GUIDE: Academic Program Matching Platform

## 🎨 Design Philosophy
**Goal:** Create a welcoming, professional platform that makes academic exploration feel approachable and exciting.
**Tone:** Trustworthy, modern, encouraging, and academic.

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#2563EB` (Tailwind: `blue-600`) - Trust, academic excellence
- **Primary Hover**: `#1D4ED8` (Tailwind: `blue-700`)
- **Primary Light**: `#DBEAFE` (Tailwind: `blue-100`) - Backgrounds, highlights

### Secondary Colors
- **Success Green**: `#10B981` (Tailwind: `emerald-500`) - "High Chance" matches
- **Warning Amber**: `#F59E0B` (Tailwind: `amber-500`) - "Good Fit" matches
- **Info Purple**: `#8B5CF6` (Tailwind: `violet-500`) - "Potential Match" indicators

### Neutral Colors
- **Dark Gray**: `#111827` (Tailwind: `gray-900`) - Primary text
- **Medium Gray**: `#6B7280` (Tailwind: `gray-500`) - Secondary text
- **Light Gray**: `#F3F4F6` (Tailwind: `gray-100`) - Backgrounds
- **White**: `#FFFFFF` - Cards, primary backgrounds

### Status Colors
- **Error Red**: `#EF4444` (Tailwind: `red-500`)
- **Success**: `#10B981` (Tailwind: `emerald-500`)
- **Warning**: `#F59E0B` (Tailwind: `amber-500`)
- **Info**: `#3B82F6` (Tailwind: `blue-500`)

## 📝 Typography

### Font Families
- **Primary**: `Inter, system-ui, -apple-system, sans-serif`
- **Monospace**: `'JetBrains Mono', Consolas, monospace` (for scores/numbers)

### Type Scale
- **Display**: `text-5xl` (48px) - Hero headlines
- **H1**: `text-4xl` (36px) - Page titles
- **H2**: `text-3xl` (30px) - Section headers
- **H3**: `text-2xl` (24px) - Card titles
- **H4**: `text-xl` (20px) - Subsection headers
- **Body**: `text-base` (16px) - Regular text
- **Small**: `text-sm` (14px) - Helper text
- **Tiny**: `text-xs` (12px) - Captions

### Font Weights
- **Bold**: `font-bold` (700) - Headers, CTAs
- **Semibold**: `font-semibold` (600) - Subheaders
- **Medium**: `font-medium` (500) - Emphasis
- **Regular**: `font-normal` (400) - Body text

## 📐 Spacing System

### Base Unit: 4px (Tailwind default)
- **Micro**: `space-y-1` (4px)
- **Small**: `space-y-2` (8px)
- **Medium**: `space-y-4` (16px)
- **Large**: `space-y-6` (24px)
- **XL**: `space-y-8` (32px)
- **2XL**: `space-y-12` (48px)

### Container Padding
- **Mobile**: `px-4` (16px)
- **Tablet**: `px-6` (24px)
- **Desktop**: `px-8` (32px)

### Card Padding
- **Default**: `p-6` (24px)
- **Compact**: `p-4` (16px)
- **Spacious**: `p-8` (32px)

## 🧩 Component Styles

### Buttons
**Primary Button**
```
bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md
```

**Secondary Button**
```
bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors duration-200
```

**Ghost Button**
```
hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200
```

### Cards
**Base Card**
```
bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6
```

**Interactive Card**
```
bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 cursor-pointer hover:-translate-y-1
```

### Form Elements
**Input Field**
```
w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200
```

**Select Dropdown**
```
w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500
```

**Checkbox/Radio**
```
w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500
```

### Progress Indicators
**Progress Bar**
```
bg-gray-200 rounded-full h-2 overflow-hidden
```

**Progress Fill**
```
bg-blue-600 h-full rounded-full transition-all duration-300 ease-out
```

### Badges/Tags
**Match Confidence Badges**
- High Chance: `bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium`
- Good Fit: `bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium`
- Potential Match: `bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium`

## 🎯 Interaction Patterns

### Hover States
- Subtle shadow increase: `hover:shadow-md`
- Color darkening: Primary colors shift to darker shade
- Slight upward movement: `hover:-translate-y-1` for cards

### Focus States
- Blue ring: `focus:ring-2 focus:ring-blue-500`
- High contrast for accessibility

### Loading States
- Skeleton screens with `bg-gray-200 animate-pulse`
- Spinner: Blue with `animate-spin`

### Transitions
- Duration: `duration-200` for most interactions
- Easing: `ease-out` for natural feel

## 📱 Responsive Breakpoints
- **Mobile**: Default (<640px)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `lg:` (1024px+)
- **Wide**: `xl:` (1280px+)

## ♿ Accessibility Guidelines
- Minimum contrast ratio: 4.5:1 for normal text
- Focus indicators on all interactive elements
- Proper ARIA labels for screen readers
- Keyboard navigation support
- Alt text for all informative images

## 🖼️ Imagery & Icons
- **Icons**: Heroicons (outline style preferred)
- **Icon Size**: `w-5 h-5` for inline, `w-6 h-6` for buttons
- **Illustrations**: Modern, minimalist, using primary color palette
- **Photos**: High-quality academic/campus imagery with subtle overlays

---
*This style guide ensures consistent visual design across the Academic Program Matching Platform* 