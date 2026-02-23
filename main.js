/* ============================================
   Mentor Wave CUET - Main JavaScript File
   Handles all interactive functionality
   ============================================ */

// ==================== GLOBAL STATE ====================
const APP_STATE = {
    currentUser: null,
    tutors: [],
    guardians: [],
    tuitions: [],
    messages: []
};

// ==================== SAMPLE DATA ====================
// Simulated tutor data
const SAMPLE_TUTORS = [
    {
        id: 1,
        name: "Ahmed Bin Rashid",
        email: "ahmed.rashid@student.cuet.ac.bd",
        studentId: "1904056",
        department: "CSE",
        phone: "+880 1712-345678",
        gender: "male",
        year: "3rd Year",
        cgpa: "3.85",
        subjects: ["Mathematics", "Physics", "Chemistry", "ICT"],
        classes: ["9", "10", "11", "12"],
        salary: "7000-12000",
        areas: "Nasirabad, Agrabad, Khulshi",
        verified: true,
        active: true
    },
    {
        id: 2,
        name: "Saima Khatun",
        email: "saima.khatun@student.cuet.ac.bd",
        studentId: "2004082",
        department: "EEE",
        phone: "+880 1812-345678",
        gender: "female",
        year: "2nd Year",
        cgpa: "3.92",
        subjects: ["Physics", "Mathematics", "Chemistry"],
        classes: ["9", "10", "11"],
        salary: "6000-10000",
        areas: "Agrabad, Panchlaish",
        verified: false,
        active: true
    },
    {
        id: 3,
        name: "Srabon Islam",
        email: "u2204096@student.cuet.ac.bd",
        studentId: "2204096",
        department: "CSE",
        phone: "+880 1331208629",
        gender: "male",
        year: "3rd Year",
        cgpa: "3.99",
        subjects: ["Mathematics", "Physics", "Chemistry", "ICT"],
        classes: ["9", "10", "11", "12"],
        salary: "7000-12000",
        areas: "Nasirabad, Agrabad, Khulshi",
        verified: true,
        active: true
     }
];

// Simulated tuition posts
const SAMPLE_TUITIONS = [
    {
        id: 1,
        title: "Mathematics Tutor Needed",
        class: "10",
        subjects: ["mathematics"],
        location: "Nasirabad, Chittagong",
        salary: 8000,
        days: 4,
        gender: "male",
        description: "Looking for an experienced mathematics tutor for SSC preparation.",
        postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        guardianId: 1,
        status: "active"
    },
    {
        id: 2,
        title: "Physics Tutor for HSC",
        class: "11",
        subjects: ["physics"],
        location: "Agrabad, Chittagong",
        salary: 10000,
        days: 5,
        gender: "",
        description: "Need a dedicated physics tutor for HSC preparation.",
        postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        guardianId: 1,
        status: "active"
    },
    {
        id: 3,
        title: "Chemistry & Biology Tutor",
        class: "9",
        subjects: ["chemistry", "biology"],
        location: "Khulshi, Chittagong",
        salary: 7500,
        days: 3,
        gender: "female",
        description: "Seeking a patient tutor for science subjects.",
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        guardianId: 1,
        status: "active"
    },
    {
        id: 4,
        title: "Higher Mathematics HSC",
        class: "12",
        subjects: ["mathematics"],
        location: "Panchlaish, Chittagong",
        salary: 12000,
        days: 6,
        gender: "",
        description: "Urgent requirement for higher mathematics tutor.",
        postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
        guardianId: 1,
        status: "active"
    }
];

// ==================== UTILITY FUNCTIONS ====================
/**
 * Format date to relative time
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    // Map notification types to CSS variables for consistent theming
    const typeMap = {
        success: 'var(--success)',
        error: 'var(--danger)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--info)'
    };

    const bgColor = typeMap[type] || 'var(--primary-color)';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${bgColor};
        color: black;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Get query parameter from URL
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Store data in localStorage
 */
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get data from localStorage
 */
function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate CUET email
 */
function isValidCUETEmail(email) {
    return email.endsWith('@student.cuet.ac.bd');
}

// ==================== AUTHENTICATION ====================
/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    console.log('Login attempt:', {role, email, password});

    // Validation
    if (!role) {
        errorDiv.textContent = 'Please select your role';
        errorDiv.style.display = 'block';
        return;
    }

    if (!isValidEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address';
        errorDiv.style.display = 'block';
        return;
    }

    if (role === 'tutor' && !isValidCUETEmail(email)) {
        errorDiv.textContent = 'Tutors must use @student.cuet.ac.bd email';
        errorDiv.style.display = 'block';
        return;
    }

    if (password.length < 8) {
        errorDiv.textContent = 'Password must be at least 8 characters';
        errorDiv.style.display = 'block';
        return;
    }

    // Prepare user object
    const user = {
        email: email,
        role: role,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };

    console.log('Saving user:', user);

    // Save current user and redirect to dashboard
    saveToStorage('currentUser', user);
    
    // Verify it was saved
    const saved = getFromStorage('currentUser');
    console.log('Verified saved user:', saved);
    
    showNotification('Login successful! Redirecting...');
    
    setTimeout(() => {
        if (role === 'tutor') {
            window.location.href = 'tutor/dashboard.html';
        } else if (role === 'guardian') {
            window.location.href = 'guardian/dashboard.html';
        } else if (role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 800);
}

/**
 * Generate a 6-digit numeric verification code
 */
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Start verification: store code and redirect to verification page
 */
function startVerification(email, role) {
    const code = generateVerificationCode();
    const verifications = getFromStorage('verifications') || {};
    verifications[email] = {
        code: code,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    };
    saveToStorage('verifications', verifications);
    // Save last sent code for demo/dev convenience
    saveToStorage('lastSentCode', { email, code });

    // If EmailJS is configured, try to send the code by email. Otherwise keep demo behaviour.
    const trySendEmail = async () => {
        // 1) try server-side send if configured
        try {
            if (typeof SERVER_EMAIL_CONFIG !== 'undefined' && SERVER_EMAIL_CONFIG.enabled) {
                try {
                    const resp = await fetch(SERVER_EMAIL_CONFIG.endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ to_email: email, to_name: email.split('@')[0], code: code, app_name: (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.appName) ? APP_CONFIG.appName : 'Mentor Wave' })
                    });
                    if (resp.ok) {
                        showNotification('Verification code sent to ' + email);
                        return true;
                    }
                    console.warn('Server email send failed', await resp.text());
                } catch (err) {
                    console.error('Server send error', err);
                }
            }
        } catch (err) {
            console.error('Server config check error', err);
        }

        // 2) fallback to EmailJS if enabled
        try {
            if (typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.enabled) {
                await loadEmailJSSDK();
                if (EMAILJS_CONFIG.public_key) {
                    window.emailjs.init(EMAILJS_CONFIG.public_key);
                }
                const templateParams = {
                    to_email: email,
                    to_name: email.split('@')[0],
                    code: code,
                    app_name: (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.appName) ? APP_CONFIG.appName : 'Mentor Wave'
                };
                await window.emailjs.send(EMAILJS_CONFIG.service_id, EMAILJS_CONFIG.template_id, templateParams);
                showNotification('Verification code sent to ' + email);
                return true;
            }
        } catch (err) {
            console.error('EmailJS send error:', err);
        }

        // 3) no email sent
        return false;
    };

    trySendEmail().then(sent => {
        if (!sent) {
            // fallback to demo mode
            showNotification('Verification code prepared (demo). Use Show Demo Code.');
        }

        // Redirect to verification page with email and role
        setTimeout(() => {
            window.location.href = `verification.html?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`;
        }, 700);
    });
}

/**
 * Dynamically load EmailJS SDK if not already present
 */
function loadEmailJSSDK() {
    return new Promise((resolve, reject) => {
        if (window.emailjs) return resolve();
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
    });
}

/**
 * Handle verification form submission
 */
function handleVerificationSubmit(event) {
    event.preventDefault();
    const email = getQueryParam('email');
    const role = getQueryParam('role');
    const input = document.getElementById('verificationCode');
    const messageDiv = document.getElementById('verificationMessage');

    if (!email || !input) return;

    const code = input.value.trim();
    const verifications = getFromStorage('verifications') || {};
    const record = verifications[email];

    if (!record) {
        messageDiv.textContent = 'No verification request found. Please login again.';
        messageDiv.style.color = '#ef4444';
        return;
    }

    if (Date.now() > record.expiresAt) {
        messageDiv.textContent = 'Code expired. Please resend a new code.';
        messageDiv.style.color = '#ef4444';
        return;
    }

    if (code !== record.code) {
        messageDiv.textContent = 'Invalid code. Please try again.';
        messageDiv.style.color = '#ef4444';
        return;
    }

    // Verified: set current user from pendingUser and cleanup
    const pendingUser = getFromStorage('pendingUser');
    if (pendingUser && pendingUser.email === email) {
        saveToStorage('currentUser', pendingUser);
        localStorage.removeItem('pendingUser');
    } else {
        // Fallback: create basic user
        saveToStorage('currentUser', { email, role, name: email.split('@')[0] });
    }

    // Remove verification record
    delete verifications[email];
    saveToStorage('verifications', verifications);

    showNotification('Email verified! Redirecting to dashboard...');
    setTimeout(() => {
        if (role === 'tutor') {
            window.location.href = 'tutor/dashboard.html';
        } else if (role === 'guardian') {
            window.location.href = 'guardian/dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 900);
}

/**
 * Resend verification code for given email
 */
function resendVerificationCode(email) {
    const code = generateVerificationCode();
    const verifications = getFromStorage('verifications') || {};
    verifications[email] = { code, expiresAt: Date.now() + 5 * 60 * 1000 };
    saveToStorage('verifications', verifications);
    saveToStorage('lastSentCode', { email, code });
    showNotification('A new verification code was sent to ' + email);
}

/**
 * Initialize verification page behaviour
 */
function initializeVerificationPage() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'verification.html') return;

    const email = getQueryParam('email');
    const role = getQueryParam('role');
    const emailSpan = document.getElementById('verifyEmail');
    const form = document.getElementById('verifyForm');
    const resendBtn = document.getElementById('resendBtn');
    const devShowBtn = document.getElementById('devShowCode');

    if (emailSpan) emailSpan.textContent = email || '';
    if (form) form.addEventListener('submit', handleVerificationSubmit);
    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            if (!email) return;
            resendVerificationCode(email);
        });
    }

    if (devShowBtn) {
        devShowBtn.addEventListener('click', () => {
            const last = getFromStorage('lastSentCode');
            if (last && last.email === email) {
                alert('Demo code: ' + last.code);
            } else {
                alert('No code found for this email in storage.');
            }
        });
    }
}

/**
 * Handle registration form submission
 */
function handleTutorRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const errorDiv = document.getElementById('tutorRegisterError');

    // Validate CUET email
    if (!isValidCUETEmail(email)) {
        errorDiv.textContent = 'Email must be a valid @student.cuet.ac.bd address';
        errorDiv.style.display = 'block';
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }

    // Save user data
    const user = {
        email: email,
        name: name,
        role: 'tutor',
        password: password
    };

    saveToStorage('pendingUser', user);
    showNotification('Registration successful! Please verify your email.');
    
    // Start verification flow
    startVerification(email, 'tutor');
}

function handleGuardianRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const errorDiv = document.getElementById('guardianRegisterError');

    // Validate password match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }

    // Save user data
    const user = {
        email: email,
        name: name,
        role: 'guardian',
        password: password
    };

    saveToStorage('pendingUser', user);
    showNotification('Registration successful! Please verify your email.');
    
    // Start verification flow
    startVerification(email, 'guardian');
}

/**
 * Handle logout
 */
function handleLogout(event) {
    event.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        showNotification('Logged out successfully');
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    }
}

// ==================== REGISTRATION PAGE ====================
/**
 * Handle role tab switching
 */
function initializeRegistrationTabs() {
    const roleTabs = document.querySelectorAll('.role-tab');
    const tutorForm = document.getElementById('tutorRegisterForm');
    const guardianForm = document.getElementById('guardianRegisterForm');
    const tutorInfo = document.getElementById('tutorInfo');
    const guardianInfo = document.getElementById('guardianInfo');

    if (!roleTabs.length) return;

    // Check URL parameter for role
    const roleParam = getQueryParam('role');
    if (roleParam === 'guardian') {
        switchToGuardianTab();
    }

    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const role = tab.dataset.role;
            
            // Update active tab
            roleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show appropriate form
            if (role === 'tutor') {
                tutorForm.style.display = 'block';
                guardianForm.style.display = 'none';
                tutorInfo.style.display = 'block';
                guardianInfo.style.display = 'none';
            } else {
                tutorForm.style.display = 'none';
                guardianForm.style.display = 'block';
                tutorInfo.style.display = 'none';
                guardianInfo.style.display = 'block';
            }
        });
    });

    function switchToGuardianTab() {
        roleTabs.forEach(t => t.classList.remove('active'));
        roleTabs[1].classList.add('active');
        tutorForm.style.display = 'none';
        guardianForm.style.display = 'block';
        tutorInfo.style.display = 'none';
        guardianInfo.style.display = 'block';
    }
}

// ==================== DASHBOARD ====================
/**
 * Initialize dashboard
 */
function initializeDashboard() {
    const user = getFromStorage('currentUser');
    
    if (!user) {
        // Determine if we're in a nested folder (tutor/guardian/admin)
        const isNested = window.location.pathname.includes('/tutor/') || 
                        window.location.pathname.includes('/guardian/') || 
                        window.location.pathname.includes('/admin/');
        const loginPath = isNested ? '../login.html' : 'login.html';
        window.location.href = loginPath;
        return;
    }

    // Update user info in sidebar
    const userNameElements = document.querySelectorAll('#userName, #welcomeName');
    userNameElements.forEach(el => {
        if (el) el.textContent = user.name;
    });

    // Initialize logout button
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
}

// ==================== MOBILE NAVIGATION ====================
/**
 * Initialize mobile menu
 */
function initializeMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const menuToggle = document.getElementById('menuToggle');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Home page mobile menu
    if (menuToggle) {
        const navMenu = document.querySelector('.nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Initialize notifications button behavior
 */
function initializeNotifications() {
    const btn = document.getElementById('notificationsBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        // Navigate to messages page for now
        const isNested = window.location.pathname.includes('/tutor/') || window.location.pathname.includes('/guardian/') || window.location.pathname.includes('/admin/');
        const prefix = isNested ? '../' : '';
        window.location.href = prefix + 'messages.html';
    });
}

// ==================== TUITION FILTERING ====================
/**
 * Filter tuition posts
 */
function filterTuitions() {
    const classFilter = document.getElementById('classFilter')?.value;
    const subjectFilter = document.getElementById('subjectFilter')?.value;
    const locationFilter = document.getElementById('locationFilter')?.value.toLowerCase();
    const minSalary = parseInt(document.getElementById('minSalary')?.value || 0);
    const maxSalary = parseInt(document.getElementById('maxSalary')?.value || 999999);
    const genderFilter = document.getElementById('genderFilter')?.value;
    const daysFilter = document.getElementById('daysFilter')?.value;

    const tuitionCards = document.querySelectorAll('.tuition-card');
    let visibleCount = 0;

    tuitionCards.forEach(card => {
        const cardClass = card.dataset.class;
        const cardSubject = card.dataset.subject;
        const cardSalary = parseInt(card.dataset.salary);
        const cardLocation = card.querySelector('.detail-item:nth-child(2) span:last-child')?.textContent.toLowerCase();

        let visible = true;

        if (classFilter && cardClass !== classFilter) visible = false;
        if (subjectFilter && cardSubject !== subjectFilter) visible = false;
        if (locationFilter && !cardLocation?.includes(locationFilter)) visible = false;
        if (cardSalary < minSalary || cardSalary > maxSalary) visible = false;

        card.style.display = visible ? 'block' : 'none';
        if (visible) visibleCount++;
    });

    // Update result count
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = visibleCount;
    }
}

/**
 * Initialize filter form
 */
function initializeFilters() {
    const filterForm = document.getElementById('filterForm');
    const clearFilters = document.getElementById('clearFilters');

    if (filterForm) {
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterTuitions();
        });

        // Real-time filtering on input change
        const filterInputs = filterForm.querySelectorAll('select, input');
        filterInputs.forEach(input => {
            input.addEventListener('change', filterTuitions);
        });
    }

    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            filterForm.reset();
            filterTuitions();
        });
    }
}

/**
 * Handle "Show Interest" button clicks
 */
function initializeInterestedButtons() {
    const interestedButtons = document.querySelectorAll('.interested-btn');

    interestedButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tuitionId = this.dataset.id;
            
            // Disable button and change text
            this.disabled = true;
            this.textContent = 'Interest Sent ✓';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');

            showNotification('Your interest has been sent to the guardian!');
        });
    });
}

// ==================== PROFILE MANAGEMENT ====================
/**
 * Initialize profile edit modal
 */
function initializeProfileEdit() {
    const editBtn = document.getElementById('editProfileBtn');
    const modal = document.getElementById('editProfileModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelEdit');
    const editForm = document.getElementById('editProfileForm');

    const editName = document.getElementById('editName');
    const editPhone = document.getElementById('editPhone');
    const editDept = document.getElementById('editDept');
    const editStudentId = document.getElementById('editStudentId');
    const editGender = document.getElementById('editGender');
    const editYear = document.getElementById('editYear');
    const editCgpa = document.getElementById('editCgpa');
    const editSSC = document.getElementById('editSSC');
    const editHSC = document.getElementById('editHSC');
    const editSubjects = document.getElementById('editSubjects');
    const editSalary = document.getElementById('editSalary');
    const editAreas = document.getElementById('editAreas');

    function openModalAndPrefill() {
        const user = getFromStorage('currentUser') || {};
        if (editName) editName.value = user.name || '';
        if (editPhone) editPhone.value = user.phone || '';
        if (editDept) editDept.value = user.department || user.dept || '';
        if (editStudentId) editStudentId.value = user.studentId || user.studentId || '';
        if (editGender) editGender.value = user.gender || '';
        if (editYear) editYear.value = user.year || '';
        if (editCgpa) editCgpa.value = user.cgpa || '';
        if (editSSC) editSSC.value = user.ssc || '';
        if (editHSC) editHSC.value = user.hsc || '';
        if (editSubjects) editSubjects.value = (user.subjects || []).join(', ');
        if (editSalary) editSalary.value = user.salary || '';
        if (editAreas) editAreas.value = user.areas || '';
        if (modal) modal.style.display = 'flex';
    }

    if (editBtn && modal) {
        editBtn.addEventListener('click', () => {
            openModalAndPrefill();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = getFromStorage('currentUser') || {};

            user.name = editName ? editName.value.trim() : user.name;
            user.phone = editPhone ? editPhone.value.trim() : user.phone;
            user.department = editDept ? editDept.value.trim() : user.department;
            user.studentId = editStudentId ? editStudentId.value.trim() : user.studentId;
            user.gender = editGender ? editGender.value : user.gender;
            user.year = editYear ? editYear.value.trim() : user.year;
            user.cgpa = editCgpa ? editCgpa.value.trim() : user.cgpa;
            user.ssc = editSSC ? editSSC.value.trim() : user.ssc;
            user.hsc = editHSC ? editHSC.value.trim() : user.hsc;
            user.subjects = editSubjects ? editSubjects.value.split(',').map(s => s.trim()).filter(Boolean) : user.subjects;
            user.salary = editSalary ? editSalary.value.trim() : user.salary;
            user.areas = editAreas ? editAreas.value.trim() : user.areas;

            saveToStorage('currentUser', user);
            populateProfileFromCurrentUser();
            showNotification('Profile updated successfully!');
            if (modal) modal.style.display = 'none';
        });
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

/**
 * Populate profile page fields from saved currentUser (localStorage)
 */
function populateProfileFromCurrentUser() {
    const user = getFromStorage('currentUser');
    if (!user) return;

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value || '';
    };

    setText('profileName', user.name || user.email || '');
    setText('profileEmail', user.email || '');
    setText('profilePhone', user.phone || '');
    setText('profileDept', user.department || user.dept || '');
    setText('profileDeptSmall', user.department || user.dept || '');
    setText('profileStudentId', user.studentId || user.studentId || '');
    setText('profileGender', user.gender || '');
    setText('profileYear', user.year || '');
    setText('profileCgpa', user.cgpa ? (user.cgpa + ' / 4.00') : '');
    setText('profileSSC', user.ssc || '');
    setText('profileHSC', user.hsc || '');
    setText('profileSalary', user.salary || '');
    setText('profileAreas', user.areas || user.areas || '');

    // Avatar initials
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        const initials = (user.name || user.email || '').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
        avatar.textContent = initials || 'U';
    }

    // Subjects list
    const subjectsEl = document.getElementById('profileSubjects');
    if (subjectsEl) {
        const subjects = user.subjects || [];
        if (subjects.length) {
            subjectsEl.innerHTML = subjects.map(s => `<span class="tag">${s}</span>`).join(' ');
        }
    }
}

// ==================== POST TUITION ====================
/**
 * Handle tuition post form submission
 */
function initializePostTuitionForm() {
    const postForm = document.getElementById('postTuitionForm');

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate at least one subject is selected
            const subjects = postForm.querySelectorAll('input[name="subjects"]:checked');
            if (subjects.length === 0) {
                showNotification('Please select at least one subject', 'error');
                return;
            }

            // Collect form data
            const formData = new FormData(postForm);
            const newPost = {
                id: Date.now(),
                title: formData.get('title'),
                class: formData.get('class'),
                subjects: Array.from(subjects).map(s => s.value),
                location: formData.get('location'),
                salary: formData.get('salary'),
                days: formData.get('days'),
                description: formData.get('description'),
                postedDate: new Date(),
                status: 'active'
            };

            // Save to localStorage
            const tuitions = getFromStorage('userTuitions') || [];
            tuitions.push(newPost);
            saveToStorage('userTuitions', tuitions);

            showNotification('Tuition posted successfully! It will be visible after review.');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }
}

// ==================== ADMIN FUNCTIONS ====================
/**
 * Initialize admin navigation links
 */
function initializeAdminNav() {
    const verificationsLink = document.getElementById('verificationsLink');
    const tutorsLink = document.getElementById('tutorsLink');
    const guardiansLink = document.getElementById('guardiansLink');

    if (verificationsLink) {
        verificationsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector('.section');
            if (section) {
                section.querySelector('.section-heading').textContent = 'Pending Tutor Verifications';
                // Show pending verifications table
                document.getElementById('pendingVerificationsList').innerHTML = `
                    <tr>
                        <td><strong>Ahmed Bin Rashid</strong><br><small>Male • 3rd Year</small></td>
                        <td>1904056</td>
                        <td>CSE</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-success approve-btn" data-id="1">✓ Approve</button>
                                <button class="btn btn-danger reject-btn" data-id="1">✕ Reject</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Saima Khatun</strong><br><small>Female • 2nd Year</small></td>
                        <td>2004082</td>
                        <td>EEE</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-success approve-btn" data-id="2">✓ Approve</button>
                                <button class="btn btn-danger reject-btn" data-id="2">✕ Reject</button>
                            </div>
                        </td>
                    </tr>
                `;
                initializeAdminVerification();
            }
        });
    }

    if (tutorsLink) {
        tutorsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector('.section');
            if (section) {
                section.querySelector('.section-heading').textContent = 'All Tutors';
                document.getElementById('pendingVerificationsList').innerHTML = `
                    <tr>
                        <td><strong>Ahmed Bin Rashid</strong><br><small>Male • 3rd Year • CSE</small></td>
                        <td>1904056</td>
                        <td>CSE</td>
                        <td><span class="badge" style="background: green;">Verified</span></td>
                    </tr>
                    <tr>
                        <td><strong>Saima Khatun</strong><br><small>Female • 2nd Year • EEE</small></td>
                        <td>2004082</td>
                        <td>EEE</td>
                        <td><span class="badge" style="background: green;">Verified</span></td>
                    </tr>
                    <tr>
                        <td><strong>Srabon Islam</strong><br><small>Male • 3rd Year • CSE</small></td>
                        <td>2204096</td>
                        <td>CSE</td>
                        <td><span class="badge" style="background: green;">Verified</span></td>
                    </tr>
                `;
            }
        });
    }

    if (guardiansLink) {
        guardiansLink.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector('.section');
            if (section) {
                section.querySelector('.section-heading').textContent = 'All Guardians';
                document.getElementById('pendingVerificationsList').innerHTML = `
                    <tr>
                        <td><strong>Mr. Rahman</strong><br><small>Parent • Chittagong</small></td>
                        <td>G001</td>
                        <td>N/A</td>
                        <td><span class="badge" style="background: blue;">Active</span></td>
                    </tr>
                    <tr>
                        <td><strong>Mrs. Hasan</strong><br><small>Parent • Chittagong</small></td>
                        <td>G002</td>
                        <td>N/A</td>
                        <td><span class="badge" style="background: blue;">Active</span></td>
                    </tr>
                    <tr>
                        <td><strong>Mr. Ahmed</strong><br><small>Parent • Chittagong</small></td>
                        <td>G003</td>
                        <td>N/A</td>
                        <td><span class="badge" style="background: blue;">Active</span></td>
                    </tr>
                `;
            }
        });
    }
}

/**
 * Initialize admin verification buttons
 */
function initializeAdminVerification() {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('viewDetailsModal');
    const closeModal = document.getElementById('closeModal');
    const modalCancel = document.getElementById('modalCancel');
    const modalApprove = document.getElementById('modalApprove');
    const modalReject = document.getElementById('modalReject');

    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorId = this.dataset.id;
            if (confirm('Approve this tutor?')) {
                // Remove the row
                this.closest('tr').remove();
                showNotification('Tutor approved successfully!');
                updatePendingCount();
            }
        });
    });

    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorId = this.dataset.id;
            if (confirm('Reject this tutor? This action cannot be undone.')) {
                // Remove the row
                this.closest('tr').remove();
                showNotification('Tutor rejected');
                updatePendingCount();
            }
        });
    });

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modalCancel) {
        modalCancel.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modalApprove) {
        modalApprove.addEventListener('click', () => {
            showNotification('Tutor approved successfully!');
            modal.style.display = 'none';
        });
    }

    if (modalReject) {
        modalReject.addEventListener('click', () => {
            if (confirm('Are you sure you want to reject this tutor?')) {
                showNotification('Tutor rejected');
                modal.style.display = 'none';
            }
        });
    }

    function updatePendingCount() {
        const tbody = document.getElementById('pendingVerificationsList');
        const count = tbody ? tbody.querySelectorAll('tr').length : 0;
        const badge = document.querySelector('.section-heading + .badge-count');
        if (badge) {
            badge.textContent = `${count} pending`;
        }
        const statCard = document.getElementById('pendingVerifications');
        if (statCard) {
            statCard.textContent = count;
        }
    }
}

/**
 * Display user's posted tuitions on guardian dashboard
 */
function displayUserTuitions() {
    const tuitions = getFromStorage('userTuitions') || [];
    const postsGrid = document.querySelector('.posts-grid');
    
    if (!postsGrid) return;

    if (tuitions.length === 0) {
        postsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No posts yet. Create your first tuition post!</p>';
        return;
    }

    postsGrid.innerHTML = tuitions.map(post => `
        <div class="post-card">
            <div class="post-header">
                <h3>${post.title}</h3>
                <span class="status-badge active">${post.status}</span>
            </div>
            <div class="post-details">
                <div class="detail-item"><span>📚 Class ${post.class} • ${post.subjects.join(', ')}</span></div>
                <div class="detail-item"><span>📍 ${post.location}</span></div>
                <div class="detail-item"><span>💰 ৳${post.salary}/month</span></div>
            </div>
            <div class="post-footer" style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
                <small>${formatRelativeTime(new Date(post.postedDate))}</small>
                <div class="post-actions">
                    <button class="btn btn-primary btn-sm view-interested-btn" data-id="${post.id}">Interested (0)</button>
                </div>
            </div>
        </div>
    `).join('');

    // Reattach event listeners
    initializeViewInterestedButtons();
}

/**
 * Initialize guardian dashboard
 */
function initializeGuardianDashboard() {
    displayUserTuitions();
    initializeViewInterestedButtons();
}

/**
 * Initialize "View Interested" buttons on guardian dashboard
 */
function initializeViewInterestedButtons() {
    const viewButtons = document.querySelectorAll('.view-interested-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.id;
            
            // Create a modal to show interested tutors
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:2000;';
            
            const content = document.createElement('div');
            content.style.cssText = 'background:white;padding:30px;border-radius:10px;width:500px;max-height:600px;overflow-y:auto;';
            
            // Sample interested tutors
            const interestedTutors = [
                { name: 'Ahmed Rashid', dept: 'CSE', year: '3rd Year', email: 'ahmed.rashid@student.cuet.ac.bd' },
                { name: 'Saima Khatun', dept: 'EEE', year: '2nd Year', email: 'saima.khatun@student.cuet.ac.bd' }
            ];
            
            content.innerHTML = `
                <h2 style="margin-bottom:20px;">Interested Tutors</h2>
                ${interestedTutors.map(t => `
                    <div style="padding:15px;border:1px solid #eee;border-radius:6px;margin-bottom:10px;">
                        <h4>${t.name}</h4>
                        <p style="color:#666;font-size:13px;margin:5px 0;">${t.dept} • ${t.year}</p>
                        <p style="color:#666;font-size:13px;margin:5px 0;">${t.email}</p>
                        <button class="btn btn-primary btn-sm" style="margin-top:10px;">View Full Profile</button>
                    </div>
                `).join('')}
                <button class="btn btn-secondary btn-sm" onclick="this.closest('div').parentElement.remove()" style="margin-top:20px;width:100%;">Close</button>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        });
    });
}

// ==================== LOGIN PAGE EMAIL HINT ====================
/**
 * Show email hint based on role selection
 */
function initializeLoginEmailHint() {
    const roleSelect = document.getElementById('role');
    const emailHint = document.getElementById('emailHint');

    if (roleSelect && emailHint) {
        roleSelect.addEventListener('change', function() {
            if (this.value === 'tutor') {
                emailHint.textContent = 'Use your @student.cuet.ac.bd email';
                emailHint.style.color = '#3b82f6';
            } else {
                emailHint.textContent = '';
            }
        });
    }
}

// ==================== SORTING ====================
/**
 * Initialize sorting for tuition list
 */
function initializeSorting() {
    const sortSelect = document.getElementById('sortBy');

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const cardsContainer = document.getElementById('tuitionCards');
            const cards = Array.from(cardsContainer.querySelectorAll('.tuition-card'));

            cards.sort((a, b) => {
                const salaryA = parseInt(a.dataset.salary);
                const salaryB = parseInt(b.dataset.salary);

                switch (this.value) {
                    case 'salary-high':
                        return salaryB - salaryA;
                    case 'salary-low':
                        return salaryA - salaryB;
                    case 'newest':
                    default:
                        return 0; // Keep original order
                }
            });

            // Re-append sorted cards
            cards.forEach(card => cardsContainer.appendChild(card));
        });
    }
}

// ==================== MESSAGING HELPERS ====================
/**
 * Initialize links/buttons that should open the messages page
 */
function initializeMessagingLinks() {
    // Ensure sidebar/nav links point to the correct relative path
    const messagesLink = document.getElementById('messagesLink');
    const isNested = window.location.pathname.includes('/tutor/') || window.location.pathname.includes('/guardian/') || window.location.pathname.includes('/admin/');
    const prefix = isNested ? '../' : '';
    if (messagesLink) {
        messagesLink.setAttribute('href', prefix + 'messages.html');
    }

    // Redirect message buttons (e.g., guardian table) to messages page with name context
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name || btn.closest('tr')?.querySelector('strong')?.textContent || 'Conversation';
            window.location.href = prefix + 'messages.html?with=' + encodeURIComponent(name.trim());
        });
    });

    // Ensure quick-action message cards link to messages page
    document.querySelectorAll('.action-card').forEach(a => {
        const h = a.querySelector('h3');
        if (h && /message/i.test(h.textContent)) {
            a.setAttribute('href', prefix + 'messages.html');
        }
    });
}

/**
 * Initialize messages page when opened directly with optional `with` query param
 */
function initializeMessagesPage() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'messages.html') return;

    const withParam = getQueryParam('with');
    const headerNameEl = document.querySelector('.chat-header h3');
    const avatarEl = document.querySelector('.chat-header .user-avatar-sm');
    const chatMessages = document.getElementById('chatMessages');

    const name = withParam ? decodeURIComponent(withParam) : 'Ahmed Rashid';
    if (headerNameEl) headerNameEl.textContent = name;
    if (avatarEl) {
        const initials = name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
        avatarEl.textContent = initials;
    }

    // Populate a small example conversation
    if (chatMessages) {
        chatMessages.innerHTML = '';
        const now = new Date();
        const samples = [
            {type: 'received', text: `Hello! I saw your tuition post and I'm interested. I'm a 3rd year student at CUET.`, time: formatRelativeTime(new Date(now - 2*60*1000))},
            {type: 'sent', text: `Hi ${name.split(' ')[0]}! Thanks for reaching out. Can you share your experience?`, time: formatRelativeTime(new Date(now - 1*60*1000))},
            {type: 'received', text: `Sure — I've been tutoring for 2 years and focus on problem solving.`, time: formatRelativeTime(new Date(now - 30*1000))},
        ];

        samples.forEach(s => {
            const div = document.createElement('div');
            div.className = `message message-${s.type}`;
            div.innerHTML = `
                <div class="message-text">${s.text}</div>
                <div class="message-time">${s.time}</div>
            `;
            chatMessages.appendChild(div);
        });

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Set Back to Dashboard link behavior
    const backLink = document.getElementById('backDashboardLink');
    if (backLink) {
        const user = getFromStorage('currentUser');
        if (!user) {
            // If not logged in, go to login
            backLink.setAttribute('href', 'login.html');
        } else {
            // Redirect to role-based dashboard
            if (user.role === 'tutor') backLink.setAttribute('href', 'tutor/dashboard.html');
            else if (user.role === 'guardian') backLink.setAttribute('href', 'guardian/dashboard.html');
            else if (user.role === 'admin') backLink.setAttribute('href', 'admin/dashboard.html');
            else backLink.setAttribute('href', 'index.html');
        }
    }
}

// ==================== INITIALIZATION ====================
/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mentor Wave CUET - Application Initialized');

    // Initialize mobile navigation
    initializeMobileMenu();
    // Initialize notifications button
    initializeNotifications();

    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();

    // Login page
    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        initializeLoginEmailHint();
    }

    // Initialize password visibility toggles on all pages
    initializePasswordToggles();

    // Registration page
    if (currentPage === 'register.html') {
        initializeRegistrationTabs();
        
        const tutorForm = document.getElementById('tutorRegisterForm');
        const guardianForm = document.getElementById('guardianRegisterForm');
        
        if (tutorForm) {
            tutorForm.addEventListener('submit', handleTutorRegistration);
        }
        
        if (guardianForm) {
            guardianForm.addEventListener('submit', handleGuardianRegistration);
        }
    }

    // Dashboard pages (all roles)
    if (currentPage.includes('dashboard.html')) {
        initializeDashboard();
    }

    // Tutor browse page
    if (currentPage === 'browse.html') {
        initializeDashboard();
        initializeFilters();
        initializeInterestedButtons();
        initializeSorting();
    }

    // Tutor profile page
    if (currentPage === 'profile.html') {
        initializeDashboard();
        initializeProfileEdit();
        populateProfileFromCurrentUser();
    }

    // Guardian post tuition page
    if (currentPage === 'post_tuition.html') {
        initializeDashboard();
        initializePostTuitionForm();
    }

    // Guardian dashboard
    if (currentPage === 'dashboard.html' && window.location.pathname.includes('guardian')) {
        initializeDashboard();
        initializeGuardianDashboard();
    }

    // Admin dashboard
    if (currentPage === 'dashboard.html' && window.location.pathname.includes('admin')) {
        initializeAdminNav();
        initializeAdminVerification();
    }

    // Initialize messaging link handlers and messages page (if present)
    initializeMessagingLinks();
    if (currentPage === 'messages.html') {
        initializeMessagesPage();
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

/**
 * Initialize password show/hide toggle buttons
 */
function initializePasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;

        btn.addEventListener('click', () => {
            const isPassword = input.getAttribute('type') === 'password';
            if (isPassword) {
                input.setAttribute('type', 'text');
                btn.setAttribute('aria-label', 'Hide password');
                // swap icon to eye-off
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19.5c-5 0-9.27-3.11-11-7.5a20.88 20.88 0 0 1 4.13-6.02" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 1l22 22" stroke="#374151" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
            } else {
                input.setAttribute('type', 'password');
                btn.setAttribute('aria-label', 'Show password');
                // swap back to eye icon
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5z" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
            }
        });
    });
}

// ==================== ANIMATIONS ====================
// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== EXPORT FOR TESTING ====================
// Export functions if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidCUETEmail,
        formatRelativeTime,
        showNotification
    };
}
