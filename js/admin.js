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
  async function renderStats() {
    const s = await PodData.getStats();
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
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td>
          <div class="table-name">${escHtml(b.name)}</div>
          <div class="table-sub">${escHtml(b.email)}</div>
          ${b.whatsapp ? `<div class="table-sub" style="color:var(--accent-light);"><i data-lucide="message-circle" style="width:12px;height:12px;vertical-align:middle;"></i> ${escHtml(b.whatsapp)}</div>` : ''}
        </td>
        <td>
          <div>${escHtml(b.podcastTitle)}</div>
          ${b.department ? `<div class="table-sub">${escHtml(b.department)}</div>` : ''}
        </td>
        <td>${formatDate(b.date)}</td>
        <td>${escHtml(b.time)}</td>
        <td>
          <select class="status-select" data-id="${b.id}" data-status="${b.status}">
            ${PodData.STATUSES.map(s => `<option value="${s}" ${s===b.status?'selected':''}>${s}</option>`).join('')}
          </select>
        </td>
        <td>
          <div class="actions-cell">
            <button class="btn btn-ghost btn-sm expand-btn" data-id="${b.id}"><i data-lucide="chevron-down" style="width:16px;height:16px"></i></button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${b.id}"><i data-lucide="trash-2"></i> Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);

      // Detail expand row
      const detailRow = document.createElement('tr');
      detailRow.className = 'detail-row';
      detailRow.style.display = 'none';
      detailRow.innerHTML = `
        <td colspan="6" style="padding:0;">
          <div style="background:var(--bg-elevated); padding:16px 24px; border-top:1px solid var(--border); display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:12px; font-size:0.88rem;">
            <div><span class="text-muted">Type:</span>&nbsp;<strong>${escHtml(b.podType || '—')}</strong></div>
            <div><span class="text-muted">Participants:</span>&nbsp;<strong>${escHtml(String(b.participants || '—'))}</strong></div>
            <div><span class="text-muted">WhatsApp:</span>&nbsp;<strong>${escHtml(b.whatsapp || '—')}</strong></div>
            <div><span class="text-muted">Department / Office:</span>&nbsp;<strong>${escHtml(b.department || '—')}</strong></div>
            <div style="grid-column:1/-1;"><span class="text-muted">Description:</span>&nbsp;${escHtml(b.description || '—')}</div>
          </div>
        </td>
      `;
      tbody.appendChild(detailRow);
    });

    // Expand row toggle
    tbody.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.dataset.id;
        const rows = tbody.querySelectorAll('.detail-row');
        const parentTr = this.closest('tr');
        const detailTr = parentTr.nextElementSibling;
        const isOpen = detailTr.style.display !== 'none';
        // Close all others
        rows.forEach(r => r.style.display = 'none');
        tbody.querySelectorAll('.expand-btn i').forEach(i => i.setAttribute('data-lucide','chevron-down'));
        lucide.createIcons();
        if (!isOpen) {
          detailTr.style.display = '';
          this.querySelector('i').setAttribute('data-lucide','chevron-up');
          lucide.createIcons();
        }
      });
    });

    // Status change handlers
    tbody.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', async function() {
        const id = this.dataset.id;
        const newStatus = this.value;
        this.disabled = true;
        await PodData.updateStatus(id, newStatus);
        this.disabled = false;
        this.dataset.status = newStatus;
        await renderStats();
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

    lucide.createIcons();
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Search & Filter ────────────────────────────────────────────────────────
  async function getFiltered() {
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    
    const query  = searchInput ? searchInput.value.toLowerCase() : '';
    const status = filterStatus ? filterStatus.value : '';
    
    const bookings = await PodData.getBookings();
    return bookings.filter(b => {
      const matchQ = !query || b.name.toLowerCase().includes(query) || b.podcastTitle.toLowerCase().includes(query) || b.email.toLowerCase().includes(query);
      const matchS = !status || b.status === status;
      return matchQ && matchS;
    });
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', async () => renderTable(await getFiltered()));
  
  const filterStatus = document.getElementById('filterStatus');
  if (filterStatus) filterStatus.addEventListener('change', async () => renderTable(await getFiltered()));

  // ── Delete Modal ───────────────────────────────────────────────────────────
  document.getElementById('cancelDelete').addEventListener('click', () => {
    document.getElementById('deleteModal').classList.remove('open');
    pendingDeleteId = null;
  });
  document.getElementById('confirmDelete').addEventListener('click', async () => {
    if (pendingDeleteId) {
      document.getElementById('confirmDelete').disabled = true;
      await PodData.deleteBooking(pendingDeleteId);
      pendingDeleteId = null;
      document.getElementById('deleteModal').classList.remove('open');
      document.getElementById('confirmDelete').disabled = false;
      await renderStats();
      renderTable(await getFiltered());
      showToast('Booking deleted.', 'success');
    }
  });

  // ── Mobile Sidebar ─────────────────────────────────────────────────────────
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  async function init() {
    PodData.initData();
    await renderStats();
    renderTable(await getFiltered());
  }
  init();
})();
