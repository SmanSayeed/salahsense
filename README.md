# Salah Sense - Progressive Web App

A modern, minimal, and user-friendly Islamic Prayer Progressive Web App (PWA) that provides prayer-related content with Arabic text, audio playback, and translations in Bangla and English.

## 🌟 Features

### Core Features
- 🌐 PWA with offline capabilities and "Install App" button
- 🔤 Multi-language support (Bangla, English, Arabic)
- 📱 100% responsive design
- 🎨 Modern, slick UI with Webflow-inspired design
- 💾 Local storage for caching and offline access
- ⚡ High performance with <2s page load
- ♿ WCAG 2.1 (AA) compliant for accessibility

### User Features
- 🔍 Advanced filtering and search capabilities
- 🎵 Audio playback with speed control
- 📋 Copy to clipboard functionality
- 🌙 Dark mode support
- 📚 Bookmark favorite topics
- 🔄 Infinite scroll for large content
- 📤 Social sharing
- 🎤 Voice search capability
- 🕌 Prayer time integration
- 📏 Customizable font sizes

## 🛠️ Technology Stack

### Frontend Framework
- Next.js 15.2.4 (with TypeScript)
- React 19
- Redux Toolkit for state management

### Styling & UI
- Tailwind CSS
- Shadcn UI components
- Framer Motion for animations
- Next-themes for dark mode

### Internationalization
- i18next
- react-i18next
- Multi-font support (Noto Serif Bengali, Noto Sans, Amiri)

### Data Management
- Local Storage API
- JSON data sources
- Redux for global state

## 📁 Project Structure

\`\`\`
islamic-prayer-pwa/
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/              # Static assets
├── store/               # Redux store setup
├── styles/             # Global styles
└── types/              # TypeScript type definitions
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/islamic-prayer-pwa.git
cd islamic-prayer-pwa
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

4. Build for production:
\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 🎯 Key Features Implementation

### PWA Configuration
- Service Worker for offline functionality
- Manifest file for app installation
- Cache management for JSON, images, and audio

### Performance Optimization
- Static Site Generation (SSG) for JSON data
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Debounced search (<300ms)

### Accessibility Features
- ARIA labels
- Keyboard navigation
- High contrast mode
- Screen reader compatibility
- Customizable font sizes

### State Management
- Redux Toolkit for global state
- Local storage for persistence
- Cached data management

## 📱 Responsive Design

The app follows a mobile-first approach with responsive breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Measures

- HTTPS enforcement
- JSON data sanitization
- Secure audio/image CDN usage
- Protected API endpoints
- XSS prevention

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn UI for component library
- Next.js team for the framework
- Contributors and maintainers

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers. 