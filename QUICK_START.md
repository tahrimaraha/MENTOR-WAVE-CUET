# 🚀 Quick Start Guide - Mentor Wave CUET

## Welcome!

This guide will help you get started with the Mentor Wave CUET web application in just a few minutes.

## 📋 What You Have

Your project includes:
- ✅ 9 fully functional HTML pages
- ✅ Complete CSS styling (1000+ lines)
- ✅ Interactive JavaScript functionality
- ✅ Responsive design for all devices
- ✅ Role-based dashboards (Tutor, Guardian, Admin)
- ✅ Complete documentation

## 🎯 How to Use

### Option 1: Direct File Opening (Simplest)

1. Navigate to your project folder: `d:\Srabon Frontend`
2. Double-click on `index.html`
3. Your default browser will open the home page
4. Click "Login" or "Register" to explore

### Option 2: Local Development Server (Recommended)

**Using Python (if installed):**
```bash
cd "d:\Srabon Frontend"
python -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (if installed):**
```bash
cd "d:\Srabon Frontend"
npx serve
```
Then open the URL shown in terminal

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 Testing the Application

### Test as a Tutor

1. Go to `register.html`
2. Select "Tutor" tab
3. Fill in the form with:
   - Email: `yourname@student.cuet.ac.bd` (must end with @student.cuet.ac.bd)
   - Password: `password123` (or any 8+ characters)
4. Click "Register as Tutor"
5. You'll be redirected to login
6. Login with the same credentials
7. Select role: "Tutor"
8. Explore: Dashboard → Browse Tuitions → My Profile

### Test as a Guardian

1. Go to `register.html`
2. Select "Guardian" tab
3. Fill in the form with any valid email
4. Password: `password123`
5. After registration, login as Guardian
6. Explore: Dashboard → Post Tuition → View Posts

### Test as Admin

1. Go to `login.html`
2. Email: `admin@mentorwave.com`
3. Password: `admin123`
4. Role: Admin
5. Explore: Admin Dashboard → Verify Tutors → Reports

## 📱 Page Guide

### Public Pages
- **index.html** - Home page with features
- **login.html** - Login for all roles
- **register.html** - Registration (Tutor/Guardian)
- **messages.html** - Messaging interface

### Tutor Pages (tutor/)
- **dashboard.html** - Stats and overview
- **browse.html** - Find tuition jobs
- **profile.html** - Manage your profile

### Guardian Pages (guardian/)
- **dashboard.html** - View posts and interested tutors
- **post_tuition.html** - Create new tuition posts

### Admin Pages (admin/)
- **dashboard.html** - Manage platform

## 🎨 Customization

### Change Colors
Open `css/style.css` and modify:
```css
:root {
    --primary-color: #2563eb;  /* Change to your color */
    --secondary-color: #10b981; /* Change to your color */
}
```

### Modify Content
- Edit HTML files directly
- All text is editable
- Add/remove sections as needed

## 🔧 Features Overview

### ✅ Working Features
- Form validation (email, password, CUET email)
- Login/Registration flow
- Role-based routing
- Tuition filtering (class, subject, location, salary)
- Profile editing
- Messaging interface
- Mobile responsive navigation
- Toast notifications
- Modal dialogs
- LocalStorage persistence

### 📝 Sample Data
The application uses simulated data for demonstration:
- Sample tutors
- Sample tuition posts
- Sample conversations
- All data is stored in browser LocalStorage

## 💡 Tips

1. **Mobile Testing**: 
   - Press F12 in browser
   - Click device toolbar icon
   - Select mobile device

2. **Clearing Data**:
   - Open browser console (F12)
   - Type: `localStorage.clear()`
   - Refresh page

3. **Browser Compatibility**:
   - Works best in Chrome, Firefox, Safari, Edge
   - Enable JavaScript
   - Allow LocalStorage

## 🐛 Troubleshooting

**Problem**: Pages not loading properly
- **Solution**: Check that all files are in correct folders
- Verify file paths in HTML

**Problem**: Styling not showing
- **Solution**: Ensure `css/style.css` exists
- Check browser console for 404 errors

**Problem**: JavaScript not working
- **Solution**: Ensure `js/main.js` exists
- Check browser console for errors
- Verify JavaScript is enabled

**Problem**: Can't login
- **Solution**: This is frontend-only, any valid email/password works
- Just ensure email format is correct
- Password must be 8+ characters

## 📂 File Structure Checklist

```
✅ index.html
✅ login.html
✅ register.html
✅ messages.html
✅ README.md
✅ css/
   ✅ style.css
✅ js/
   ✅ main.js
✅ tutor/
   ✅ dashboard.html
   ✅ browse.html
   ✅ profile.html
✅ guardian/
   ✅ dashboard.html
   ✅ post_tuition.html
✅ admin/
   ✅ dashboard.html
```

## 🎓 Learning Path

**Beginners**: 
1. Start with `index.html` - understand structure
2. Look at `css/style.css` - see how styling works
3. Check `js/main.js` - learn JavaScript basics

**Intermediate**:
1. Modify colors and fonts
2. Add new form fields
3. Create additional pages

**Advanced**:
1. Integrate with real backend (Node.js/PHP/Python)
2. Add database (MongoDB/MySQL)
3. Implement real authentication
4. Deploy to hosting service

## 🚀 Next Steps

### For Development:
1. Set up version control (Git)
2. Create a backend API
3. Add a database
4. Implement real authentication
5. Add email notifications
6. Deploy to web hosting

### For Learning:
1. Study the HTML structure
2. Analyze CSS techniques
3. Understand JavaScript functions
4. Modify and experiment
5. Add new features

## 📚 Resources

**HTML/CSS/JavaScript**:
- MDN Web Docs: https://developer.mozilla.org
- W3Schools: https://www.w3schools.com
- CSS Tricks: https://css-tricks.com

**Deployment**:
- GitHub Pages (free hosting)
- Netlify (free hosting)
- Vercel (free hosting)

## 💬 Support

For issues or questions:
1. Check README.md for detailed documentation
2. Review code comments in files
3. Open browser console (F12) for errors
4. Verify all files are present

## ✨ Enjoy!

You now have a fully functional, modern web application. Feel free to:
- Modify the design
- Add new features
- Use it as a portfolio project
- Learn from the code
- Build upon it

**Happy Coding!** 🎉

---

**Project**: Mentor Wave CUET  
**Type**: Frontend Web Application  
**Tech**: HTML5, CSS3, Vanilla JavaScript  
**Status**: Complete & Ready to Use
