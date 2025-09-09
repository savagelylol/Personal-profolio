# Overview

This is a full-stack web application built as a personal portfolio/developer showcase for "savage.dev". The application features a modern, interactive portfolio website with animated UI elements, skills visualization, project displays, and contact functionality. The frontend is built with React and TypeScript, styled with Tailwind CSS and shadcn/ui components, while the backend uses Express.js with a modular storage architecture.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with CSS custom properties for theming, shadcn/ui component library for consistent UI elements
- **State Management**: React Query (TanStack Query) for server state management, React Context for theme management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and database implementation for production
- **Development**: Hot module replacement with Vite integration for seamless full-stack development

## Design Patterns
- **Component Architecture**: Modular React components with clear separation of concerns (UI components, layout components, page components)
- **Repository Pattern**: Storage interface abstraction allowing for easy swapping between memory and database implementations
- **Provider Pattern**: Theme and query client providers for global state management
- **Custom Hooks**: Reusable hooks for mobile detection, toast notifications, and theme management

## Database Schema
- **Users Table**: Basic user entity with id, username, and password fields using PostgreSQL UUID generation
- **Type Safety**: Zod schemas for runtime validation and TypeScript types generated from Drizzle schema

## Frontend Features
- **Interactive Animations**: Custom cursor glow effects, floating background elements, and hover animations
- **Responsive Design**: Mobile-first approach with responsive navigation and layout components
- **Theme System**: Dark/light theme toggle with CSS custom properties and local storage persistence
- **Portfolio Sections**: Hero, skills visualization, projects showcase, about section, and contact form

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for database connectivity
- **drizzle-orm & drizzle-kit**: Type-safe ORM with PostgreSQL dialect and migration tools
- **@tanstack/react-query**: Server state management and caching for React applications

## UI Component Library
- **@radix-ui/***: Complete set of accessible, unstyled UI primitives (dialogs, dropdowns, forms, etc.)
- **shadcn/ui**: Pre-built component library built on top of Radix UI with Tailwind CSS styling
- **class-variance-authority**: Utility for creating consistent component variants
- **tailwindcss**: Utility-first CSS framework with PostCSS integration

## Development Tools
- **Vite**: Build tool with React plugin and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **@replit/vite-plugin-***: Replit-specific plugins for development environment integration

## Form and Validation
- **react-hook-form & @hookform/resolvers**: Form handling with validation
- **zod**: Schema validation library for runtime type checking
- **drizzle-zod**: Integration between Drizzle schema and Zod validation

## Additional Libraries
- **wouter**: Lightweight routing library for React
- **date-fns**: Date manipulation and formatting utilities
- **embla-carousel-react**: Carousel component for project showcases
- **cmdk**: Command palette component for enhanced user interaction