# STYLE GUIDE: Academic Program Matching Platform

## 🎨 Design Philosophy
**Goal:** Create a welcoming, professional platform that makes academic exploration feel approachable and exciting.
**Tone:** Trustworthy, modern, encouraging, and academic.
**Language:** Hebrew-first with RTL support for Israeli users.

## 🇮🇱 Hebrew Language & RTL Support

### Typography for Hebrew
- **Primary Hebrew Font**: `'Heebo', 'Assistant', 'Rubik', system-ui, sans-serif`
- **English Technical Font**: `Inter, system-ui, -apple-system, sans-serif`
- **Monospace**: `'JetBrains Mono', Consolas, monospace` (for scores/numbers)
- **Line Height**: `leading-relaxed` (1.625) for Hebrew text readability
- **Text Direction**: `dir="rtl"` on HTML root, `text-right` default for Hebrew

### RTL Layout Guidelines
- **Container Direction**: `<html dir="rtl">` for Hebrew layout
- **Mixed Content**: Use `dir="ltr"` for English technical content within RTL context
- **Icon Mirroring**: Arrows and directional icons should flip with `rtl:rotate-180`
- **Margin/Padding**: Use logical properties - `ms-4` instead of `ml-4` for start margin

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#2563EB` (Tailwind: `blue-600`) - Trust, academic excellence
- **Primary Hover**: `#1D4ED8` (Tailwind: `blue-700`)
- **Primary Light**: `#DBEAFE` (Tailwind: `blue-100`) - Backgrounds, highlights

### Secondary Colors
- **Success Green**: `#10B981` (Tailwind: `emerald-500`) - "סיכוי גבוה" matches
- **Warning Amber**: `#F59E0B` (Tailwind: `amber-500`) - "התאמה טובה" matches
- **Info Purple**: `#8B5CF6` (Tailwind: `violet-500`) - "התאמה פוטנציאלית" indicators

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

## 📝 Typography Scale (Hebrew-Optimized)

### Type Scale
- **Display**: `text-5xl leading-tight` (48px) - Hero headlines in Hebrew
- **H1**: `text-4xl leading-tight` (36px) - Page titles in Hebrew
- **H2**: `text-3xl leading-snug` (30px) - Section headers in Hebrew
- **H3**: `text-2xl leading-snug` (24px) - Card titles in Hebrew
- **H4**: `text-xl leading-normal` (20px) - Subsection headers in Hebrew
- **Body**: `text-base leading-relaxed` (16px) - Regular Hebrew text
- **Small**: `text-sm leading-relaxed` (14px) - Helper text in Hebrew
- **Tiny**: `text-xs leading-normal` (12px) - Captions

### Font Weights
- **Bold**: `font-bold` (700) - Headers, CTAs
- **Semibold**: `font-semibold` (600) - Subheaders
- **Medium**: `font-medium` (500) - Emphasis
- **Regular**: `font-normal` (400) - Body text

## 📐 Spacing System (RTL-Compatible)

### Base Unit: 4px (Tailwind default)
- **Micro**: `space-y-1` (4px)
- **Small**: `space-y-2` (8px)
- **Medium**: `space-y-4` (16px)
- **Large**: `space-y-6` (24px)
- **XL**: `space-y-8` (32px)
- **2XL**: `space-y-12` (48px)

### Container Padding (RTL-Aware)
- **Mobile**: `px-4` (16px) - symmetric padding
- **Tablet**: `px-6` (24px) - symmetric padding
- **Desktop**: `px-8` (32px) - symmetric padding

### Card Padding
- **Default**: `p-6` (24px)
- **Compact**: `p-4` (16px)
- **Spacious**: `p-8` (32px)

## 🧩 Component Styles (Hebrew-Ready)

### Buttons
**Primary Button (Hebrew)**
```
bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-right
```

**Secondary Button (Hebrew)**
```
bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors duration-200 text-right
```

**Ghost Button (Hebrew)**
```
hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-right
```

### Cards (RTL Layout)
**Base Card**
```
bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-right
```

**Interactive Card**
```
bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 cursor-pointer hover:-translate-y-1 text-right
```

### Form Elements (Hebrew)
**Input Field**
```
w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-right placeholder:text-right
```

**Select Dropdown**
```
w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right
```

**Checkbox/Radio (Hebrew Labels)**
```
w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ms-2
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

### Badges/Tags (Hebrew)
**Match Confidence Badges**
- סיכוי גבוה: `bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium`
- התאמה טובה: `bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium`
- התאמה פוטנציאלית: `bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium`

## 🎯 Interaction Patterns (RTL-Aware)

### Hover States
- Subtle shadow increase: `hover:shadow-md`
- Color darkening: Primary colors shift to darker shade
- Slight upward movement: `hover:-translate-y-1` for cards

### Focus States
- Blue ring: `focus:ring-2 focus:ring-blue-500`
- High contrast for accessibility
- RTL-aware focus management

### Loading States
- Skeleton screens with `bg-gray-200 animate-pulse`
- Spinner: Blue with `animate-spin`

### Transitions
- Duration: `duration-200` for most interactions
- Easing: `ease-out` for natural feel

## 📱 Responsive Breakpoints
- **Mobile**: Default (<640px) - Single column, RTL-optimized
- **Tablet**: `sm:` (640px+) - Two columns, maintained RTL
- **Desktop**: `lg:` (1024px+) - Multi-column with RTL support
- **Wide**: `xl:` (1280px+) - Full layout with RTL

## ♿ Accessibility Guidelines (Hebrew)
- Minimum contrast ratio: 4.5:1 for Hebrew text
- Focus indicators on all interactive elements
- Proper ARIA labels in Hebrew for screen readers
- Keyboard navigation support (RTL-aware)
- Alt text in Hebrew for all informative images
- Screen reader support for Hebrew content

## 🖼️ Imagery & Icons (RTL Context)
- **Icons**: Heroicons (outline style preferred)
- **Icon Size**: `w-5 h-5` for inline, `w-6 h-6` for buttons
- **RTL Icons**: Directional icons flip with `rtl:rotate-180`
- **Illustrations**: Modern, minimalist, using primary color palette
- **Photos**: High-quality Israeli academic/campus imagery

## 🔤 Hebrew Text Examples

### Common UI Text (Hebrew)
```jsx
// Page titles
<h1>מצא את המסלול האקדמי המושלם שלך</h1>

// Buttons
<button>התחל את המסע ←</button>
<button>הגש מועמדות</button>
<button>השווה תוכניות</button>

// Form labels
<label>ציון פסיכומטרי</label>
<label>ציוני בגרות</label>
<label>העדפות אישיות</label>

// Status messages
<p className="text-emerald-600">הפרופיל נשמר בהצלחה!</p>
<p className="text-red-600">אנא מלא את כל השדות הנדרשים</p>

// Navigation
<nav>
  <a href="/programs">תוכניות לימוד</a>
  <a href="/universities">אוניברסיטאות</a>
  <a href="/profile">הפרופיל שלי</a>
</nav>
```

---
*מדריך עיצוב זה מבטיח עיצוב ויזואלי עקבי ברחבי פלטפורמת התאמת התוכניות האקדמיות* 