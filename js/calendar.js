// ─── Calendar Page Logic ──────────────────────────────────────────────────────
(function () {
  const { PodData } = window;
  const MAX_SLOTS = PodData.TIME_SLOTS.length; // 12 slots per day

  let currentYear  = new Date().getFullYear();
  let currentMonth = new Date().getMonth(); // 0-indexed

  // ── Render Calendar ────────────────────────────────────────────────────────
  async function renderCalendar() {
    const monthLabel = document.getElementById('calMonthLabel');
    const calDays    = document.getElementById('calDays');
    const todayStr   = new Date().toISOString().split('T')[0];

    const monthName = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    monthLabel.textContent = monthName;
    
    const allBookings = await PodData.getBookings();

    calDays.innerHTML = '';

    // Weekday headers
    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    weekdays.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-weekday';
      el.textContent = d;
      calDays.appendChild(el);
    });

    const firstDay  = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMon = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day empty';
      calDays.appendChild(cell);
    }

    // Day cells
    for (let day = 1; day <= daysInMon; day++) {
      const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const bookings = allBookings.filter(b => b.date === dateStr);
      const booked   = bookings.length;

      let statusClass = '';
      if (booked > 0 && booked >= MAX_SLOTS) statusClass = 'full';
      else if (booked > 0)                   statusClass = 'partial';
      else                                   statusClass = 'available';

      const isPast   = dateStr < todayStr;
      const isToday  = dateStr === todayStr;

      const cell = document.createElement('div');
      cell.className = `cal-day ${statusClass} ${isPast ? 'past':''} ${isToday ? 'today':''}`;
      cell.dataset.date = dateStr;
      cell.innerHTML = `
        <div class="cal-day-num-wrap">
          <span class="cal-day-num">${day}</span>
          ${booked > 0 ? `<span class="cal-dot"></span>` : ''}
        </div>
      `;

      if (!isPast) {
        cell.addEventListener('click', () => selectDay(dateStr, cell));
      }

      calDays.appendChild(cell);
    }
  }

  // ── Select Day ─────────────────────────────────────────────────────────────
  async function selectDay(dateStr, clickedCell) {
    document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
    clickedCell.classList.add('selected');

    const d = new Date(dateStr + 'T12:00:00');
    const label = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
    document.getElementById('panelTitle').textContent = label;

    const bookings = await PodData.getBookingsForDate(dateStr);
    const panelBookings = document.getElementById('panelBookings');
    const panelEmpty    = document.getElementById('panelEmpty');
    panelBookings.innerHTML = '';

    if (bookings.length === 0) {
      panelEmpty.style.display = 'block';
      panelEmpty.textContent = 'No bookings on this day. All slots available!';
      return;
    }

    panelEmpty.style.display = 'none';
    // Sort by time
    bookings.sort((a,b) => {
      const toMin = t => {
        const [tp, mer] = t.split(' ');
        let [h,m] = tp.split(':').map(Number);
        if (mer==='PM'&&h!==12) h+=12;
        if (mer==='AM'&&h===12) h=0;
        return h*60+m;
      };
      return toMin(a.time) - toMin(b.time);
    });

    bookings.forEach(b => {
      const div = document.createElement('div');
      div.className = `cal-booking-item status-${b.status.toLowerCase()} fade-in`;
      div.innerHTML = `
        <div class="cal-slot-label">${b.time}</div>
        <div class="cal-booking-name">${escHtml(b.name)}</div>
        <div class="cal-booking-podcast"><i data-lucide="mic" style="width:14px;height:14px;margin-right:4px;"></i> ${escHtml(b.podcastTitle)}</div>
        <div style="margin-top:6px;"><span class="badge badge-${b.status.toLowerCase()}">${b.status}</span></div>
      `;
      panelBookings.appendChild(div);
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  // ── Mobile Sidebar ─────────────────────────────────────────────────────────
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  PodData.initData();
  renderCalendar();
})();
