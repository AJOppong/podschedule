// ─── Confirmation Page Logic ──────────────────────────────────────────────────
(async function () {
  const params = new URLSearchParams(window.location.search);
  const id    = params.get('id');
  const name  = params.get('name')  || 'Guest';
  const email = params.get('email') || '';
  const title = params.get('title') || 'Your Podcast';
  const date  = params.get('date')  || '';
  const time  = params.get('time')  || '';

  // Display details
  document.getElementById('cd-name').textContent  = name;
  document.getElementById('cd-email').textContent = email;
  document.getElementById('cd-title').textContent = title;
  document.getElementById('email-highlight').textContent = email || 'your inbox';

  // Format date nicely
  if (date) {
    const d = new Date(date + 'T12:00:00');
    document.getElementById('cd-date').textContent = d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }
  document.getElementById('cd-time').textContent = time;

  // Build Google Calendar link
  if (id) {
    const booking = await window.PodData.getBookingById(id);
    if (booking) {
      const gcalUrl = window.PodData.buildGoogleCalendarUrl(booking);
      document.getElementById('gcalLink').href = gcalUrl;
    }
  } else if (date && time) {
    // Fallback: build from params
    const booking = { podcastTitle: title, name, date, time };
    const gcalUrl = window.PodData.buildGoogleCalendarUrl(booking);
    document.getElementById('gcalLink').href = gcalUrl;
  }

  // Simulate email confirmation toast
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '📬' : '❌'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => t.remove(), 300);
    }, 5000);
  }

  setTimeout(() => {
    showToast(`Confirmation email sent to ${email || 'your inbox'}!`);
  }, 800);
})();
