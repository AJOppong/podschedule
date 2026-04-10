// ─── Admin Dashboard Logic ────────────────────────────────────────────────────
(function () {
  const { PodData } = window;
  let pendingDeleteId = null;

  // ── Topbar date ────────────────────────────────────────────────────────────
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric'
  });

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '<i data-lucide="check-circle"></i>' : '❌'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  // ── Render Stats ───────────────────────────────────────────────────────────
  function renderStats() {
    const s = PodData.getStats();
    animateCount('stat-total',     s.total);
    animateCount('stat-upcoming',  s.upcoming);
    animateCount('stat-editing',   s.editing);
    animateCount('stat-published', s.published);
  }

  function animateCount(id, target) {
    const el = document.getElementById(id);
    let current = 0;
    const step = Math.ceil(target / 20);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  }

  // ── Render Table ───────────────────────────────────────────────────────────
  function getBadgeClass(status) {
    return 'badge badge-' + status.toLowerCase();
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  }

  function renderTable(bookings) {
    const tbody = document.getElementById('bookingsBody');
    const empty = document.getElementById('tableEmpty');
    tbody.innerHTML = '';

    if (bookings.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    // Sort by date descending
    bookings.sort((a,b) => new Date(b.date) - new Date(a.date));

    bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.dataset.id = b.id;
      tr.innerHTML = `
        <td>
          <div class="table-name">${escHtml(b.name)}</div>
          <div class="table-sub">${escHtml(b.email)}</div>
        </td>
        <td>${escHtml(b.podcastTitle)}</td>
        <td>${formatDate(b.date)}</td>
        <td>${escHtml(b.time)}</td>
        <td>
          <select class="status-select" data-id="${b.id}" data-status="${b.status}">
            ${PodData.STATUSES.map(s => `<option value="${s}" ${s===b.status?'selected':''}>${s}</option>`).join('')}
          </select>
        </td>
        <td>
          <div class="actions-cell">
            <button class="btn btn-danger btn-sm delete-btn" data-id="${b.id}"><i data-lucide="trash-2"></i> Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Status change handlers
    tbody.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', function() {
        const id = this.dataset.id;
        const newStatus = this.value;
        PodData.updateStatus(id, newStatus);
        this.dataset.status = newStatus;
        renderStats();
        showToast(`Status updated to "${newStatus}"`);
      });
    });

    // Delete handlers
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        pendingDeleteId = this.dataset.id;
        document.getElementById('deleteModal').classList.add('open');
      });
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Search & Filter ────────────────────────────────────────────────────────
  function getFiltered() {
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    
    const query  = searchInput ? searchInput.value.toLowerCase() : '';
    const status = filterStatus ? filterStatus.value : '';
    
    return PodData.getBookings().filter(b => {
      const matchQ = !query || b.name.toLowerCase().includes(query) || b.podcastTitle.toLowerCase().includes(query) || b.email.toLowerCase().includes(query);
      const matchS = !status || b.status === status;
      return matchQ && matchS;
    });
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', () => renderTable(getFiltered()));
  
  const filterStatus = document.getElementById('filterStatus');
  if (filterStatus) filterStatus.addEventListener('change', () => renderTable(getFiltered()));

  // ── Delete Modal ───────────────────────────────────────────────────────────
  document.getElementById('cancelDelete').addEventListener('click', () => {
    document.getElementById('deleteModal').classList.remove('open');
    pendingDeleteId = null;
  });
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (pendingDeleteId) {
      PodData.deleteBooking(pendingDeleteId);
      pendingDeleteId = null;
      document.getElementById('deleteModal').classList.remove('open');
      renderStats();
      renderTable(getFiltered());
      showToast('Booking deleted.', 'success');
    }
  });

  // ── Mobile Sidebar ─────────────────────────────────────────────────────────
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  PodData.initData();
  renderStats();
  renderTable(getFiltered());
})();
