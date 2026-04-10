// ─── PodSchedule Workflow Logic ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const cols = {
        'Booked': document.getElementById('col-booked'),
        'Recorded': document.getElementById('col-recorded'),
        'Editing': document.getElementById('col-editing'),
        'Published': document.getElementById('col-published')
    };

    const hdCnts = {
        'Booked': document.getElementById('hd-cnt-booked'),
        'Recorded': document.getElementById('hd-cnt-recorded'),
        'Editing': document.getElementById('hd-cnt-editing'),
        'Published': document.getElementById('hd-cnt-published')
    };

    const wfCnts = {
        'Booked': document.getElementById('wf-cnt-booked'),
        'Recorded': document.getElementById('wf-cnt-recorded'),
        'Editing': document.getElementById('wf-cnt-editing'),
        'Published': document.getElementById('wf-cnt-published')
    };

    // Load Data
    function renderBoard() {
        // Clear all
        Object.values(cols).forEach(col => col.innerHTML = '');
        
        const counts = { 'Booked': 0, 'Recorded': 0, 'Editing': 0, 'Published': 0 };

        window.PodData.getBookings().forEach(b => {
            const card = buildCard(b);
            if(cols[b.status]) {
                cols[b.status].appendChild(card);
                counts[b.status]++;
            }
        });

        // Update counts
        Object.keys(counts).forEach(status => {
            if(hdCnts[status]) hdCnts[status].textContent = counts[status];
            if(wfCnts[status]) wfCnts[status].textContent = counts[status];
        });
    }

    // Build Card
    function buildCard(b) {
        const div = document.createElement('div');
        div.className = 'wf-card';
        div.draggable = true;
        div.dataset.id = b.id;

        const dateObj = new Date(b.date);
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Get initials for avatar
        const initials = b.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        div.innerHTML = `
            <div class="wf-title">${b.podcastTitle}</div>
            <div class="wf-meta">
                <div class="wf-avatar">${initials}</div>
                <span>${b.name}</span>
            </div>
            <div class="wf-meta">
                <span><i data-lucide="calendar"></i></span>
                <span>${dateStr}</span>
            </div>
            <div class="wf-menu"><i data-lucide="more-vertical" style="width:16px;height:16px"></i></div>
        `;

        // Drag Events
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);

        return div;
    }

    // Drag and Drop Logic
    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.id); // Required for Firefox
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedItem = null;
    }

    // Setup Columns as Drop Zones
    Object.values(cols).forEach(col => {
        col.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        col.addEventListener('drop', e => {
            e.preventDefault();
            if(!draggedItem) return;

            const targetStatus = col.dataset.status;
            const id = draggedItem.dataset.id;

            // Update state
            window.PodData.updateStatus(id, targetStatus);
            
            // Re-render
            renderBoard();
        });
    });

    // Mobile Menu
    document.getElementById('menuBtn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // Initial render
    renderBoard();
});
