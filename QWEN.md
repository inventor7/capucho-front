# Jawbli-Front Project Context

## Project Overview

Jawbli is an AI chatbot platform designed for Algerian e-commerce businesses to automate customer service and order management on WhatsApp. The front-end is built with Vue 3 using TypeScript, Vite, and follows the project specifications in project-specifications.md.

**Key Technologies:**
- Framework: Vue 3.5+ with Composition API
- Build Tool: Vite
- State Management: Pinia with persisted state
- UI Framework: Tailwind CSS 4 with custom shadcn-style components
- Icons: Unplugin-icons with Lucide icon library
- Internationalization: Vue I18n
- Database: Supabase
- HTTP Client: Axios
- Query Management: TanStack Query (Vue Query)
- Utility Libraries: VueUse, Class Variance Authority, clsx

## Architecture

The application follows a layered architecture pattern:
- **Presentation Layer:** Components, Pages, Layouts
- **Business Logic Layer:** Stores, Services, Composables
- **Data Layer:** API clients, database interactions
- **Infrastructure Layer:** Plugins, Utilities, Configuration

### Key Architecture Components
- Automatic routing via `unplugin-vue-router`
- Layout system using `vite-plugin-vue-layouts`
- Auto-imports for Vue APIs, Pinia, VueUse, and custom functions
- Automatic component registration
- Image optimization with WebP conversion

## Building and Running

### Development Setup
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm run type-check

# Lint and format
pnpm lint
pnpm format

# Preview production build
pnpm preview
```

### Environment Variables
- VITE_API_URL: Backend API URL
- VITE_SUPABASE_URL: Supabase project URL
- VITE_SUPABASE_ANON_KEY: Supabase anonymous key

## Key Features and Functionality

### 1. Authentication System
- Integrated with Supabase Auth
- Protected routes using auth guard
- User state persistence

### 2. Product Management
- CSV/Excel import functionality
- Product catalog management
- Inventory tracking

### 3. Order Management
- Order creation and tracking
- Status updates and notifications
- Export capabilities

### 4. Conversation Interface
- WhatsApp integration
- AI-powered chatbot responses
- Conversation history tracking

### 5. Dashboard Analytics
- Business metrics visualization
- Revenue and order tracking
- Customer interaction analytics

### 6. Multi-language Support
- Arabic (RTL support)
- English and French
- Automatic language detection

## Project Structure

```
src/
├── assets/                 # Static assets and styles
│   └── styles/
│       └── main.css        # Main CSS file with Tailwind
├── components/            # Reusable UI components
│   ├── ui/               # shadcn-style components
│   └── theme/            # Theme-related components
├── composables/          # Vue composition functions
│   └── api/              # API query/mutation composables
├── layouts/              # Page layouts
├── lib/                  # Utility functions
│   └── utils.ts          # Utility functions
├── locales/              # Internationalization files
├── pages/                # Route components
├── plugins/              # Vue plugins
├── router/               # Routing configuration
├── services/             # API service layers
├── stores/               # Pinia stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Development Conventions

### Component Development
- Use `<script setup>` syntax with TypeScript strict mode
- Follow PascalCase for component names
- Define props with TypeScript interfaces
- Use descriptive names that reflect component purpose
- Implement proper error handling
- Use storeToRefs when accessing store properties in components to make them reactive
- Check existing shadcn-vue registry components before creating new ones
- Follow shadcn/reka ui patterns for complex reusable components with advanced provide/inject contexts
- Ensure components have single responsibility and are modular
- Leverage Reka UI primitives when building new components

### Import Management
- Do NOT import anything that's already configured in unplugin-auto-import
- Use existing auto-imported functions from Vue, Pinia, VueUse, and Vue Router
- Check tsconfig paths to prevent duplicate imports
- Validate imports against existing configuration

### Routing
- Use unplugin-vue-router for file-based routing
- Follow the automatic route generation from file structure
- Use setupLayouts for layout system integration

### State Management
- Use Pinia stores with composition API syntax (defineStore with arrow function)
- Define computed properties for derived state
- Implement loading states for async operations
- Use persisted state for important user data
- Use storeToRefs when accessing store properties in components
- Follow single responsibility for each store

### API Integration
- Use TanStack Query (Vue Query) for server state management
- Implement generic API composables for common operations
- Use entity-specific composables for each domain
- Follow centralized error handling patterns
- Leverage existing Vue Query configuration in plugins

### Composables
- Use existing unplugin-auto-import configuration for composables
- Check VueUse library before creating new utility functions
- Follow Vue Composition API patterns
- Use descriptive names starting with 'use'
- Implement proper cleanup mechanisms when needed

### Styling
- Use Tailwind CSS with semantic color names
- Implement consistent design system using `cva` (Class Variance Authority)
- Support both light and dark modes
- Follow accessibility best practices
- Use existing component variants before creating new ones
- Leverage cn() utility for class merging

### Performance Optimizations
- Focus on performance optimizations and advanced best practices
- Use proper reactivity patterns with refs and computed properties
- Implement efficient component rendering
- Leverage Vue's performance features (v-memo, v-once, etc. when appropriate)
- Optimize image loading and use WebP format where possible

### Internationalization
- Use Vue I18n with automatic locale loading
- Support RTL languages (like Arabic)
- Maintain consistency across all languages
- Use descriptive translation keys

## Special Considerations

### Algerian Market Focus
- Darija language support in user-facing interfaces
- Local payment methods integration
- Algerian wilaya (province) system integration
- Cultural considerations in UI/UX

### Performance
- Image optimization with WebP conversion
- Component lazy loading
- Efficient state management
- API response caching

### Security
- Supabase Row Level Security (RLS) implementation
- Environment variable management
- Input validation and sanitization
- Secure API communication

## Testing Strategy
- Unit tests for business logic
- Component tests for UI elements
- Integration tests for API interactions
- End-to-end tests for critical user flows

## Deployment
- Production builds optimized with Vite
- Environment-specific configurations
- Asset optimization and compression
- CDN-ready static assets

This project is designed to scale from a single merchant to thousands, with multi-tenancy built in at the database level and a modular architecture that allows for future feature expansion.