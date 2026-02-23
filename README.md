# Mentor Wave CUET - A CUET-Based Tutor-Finding Web Application

A modern, responsive web application that connects verified CUET (Chittagong University of Engineering & Technology) students with guardians seeking quality tutors.

## 🎯 Project Overview

Mentor Wave CUET is a comprehensive tutor-finding platform designed exclusively for the CUET community. The application features a clean, university-style interface with role-based access for Tutors, Guardians, and Administrators.

## 🚀 Features

### General Features
- **Modern UI/UX**: Clean, minimal design with university aesthetics
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Role-Based Access**: Separate interfaces for Tutors, Guardians, and Admins
- **Real-Time Validation**: Client-side form validation using JavaScript
- **Secure Authentication**: Email validation and role-based routing

### For Tutors
- Browse available tuition opportunities
- Advanced filtering (class, subject, location, salary, gender preference)
- Profile management with privacy controls
- Show interest in tuition posts
- Dashboard with statistics and recent activity
- CUET email verification (@student.cuet.ac.bd)

### For Guardians
- Post tuition requirements
- View interested tutors
- Manage posted tuitions
- Filter and select qualified tutors
- Dashboard with post statistics
- Direct messaging capability

### For Administrators
- Verify new tutor registrations
- Manage user accounts
- Handle reports and complaints
- Monitor platform activity
- System statistics and analytics

## 📁 Project Structure

```
mentor-wave/
├── index.html                 # Home page
├── login.html                 # Login page
├── register.html              # Registration page
│
├── tutor/                     # Tutor pages
│   ├── dashboard.html         # Tutor dashboard
│   ├── browse.html            # Browse tuition opportunities
│   └── profile.html           # Tutor profile management
│
├── guardian/                  # Guardian pages
│   ├── dashboard.html         # Guardian dashboard
│   └── post_tuition.html      # Post new tuition
│
├── admin/                     # Admin pages
│   └── dashboard.html         # Admin control panel
│
├── css/                       # Stylesheets
│   └── style.css              # Main stylesheet (comprehensive)
│
└── js/                        # JavaScript files
    └── main.js                # Main JavaScript functionality
```

## 🛠️ Tech Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **LocalStorage**: Client-side data persistence
- **CSS Variables**: Consistent theming
- **Responsive Design**: Mobile-first approach

## 🎨 Design Features

### Color Palette
- Primary: Blue (#2563eb)
- Secondary: Green (#10b981)
- Gradients: Purple-to-Pink for hero sections
- Status Colors: Success (Green), Warning (Orange), Danger (Red)

### Layout Components
- Card-based design system
- Sticky navigation
- Fixed sidebar for dashboards
- Modal dialogs
- Responsive tables
- Progress indicators
- Toast notifications

### Typography
- System fonts for optimal performance
- Clear hierarchy with font weights
- Readable line heights

## 🚦 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. **Clone or download** the project files to your local machine

2. **Open the project** in your favorite code editor (VS Code recommended)

3. **Launch the application**:
   - Simply open `index.html` in your web browser
   - OR use a local development server:
     ```bash
     # If you have Python installed
     python -m http.server 8000
     
     # If you have Node.js installed
     npx serve
     ```

4. **Navigate** through the application:
   - Click on "Login" or "Register" to access the platform
   - Test different user roles (Tutor, Guardian, Admin)

### Test Credentials

Since this is a frontend-only application with simulated backend, you can use any valid email format:

**Tutor Login:**
- Email: `yourname@student.cuet.ac.bd`
- Password: Any password (min 8 characters)
- Role: Tutor

**Guardian Login:**
- Email: Any valid email
- Password: Any password (min 8 characters)
- Role: Guardian

**Admin Login:**
- Email: Any valid email
- Password: Any password (min 8 characters)
- Role: Admin

## 📱 Pages Overview

### 1. Home Page (index.html)
- Hero section with call-to-action buttons
- Features showcase
- Statistics section
- About section
- Footer with links

### 2. Authentication Pages
- **Login**: Role selection, email/password validation
- **Register**: Separate forms for Tutors and Guardians
  - Tutor: CUET email validation, student ID, department
  - Guardian: Basic information, location

### 3. Tutor Dashboard
- Welcome banner with stats
- Quick actions
- Recent applications table
- Profile completion indicator

### 4. Browse Tuitions
- Advanced filter panel (sticky)
- Tuition cards with details
- "Show Interest" functionality
- Sorting options

### 5. Tutor Profile
- Profile information display
- Privacy toggles for contact info
- Academic details
- Teaching preferences
- Experience section
- Edit modal

### 6. Guardian Dashboard
- Active posts overview
- Interested tutors list
- Stats cards
- Quick actions

### 7. Post Tuition
- Comprehensive form with validation
- Subject selection
- Schedule and compensation
- Location details
- Helper sidebar with tips

### 8. Admin Dashboard
- Pending verification table
- Approve/Reject actions
- Recent activity feed
- Reports management
- System statistics

## 💻 JavaScript Functionality

### Core Features
- **Authentication System**: Login/register with validation
- **Role-Based Routing**: Automatic redirection based on user role
- **Form Validation**: Real-time client-side validation
- **Data Persistence**: LocalStorage for user sessions
- **Dynamic Content**: DOM manipulation for interactive features
- **Filtering & Sorting**: Real-time tuition filtering
- **Modal Management**: Profile editing and detail views
- **Notifications**: Toast-style success/error messages

### Key Functions
```javascript
// Authentication
handleLogin(event)
handleTutorRegistration(event)
handleGuardianRegistration(event)
handleLogout(event)

// Validation
isValidEmail(email)
isValidCUETEmail(email)

// UI Management
showNotification(message, type)
initializeMobileMenu()
filterTuitions()

// Data Management
saveToStorage(key, data)
getFromStorage(key)
```

## 🎯 Key Features Implementation

### 1. Email Validation
- Standard email format validation
- CUET-specific validation for tutors (@student.cuet.ac.bd)
- Real-time feedback

### 2. Responsive Navigation
- Desktop: Full navigation bar
- Mobile: Hamburger menu with slide-in sidebar
- Sticky positioning for easy access

### 3. Card-Based Layout
- Consistent card design across pages
- Hover effects for interactivity
- Shadow elevations for depth

### 4. Form Validation
- Required field checking
- Pattern matching for emails and phone numbers
- Password confirmation
- Checkbox validation for subjects

### 5. Dashboard Statistics
- Real-time stat cards
- Color-coded indicators
- Badge notifications

### 6. Filtering System
- Multiple filter criteria
- Real-time results update
- Clear filters functionality
- Result count display

## 🔒 Security Considerations

**Note**: This is a frontend-only demonstration. For production use:
- Implement proper backend authentication
- Use HTTPS for all communications
- Implement CSRF protection
- Sanitize all user inputs server-side
- Use secure password hashing (bcrypt, Argon2)
- Implement rate limiting
- Add email verification
- Use JWT or session tokens

## 📱 Responsive Breakpoints

```css
/* Tablet and below */
@media (max-width: 1024px) {
    /* 2-column layouts become single column */
}

/* Mobile landscape */
@media (max-width: 768px) {
    /* Sidebar becomes overlay menu */
}

/* Mobile portrait */
@media (max-width: 480px) {
    /* Optimized for small screens */
}
```

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    /* Add your custom colors */
}
```

### Modifying Layout
- Adjust grid columns in `.features-grid`, `.stats-grid`, etc.
- Change `--container-width` for different max-width
- Modify `--sidebar-width` for sidebar size

### Adding New Pages
1. Create HTML file following the structure
2. Link CSS: `<link rel="stylesheet" href="../css/style.css">`
3. Link JS: `<script src="../js/main.js"></script>`
4. Add to navigation menu

## 📝 Code Structure

### HTML
- Semantic HTML5 elements
- BEM-like class naming
- Accessible markup (ARIA labels where needed)
- SEO-friendly meta tags

### CSS
- Mobile-first responsive design
- CSS Grid and Flexbox
- CSS Variables for theming
- Modular component styles
- Print-friendly styles

### JavaScript
- Modular function organization
- Event delegation where appropriate
- LocalStorage for data persistence
- Commented code for maintainability
- Error handling

## 🚀 Future Enhancements

Potential features for production version:
- Real backend integration (Node.js/Python/PHP)
- Database (MongoDB/PostgreSQL)
- Real-time chat system (Socket.io)
- Email notifications
- Payment integration
- Rating and review system
- Advanced search with Elasticsearch
- Mobile app (React Native/Flutter)
- Analytics dashboard
- AI-powered tutor recommendations

## 🐛 Known Limitations

- Frontend-only (no real data persistence across sessions)
- Simulated authentication (any credentials work)
- No actual email sending
- Limited to browser localStorage
- No real-time updates without refresh

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 👥 Credits

- **Design System**: Custom modern university-style design
- **Icons**: Emoji-based icons for universal compatibility
- **Fonts**: System fonts for optimal performance
- **Developer**: Senior Frontend Web Developer

## 📞 Support

For questions or issues:
- Review the code comments
- Check browser console for errors
- Verify all files are in correct directories
- Ensure JavaScript is enabled in browser

## 🎓 Learning Resources

This project demonstrates:
- Semantic HTML structure
- Modern CSS techniques (Grid, Flexbox, Variables)
- Vanilla JavaScript DOM manipulation
- Form validation
- Client-side routing simulation
- LocalStorage usage
- Responsive design patterns
- Component-based UI architecture

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Complete & Functional

Happy Coding! 🚀
