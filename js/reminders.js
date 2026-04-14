// ─── Reminder Logic ──────────────────────────────────────────────────────────
(async function() {
  const { PodData } = window;
  const bookingSelect = document.getElementById('bookingSelect');
  const previewSection = document.getElementById('previewSection');
  const previewTo = document.getElementById('previewTo');
  const previewSubject = document.getElementById('previewSubject');
  const previewBody = document.getElementById('previewBody');
  const sendReminderBtn = document.getElementById('sendReminderBtn');

  // Hardcoded constant venue provided by user
  const VENUE = "KNUST library mall, elearning floor, first floor";

  // Fetch upcoming bookings
  let upcomingBookings = [];
  try {
    const allBookings = await PodData.getBookings();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Filter to only booked sessions that happen today or in the future
    upcomingBookings = allBookings.filter(b => b.status === 'Booked' && b.date >= todayStr);
    
    // Sort chronologically by date
    upcomingBookings.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    
  } catch (err) {
    console.error("Failed to load bookings", err);
  }

  // Populate Dropdown
  if (upcomingBookings.length === 0) {
    bookingSelect.innerHTML = '<option value="">No upcoming sessions available</option>';
    bookingSelect.disabled = true;
  } else {
    bookingSelect.innerHTML = '<option value="">-- Choose a booking to remind --</option>';
    upcomingBookings.forEach(booking => {
      // Create user-friendly date for dropdown
      const rawDate = new Date(booking.date + 'T12:00:00');
      const formattedDate = rawDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const option = document.createElement('option');
      option.value = booking.id;
      option.textContent = `${formattedDate} at ${booking.time} - ${booking.name} (${booking.podcastTitle})`;
      bookingSelect.appendChild(option);
    });
  }

  // Handle Selection Change
  bookingSelect.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      previewSection.style.display = 'none';
      return;
    }

    const booking = upcomingBookings.find(b => b.id === selectedId);
    if (!booking) return;

    // Helper for formatting date
    const d = new Date(booking.date + 'T12:00:00');
    const niceDate = d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Build template components
    const subject = `Reminder: Upcoming Podcast Session - ${booking.podcastTitle}`;
    
    const body = `Hello ${booking.name},\n\nThis is a quick reminder about your upcoming podcast recording session with Kecpodschedule Studio.\n\nHere are the details for your session:\n• Podcast Title: ${booking.podcastTitle}\n• Date: ${niceDate}\n• Time: ${booking.time}\n• Venue: ${VENUE}\n\nPlease arrive 10 minutes early so we can test the audio levels. We look forward to creating with you!\n\nBest regards,\nKecpodschedule Admin\nStudio Team`;

    // Populate UI preview
    previewTo.textContent = booking.email;
    previewSubject.textContent = subject;
    previewBody.textContent = body;

    // Build Gmail compose URL (opens Gmail in browser with fields pre-filled)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(booking.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    sendReminderBtn.href = gmailUrl;

    // Show preview section
    previewSection.style.display = 'block';
  });

})();
