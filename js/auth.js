// ─── Authentication & Route Guard ─────────────────────────────────────────────
(function() {
    const AUTH_KEY = 'kecpodschedule_auth';

    // Current Session State
    const session = JSON.parse(localStorage.getItem(AUTH_KEY)) || null;

    // Determine current page (Handle Vercel's extension-less URLs)
    const currentPath = window.location.pathname.toLowerCase();
    const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('/login') || currentPath === '/login';
    const isAdminRoute = currentPath.includes('admin') || 
                         currentPath.includes('calendar') || 
                         currentPath.includes('workflow');
    
    // Public API
    window.PodAuth = {
        login: function(email, password) {
            let role = 'client';
            if (email.trim().toLowerCase().includes('admin')) {
                role = 'admin';
            }
            const newSession = { email, role, loggedInAt: Date.now() };
            localStorage.setItem(AUTH_KEY, JSON.stringify(newSession));
            
            if (role === 'admin') {
                window.location.replace('admin.html');
            } else {
                window.location.replace('index.html');
            }
        },

        logout: function() {
            localStorage.removeItem(AUTH_KEY);
            window.location.replace('login.html');
        },

        getSession: function() {
            return JSON.parse(localStorage.getItem(AUTH_KEY));
        }
    };

    // Auth Guard Logic
    if (!session && !isLoginPage) {
        window.location.replace('login.html');
        return; 
    }

    if (session && session.role !== 'admin' && isAdminRoute) {
        window.location.replace('index.html');
        return;
    }

    // Auto-update UI if session exists (Hiding admin links for clients)
    document.addEventListener('DOMContentLoaded', () => {
        const currentUser = window.PodAuth.getSession();
        
        // Auto-fill user details
        if (currentUser) {
            document.querySelectorAll('.user-name').forEach(el => {
                el.textContent = currentUser.email;
            });
            document.querySelectorAll('.user-avatar').forEach(el => {
                el.textContent = currentUser.email.substring(0, 2).toUpperCase();
            });
        }
        
        // Hide Admin Links for Clients
        if (currentUser && currentUser.role !== 'admin') {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'none';
            });
        }
        
        // Setup Logout Buttons
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.PodAuth.logout();
            });
        });
    });

})();
