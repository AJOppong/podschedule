/* ─── PodSchedule Theme Toggle ─────────────────────────────────────────── */
(function () {
  const STORAGE_KEY = 'kecpodschedule-theme-v2';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }

  function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply immediately (before paint) to avoid flash
  applyTheme(getTheme());

  window.addEventListener('DOMContentLoaded', function () {
    applyTheme(getTheme());
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.addEventListener('click', toggleTheme);
    
    // Globally initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
  });
})();
