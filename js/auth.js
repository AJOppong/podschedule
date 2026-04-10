// ─── Authentication & Route Guard ─────────────────────────────────────────────
(function() {
    const AUTH_KEY = 'podschedule_auth';

    // Current Session State
    const session = JSON.parse(localStorage.getItem(AUTH_KEY)) || null;

    // Determine current page
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.endsWith('login.html');
    const isAdminRoute = currentPath.endsWith('admin.html') || 
                         currentPath.endsWith('calendar.html') || 
                         currentPath.endsWith('workflow.html');
    
    // Public API
    window.PodAuth = {
        login: function(email, password) {
            let role = 'client';
            if (email.toLowerCase() === 'admin@podschedule.com') {
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

    if (session && isLoginPage) {
        if (session.role === 'admin') {
            window.location.replace('admin.html');
        } else {
            window.location.replace('index.html');
        }
        return;
    }

    if (session && session.role !== 'admin' && isAdminRoute) {
        window.location.replace('index.html');
        return;
    }

    // Auto-update UI if session exists (Hiding admin links for clients)
    document.addEventListener('DOMContentLoaded', () => {
        const currentUser = window.PodAuth.getSession();
        
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
