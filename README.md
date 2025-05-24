# 🎓 Academic Program Matching Platform
### פלטפורמת התאמת תוכניות אקדמיות

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

An intelligent platform designed to help Israeli students find their perfect academic path by matching their grades with Computer Science and Psychology programs at Israeli universities.

**פלטפורמה חכמה המיועדת לעזור לסטודנטים ישראלים למצוא את המסלול האקדמי המושלם על ידי התאמת הציונים שלהם לתוכניות מדעי המחשב ופסיכולוגיה באוניברסיטאות בישראל.**

## ✨ Key Features | תכונות עיקריות

### 🎯 **Smart Matching Algorithm**
- **Personalized Recommendations**: Advanced matching based on Bagrut grades and Psychometric scores
- **Confidence Levels**: Clear indicators - "סיכוי גבוה", "התאמה טובה", "התאמה פוטנציאלית"
- **Missing Requirements**: Detailed explanations of what's needed for admission

### 🇮🇱 **Hebrew-First Design**
- **Full RTL Support**: Native right-to-left layout for Hebrew content
- **Israeli Academic System**: Built specifically for Bagrut and Psychometric scoring
- **Hebrew Fonts**: Optimized typography with Heebo, Assistant, and Rubik fonts

### 🏛️ **Comprehensive University Database**
- **10+ Israeli Universities**: Tel Aviv, Hebrew University, Technion, and more
- **CS & Psychology Programs**: Both single and combined degree options
- **Real Requirements**: Accurate admission criteria and program details

### 📱 **Mobile-Optimized Experience**
- **Progressive Web App**: Responsive design for all devices
- **Intuitive Onboarding**: Step-by-step wizard for academic profile creation
- **Fast Performance**: Optimized for Israeli mobile users (70%+ mobile usage)

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for Hebrew-optimized styling and RTL support
- **React Router** for SPA navigation
- **React Hook Form** with Yup validation

### Backend
- **Node.js** with Express/Nest.js framework
- **PostgreSQL** database with optimized indexing
- **TypeScript** throughout the stack
- **JWT Authentication** for secure user sessions

### Development & Testing
- **Jest** for comprehensive testing
- **ESLint & Prettier** for code quality
- **GitHub Actions** for CI/CD
- **Swagger/OpenAPI** for API documentation

## 📊 Project Structure

```
mlim/
├── 📁 memory-bank/              # Project documentation and design
│   ├── style-guide.md          # Hebrew-optimized design system
│   ├── tasks.md                # Project tracking and status
│   └── creative/               # UI/UX design decisions
├── 📁 .cursor/rules/           # Development guidelines
│   ├── project-guidelines.mdc  # Git workflow and Hebrew requirements
│   └── isolation_rules/        # Architecture and workflow rules
├── 📁 src/                     # Source code (to be created)
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   └── types/                  # TypeScript definitions
├── 📁 server/                  # Backend API (to be created)
│   ├── routes/                 # API endpoints
│   ├── models/                 # Database models
│   └── controllers/            # Business logic
└── 📁 database/                # Database schema and migrations
```

## 🎨 Design Philosophy

### Hebrew-First Approach
- **User Interface**: All user-facing text in Hebrew
- **RTL Layout**: Right-to-left reading patterns
- **Cultural Sensitivity**: Designed for Israeli academic culture

### Technical Excellence
- **Code & Comments**: English for international collaboration
- **Clean Architecture**: Separation of concerns and maintainability
- **Performance**: Optimized for Israeli internet infrastructure

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/tsachovadia/mlim.git
cd mlim

# Install dependencies (when available)
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys

# Run database migrations (when available)
npm run db:migrate

# Start development server (when available)
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/mlim

# JWT Secret
JWT_SECRET=your-secret-key

# API Keys (optional for enhanced features)
OPENAI_API_KEY=your-openai-key
```

## 🏗️ Architecture Overview

### Database Schema
- **Institutions** → **Faculties** → **Programs** → **Requirements**
- **Users** → **Academic Profiles** → **Grades/Scores**
- **Matching Results** with confidence levels and explanations

### API Endpoints
- `GET /api/v1/programs` - Program discovery with filtering
- `POST /api/v1/users/profile` - Academic profile management
- `POST /api/v1/matching/analyze` - Smart matching algorithm
- `GET /api/v1/institutions` - University and faculty data

### Matching Algorithm
1. **Hard Requirements Gate**: Minimum thresholds (Psychometric, Bagrut)
2. **Weighted Scoring**: 35% Psychometric, 30% Bagrut, 25% Subjects, 10% Preferences
3. **Confidence Calculation**: Clear Hebrew categories for user understanding

## 📋 Development Workflow

### Git Workflow
- **Commit on every new file** with descriptive messages
- **Hebrew UI text** for all user-facing content
- **English code and comments** for technical maintainability
- **Automatic push** to GitHub repository

### Code Standards
- TypeScript strict mode enabled
- ESLint configuration for consistency
- Prettier for code formatting
- Hebrew text validation in UI components

### Testing Strategy
- Unit tests for matching algorithm
- Integration tests for API endpoints
- E2E tests for critical user flows
- Hebrew text rendering validation

## 🎯 Current Status

### ✅ Completed (Creative Phase)
- [x] Comprehensive design system with Hebrew support
- [x] Landing page and onboarding flow design
- [x] Program discovery interface wireframes
- [x] Matching algorithm architecture
- [x] Project guidelines and workflow

### 🚧 In Progress (Implementation Phase)
- [ ] Database schema implementation
- [ ] Backend API development
- [ ] Frontend component library
- [ ] Matching algorithm implementation
- [ ] User authentication system

### 📅 Upcoming
- [ ] University data seeding
- [ ] Advanced filtering capabilities
- [ ] Program comparison tools
- [ ] Analytics and insights dashboard

## 🤝 Contributing

### Development Guidelines
1. **Hebrew UI**: All user-facing text must be in Hebrew
2. **RTL Support**: Ensure proper right-to-left layout
3. **Code Quality**: Follow TypeScript and React best practices
4. **Testing**: Write tests for new features
5. **Documentation**: Update README and comments

### Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request with Hebrew UI validation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Israeli Ministry of Education** for academic requirements data
- **Hebrew Typography Community** for font and layout guidance
- **Open Source Contributors** for tools and frameworks used

## 📞 Support & Contact

For questions, suggestions, or support:
- 📧 **Email**: [Your contact email]
- 🐛 **Issues**: [GitHub Issues](https://github.com/tsachovadia/mlim/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/tsachovadia/mlim/discussions)

---

**Made with ❤️ for Israeli students seeking their academic path**
**נוצר באהבה ❤️ עבור סטודנטים ישראלים המחפשים את הדרך האקדמית שלהם** 