Here’s a polished, ready-to-paste version of your README with slight refinements for clarity, formatting, and flow while keeping it professional and GitHub-friendly:

```markdown
# 🏥 Patient Directory Application

A modern, responsive patient directory application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.
Includes real-time search, filtering, sorting, and both card and table view modes.

---

## 🚀 Features

- **Dual View Modes** – Switch between card and table layouts
- **Real-time Search** – Debounced search with 300ms delay for optimal performance
- **Advanced Filtering** – Filter by medical issues with visual badges
- **Multi-field Sorting** – Sort by name, age, or medical issue (ascending/descending)
- **Responsive Design** – Fully responsive across all device sizes
- **Performance Optimized** – Memoized components and debounced API calls
- **Accessible** – ARIA labels and keyboard navigation support

---

## 🏗️ Architecture

### Frontend Structure
```

app/
├── api/patients/ # API routes for patient data
├── _components
   ├── header.tsx # App header with patient count
   ├── view-tabs.tsx # View mode switcher (card/table)
   ├── search-and-filters.tsx # Search bar and filter controls
   ├── patient-list.tsx # Patient list container
   ├── patient-card.tsx # Individual patient card
   ├── patient-table.tsx # Table view
   ├── pagination.tsx # Pagination controls
   ├── loading-state.tsx # Loading skeleton
   ├── error-state.tsx # Error handling component
   └── medical-issue-badge.tsx # Medical issue badge with color coding
├── page.tsx # Main patient directory page
└── layout.tsx # Root layout with fonts
hooks/
├── use-patients.ts # Patient data fetching
├── use-patient-filters.ts # Filter/search state management
└── use-debounce.ts # Debounce utility

types/
└── patient.ts # TypeScript interfaces

````

### Key Decisions
1. **Separation of Concerns**
   - Data layer (`usePatients`) → API communication
   - State layer (`usePatientFilters`) → filter/search state
   - UI layer → purely presentation components
   - API layer → request handling & formatted responses

2. **Performance Optimizations**
   - Debounced search (300ms)
   - Memoization with `useMemo` & `useCallback`
   - Server-side filtering & pagination

3. **State Management Strategy**
```ts
const {
  searchTerm,        // Immediate UI state
  debouncedSearch,   // API call trigger
  activeFilters,     // Memoized filters
  // handlers...
} = usePatientFilters()
````

4. **Component Design**

   - Single responsibility per component
   - Compositional UI
   - Strict TypeScript props interfaces
   - Declarative error/loading states

5. **Data Flow**

```
User Input → usePatientFilters → useDebounce → usePatients → API → UI Update
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Fetching**: Custom hooks + fetch API
- **State Management**: React hooks (useState, useEffect, useMemo, useCallback)

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone repository
git clone <repository-url>
cd patient-directory-app

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

Visit → [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
pnpm build
pnpm start
```

---

## 🎨 Design System

### Color Palette

- **Primary**: Blue
- **Medical Issues**: 10 distinct colors for conditions
- **Neutrals**: Grayscale for backgrounds & text
- **Status**: Green (success), Red (error), Yellow (warning)

### Typography

- **Font**: Inter (headings & body)
- **Responsive**: Scales appropriately across devices

### Breakpoints

- Mobile: `< 640px`
- Tablet: `640px – 1024px`
- Desktop: `> 1024px`

---

## 🔧 Configuration

### Environment

No environment variables required for basic functionality.

### Customization

**Add New Medical Issues** → `hooks/use-patient-filters.ts`

```ts
const MEDICAL_ISSUES = [
	'fever',
	'headache',
	// add new here
] as const;
```

**Modify Colors** → `components/patient-directory/medical-issue-badge.tsx`

```ts
const MEDICAL_ISSUE_COLORS = {
	'new-issue': {
		bg: 'bg-purple-50',
		text: 'text-purple-700',
		border: 'border-purple-200',
	},
};
```

---

## 📊 Performance

- **Debounce**: 300ms on search input
- **Memoization**: Stable references for filters & handlers
- **API Efficiency**: Server-side filtering + pagination

---

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repo to Vercel
2. Configure build:

   - Build Command → `pnpm build`
   - Output Directory → `.next`

3. Auto-deploy on push

### Other Platforms

Works on any Node.js hosting (e.g., Render, Netlify, Railway).

---

## 🔍 Troubleshooting

**TypeScript Build Errors**

- Ensure proper type definitions
- Fix `any` usages (ESLint flags them)

**Performance Issues**

- Verify debouncing in Network tab
- Confirm memoization on expensive ops

**Responsive Issues**

- Test across multiple screen sizes
- Validate Tailwind responsive classes

**Debug Mode**

```ts
console.log('[DEBUG] Component rendered with:', props);
```

(Remove before production)

---
