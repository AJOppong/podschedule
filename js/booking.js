// ─── Booking Page Logic ───────────────────────────────────────────────────────
(function () {
  const { PodData } = window;
  const dateInput    = document.getElementById('dateInput');
  const checkDateBtn = document.getElementById('checkDateBtn');
  const slotSection  = document.getElementById('slotSection');
  const slotGrid     = document.getElementById('slotGrid');
  const formSection  = document.getElementById('formSection');
  const bookingForm  = document.getElementById('bookingForm');
  const submitBtn    = document.getElementById('submitBtn');

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];
  dateInput.min = todayStr;
  dateInput.value = todayStr;

  let selectedTime = null;

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '<i data-lucide="check-circle"></i>' : '<i data-lucide="x-circle"></i>'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  // ── Render Slots ───────────────────────────────────────────────────────────
  async function renderSlots(date) {
    const slots = await PodData.getSlotsForDate(date);
    slotGrid.innerHTML = '';
    slots.forEach(({ time, available }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `slot-btn ${available ? '' : 'booked'}`;
      btn.innerHTML = `<span>${time}</span><span class="slot-status">${available ? 'Available' : 'Booked'}</span>`;
      if (available) {
        btn.addEventListener('click', () => selectSlot(btn, time));
      }
      slotGrid.appendChild(btn);
    });
    slotSection.style.display = 'block';
    slotSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Select Slot ────────────────────────────────────────────────────────────
  function selectSlot(btn, time) {
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    btn.querySelector('.slot-status').textContent = 'Selected ✓';
    selectedTime = time;
    formSection.style.display = 'block';
    formSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Check Availability ─────────────────────────────────────────────────────
  checkDateBtn.addEventListener('click', async () => {
    const date = dateInput.value;
    if (!date) { showToast('Please select a date.', 'error'); return; }
    if (date < todayStr) { showToast('Cannot book a date in the past.', 'error'); return; }
    selectedTime = null;
    formSection.style.display = 'none';
    await renderSlots(date);
  });

  // Also trigger on date change
  dateInput.addEventListener('change', async () => {
    const date = dateInput.value;
    if (!date || date < todayStr) return;
    selectedTime = null;
    formSection.style.display = 'none';
    await renderSlots(date);
  });

  // Initial load
  renderSlots(todayStr);

  // ── Form Submit ────────────────────────────────────────────────────────────
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const date         = dateInput.value;
    const name         = document.getElementById('guestName').value.trim();
    const email        = document.getElementById('guestEmail').value.trim();
    const whatsapp     = document.getElementById('guestWhatsapp').value.trim();
    const department   = document.getElementById('guestDepartment').value.trim();
    const title        = document.getElementById('podTitle').value.trim();
    const description  = document.getElementById('podDescription').value.trim();
    const podType      = document.getElementById('podType').value;
    const participants = document.getElementById('podParticipants').value;

    if (!date)  { showToast('Please select a date.', 'error'); return; }
    if (!selectedTime) { showToast('Please select a time slot.', 'error'); return; }
    if (!name || !email || !whatsapp || !department || !title || !podType || !participants) {
      showToast('Please fill in all required fields.', 'error'); return;
    }

    // Double-check availability at submit time
    const isAvail = await PodData.isSlotAvailable(date, selectedTime);
    if (!isAvail) {
      showToast('This slot was just booked! Please choose another.', 'error');
      await renderSlots(date);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Booking...';

    // Save booking
    const booking = await PodData.addBooking({
      name, email, whatsapp, department,
      podcastTitle: title, description,
      podType, participants: Number(participants),
      date, time: selectedTime
    });

    // Redirect to confirmation
    setTimeout(() => {
      const params = new URLSearchParams({
        id:    booking.id,
        name:  booking.name,
        email: booking.email,
        title: booking.podcastTitle,
        date:  booking.date,
        time:  booking.time
      });
      window.location.href = `confirmation.html?${params.toString()}`;
    }, 1000);
  });
})();
