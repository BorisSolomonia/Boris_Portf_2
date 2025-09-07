# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview.

This is Boris's portfolio project directory. The project appears to be in its initial setup phase with no code structure yet established.

## Development Setup

Since this is a new portfolio project, common setup patterns would include:

**For a React/Next.js portfolio:**
```bash
# Initialize with Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking (if added)
```

**For a Vue portfolio:**
```bash
# Initialize with Vue
npm create vue@latest .
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting
```

**For a vanilla HTML/CSS/JS portfolio:**
```bash
# Serve locally
npx serve .
# Or with Python
python -m http.server 8000
```

## Architecture Considerations

When developing this portfolio:

- **Structure**: Organize by feature/section (About, Projects, Contact, etc.)
- **Responsive Design**: Ensure mobile-first approach
- **Performance**: Optimize images and assets for web
- **SEO**: Include proper meta tags and semantic HTML
- **Accessibility**: Follow WCAG guidelines for inclusive design

## Common Portfolio Sections

Typical sections to implement:
- Hero/Introduction
- About/Bio
- Skills/Technologies
- Projects/Work showcase
- Experience/Resume
- Contact information
- Blog (optional)

## Asset Management

- Store images in `/public/images/` or `/assets/images/`
- Optimize images for web (WebP format recommended)
- Use appropriate alt text for accessibility
- Consider using a CDN for larger assets

## Deployment Considerations

**Target Platform: GCP VM**

The portfolio must be built for deployment on Google Cloud Platform Virtual Machine:

- **Static Build Required**: Generate static files that can be served by a web server (nginx/Apache)
- **Build Commands**: Use `npm run build` or equivalent to create production-ready static files
- **Output Directory**: Ensure build output goes to standard directories (`dist/`, `build/`, `out/`)
- **Web Server Configuration**: Files must be servable by standard web servers on GCP VM
- **Asset Paths**: Use relative paths or configure base paths for proper asset loading
- **Environment Variables**: Configure for production environment on VM

**Recommended Build Targets:**
```bash
# For Next.js - static export
npm run build && npm run export
# Output: out/ directory

# For React/Vue - static build
npm run build
# Output: dist/ or build/ directory

# For vanilla projects - no build needed, serve directly
```

## SavvY Projects Component Requirements

**File Upload & Display System:**

The SavvY Projects component (`src/components/SavvYProjects.tsx`) handles professional presentation uploads with specific requirements:

### Admin Authentication
- Simple localStorage-based admin toggle (`isAdmin` state)
- Only admins can upload files - upload area hidden for regular users
- Admin mode toggle button at bottom of component

### File Upload Functionality
- Supports PPT (.ppt, .pptx) and PDF files up to 50MB
- Drag & drop or click to upload interface
- File validation and error handling
- Multiple file upload support

### Cover Photo Extraction.
- **First page must be extracted as cover photo** for uploaded presentations
- Cover photos displayed in main project grid (slightly blurred preview)
- Generated preview should simulate document layout with:
  - Document header with filename and type
  - Simulated content sections (text blocks, charts, diagrams)
  - Professional presentation-style layout
- Cover photos stored as base64 data URLs in `previewUrl` field

### Project Display Integration  
- Uploaded files automatically appear in main projects grid alongside static projects
- Project names extracted from filenames (remove extensions, replace separators with spaces, capitalize)
- Upload date used for project date
- Green "✓ Uploaded" badge distinguishes uploaded projects from static ones
- Generated descriptions include upload date

### Modal Content Display
- **CRITICAL REQUIREMENT**: When clicking on any project icon (especially uploaded projects), user must be redirected to a modal/page showing the COMPLETE project with ALL pages
- **No blank pages allowed** - clicking must always open full project viewer
- **Uploaded Projects**: Must show all pages (3-10+ pages) with navigation
- **Page Navigation**: Previous/Next buttons, page counter, thumbnail navigation
- **Full Page Visibility**: Each page must be clearly visible and navigable
- **Debug Requirements**: If modal doesn't open, add extensive console logging to identify:
  - Click handler execution
  - State changes (selectedProject, showBlurredView)
  - Modal rendering conditions
  - Project data availability
  - JavaScript errors preventing display

### Static vs Uploaded Project Display
- **Static Projects**: Show simulated content with light blur (`blur-[1.5px]`)
- **Uploaded Projects**: Show actual generated pages without blur, fully navigable
- **Content Structure**: 
  - Project title and company header
  - Executive summary section  
  - Key findings with bullet points
  - Simulated charts and graphs
  - Professional business presentation layout

### Technical Implementation
- UploadedFile interface includes: id, name, size, type, uploadDate, previewUrl
- File upload utility (`src/utils/fileUpload.ts`) handles validation and preview generation
- Preview generation creates realistic document previews using HTML5 Canvas
- State management combines static projects with uploaded projects array

### Security & Privacy
- Blur level protects confidential content while showing general structure
- Upload functionality restricted to admin users only
- File size limits and type validation for security

## Testing

For portfolio projects, focus on:
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Performance testing (Lighthouse scores)
- Accessibility testing
- File upload functionality testing (admin mode)
- Cover photo generation and display testing