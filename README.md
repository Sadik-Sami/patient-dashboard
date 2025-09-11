# Patient Directory Application

A modern, responsive patient directory application built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time search, filtering, sorting, and both card and table view modes.

## 🚀 Features

- **Dual View Modes**: Switch between card and table layouts
- **Real-time Search**: Debounced search with 300ms delay for optimal performance
- **Advanced Filtering**: Filter by medical issues with visual badges
- **Multi-field Sorting**: Sort by name, age, or medical issue (ascending/descending)
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Memoized components and debounced API calls
- **Accessible**: ARIA labels and keyboard navigation support

## 🏗️ Architecture

### Frontend Architecture

\`\`\`
app/
├── api/patients/          # API routes for patient data
├── page.tsx              # Main patient directory page
└── layout.tsx            # Root layout with fonts

app/_componenets/
├── header.tsx            # Application header with patient count
├── view-tabs.tsx         # View mode switcher (card/table)
├── search-and-filters.tsx # Search bar and filter controls
├── patient-list.tsx      # Patient list container
├── patient-card.tsx      # Individual patient card component
├── patient-table.tsx     # Table view component
├── pagination.tsx        # Pagination controls
├── loading-state.tsx     # Loading skeleton
├── error-state.tsx       # Error handling component
└── medical-issue-badge.tsx # Medical issue badge with color coding

hooks/
├── use-patients.ts       # Patient data fetching with SWR-like pattern
└── use-patient-filters.ts # Filter state management

types/
└── patient.ts            # TypeScript interfaces
\`\`\`

### Key Architectural Decisions

#### 1. **Separation of Concerns**

- **Data Layer**: `usePatients` hook handles all API communication
- **State Layer**: `usePatientFilters` manages filter/search state
- **UI Layer**: Components focus purely on presentation
- **API Layer**: Route handlers process requests and return formatted data

#### 2. **Performance Optimizations**

- **Efficient Filtering**: Server-side filtering reduces client-side processing
- **Pagination**: Limits data transfer and improves load times

#### 3. **State Management Strategy**

\`\`\`typescript
// Centralized filter state
const {
searchTerm, // Immediate UI state
debouncedSearch, // API call trigger
activeFilters, // Memoized filter array
// ... handlers
} = usePatientFilters()
\`\`\`

#### 4. **Component Design Patterns**

- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Complex UI built from simple, reusable components
- **Props Interface**: Strict TypeScript interfaces for component contracts
- **Conditional Rendering**: Loading/error states handled declaratively

#### 5. **Data Flow**

\`\`\`
User Input → usePatientFilters → usePatients → API → UI Update
\`\`\`

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Fetching**: Custom hooks with fetch API
- **State Management**: React hooks (useState, useEffect)

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd patient-directory-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install

# or

npm install
\`\`\`

3. **Start development server**
   \`\`\`bash
   pnpm dev

# or

npm run dev
\`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash

# Build the application

pnpm build

# Start production server

pnpm start
\`\`\`

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3B82F6, #1E40AF, #1E3A8A)
- **Medical Issue Colors**: 10 distinct colors for different conditions
- **Neutrals**: Gray scale for backgrounds and text
- **Status Colors**: Green (success), Red (error), Yellow (warning)

### Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality.

### Customization

#### Adding New Medical Issues

Update the `MEDICAL_ISSUES` array in `hooks/use-patient-filters.ts`:

\`\`\`typescript
const MEDICAL_ISSUES = [
"fever",
"headache",
// Add new issues here
] as const
\`\`\`

#### Modifying Colors

Update the color mapping in `components/patient-directory/medical-issue-badge.tsx`:

\`\`\`typescript
const MEDICAL_ISSUE_COLORS: Record<string, MedicalIssueColors> = {
"new-issue": {
bg: "bg-purple-50",
text: "text-purple-700",
border: "border-purple-200",
},
}
\`\`\`

## 📊 Performance Considerations

### Debouncing Strategy

- **Search Input**: 300ms delay balances responsiveness with API efficiency
- **Filter Changes**: Immediate application for better UX
- **Page Changes**: Immediate navigation

### Memoization Usage

- **activeFilters**: Prevents array recreation on every render
- **availableIssues**: Caches filtered medical issues list
- **Handler Functions**: Stable references prevent child re-renders

### API Optimization

- **Server-side Filtering**: Reduces client-side processing
- **Pagination**: Limits data transfer
- **Efficient Sorting**: Database-level sorting when possible

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
3. Deploy automatically on push

### Other Platforms

The application is a standard Next.js app and can be deployed to any platform supporting Node.js.
