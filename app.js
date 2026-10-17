/**
 * Flexible Printronics Lab - Interactive Controller
 * Self-Contained, Zero External CDN Dependencies
 * Includes Authenticated Intranet Portal, Access Control & Live PI Content Editor
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Theme Toggle (Dark / Light Mode)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('printronics_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', next);
      localStorage.setItem('printronics_theme', next);
    });
  }

  // ==========================================================================
  // 2. Mobile Navigation Drawer
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobLinks = document.querySelectorAll('.mob-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ==========================================================================
  // 3. Member Directory Filter Tabs & Search
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const memberCards = document.querySelectorAll('.member-card');
  const memberSearch = document.getElementById('memberSearch');

  function filterMembers() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const role = activeBtn ? activeBtn.getAttribute('data-role') : 'all';
    const query = memberSearch ? memberSearch.value.trim().toLowerCase() : '';

    const allCards = document.querySelectorAll('.member-card');
    allCards.forEach(card => {
      const cardRole = card.getAttribute('data-role');
      const text = card.textContent.toLowerCase();
      const matchesRole = role === 'all' || cardRole === role;
      const matchesQuery = query === '' || text.includes(query);

      card.style.display = matchesRole && matchesQuery ? 'flex' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMembers();
    });
  });

  if (memberSearch) {
    memberSearch.addEventListener('input', filterMembers);
  }

  // ==========================================================================
  // 4. Publications Filter & Search
  // ==========================================================================
  const pubSearch = document.getElementById('pubSearch');
  if (pubSearch) {
    pubSearch.addEventListener('input', () => {
      const query = pubSearch.value.trim().toLowerCase();
      const allPubs = document.querySelectorAll('.pub-card');
      allPubs.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // ==========================================================================
  // 5. Toast & Highlight Animation Helpers
  // ==========================================================================
  function showToast(msg) {
    let toast = document.querySelector('.admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  function flashAndScroll(el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('flash-highlight');
    setTimeout(() => el.classList.remove('flash-highlight'), 3500);
  }

  // ==========================================================================
  // 6. Authenticated Intranet Portal & Access Control Flow
  // ==========================================================================
  const authGate = document.getElementById('intranetAuthGate');
  const workspace = document.getElementById('intranetWorkspace');
  const loginForm = document.getElementById('intranetLoginForm');
  const intraUser = document.getElementById('intraUser');
  const intraPass = document.getElementById('intraPass');
  const intraError = document.getElementById('intraError');
  const btnSignOut = document.getElementById('btnIntranetSignOut');

  function updateIntranetAuthUI() {
    const isAuth = sessionStorage.getItem('printronics_auth') === 'true';
    if (authGate && workspace) {
      if (isAuth) {
        authGate.style.display = 'none';
        workspace.style.display = 'block';
      } else {
        authGate.style.display = 'block';
        workspace.style.display = 'none';
      }
    }
  }

  // Initial check
  updateIntranetAuthUI();

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = intraUser.value.trim().toLowerCase();
      const p = intraPass.value.trim();

      if (u === 'demo' && p === 'demo') {
        if (intraError) intraError.style.display = 'none';
        sessionStorage.setItem('printronics_auth', 'true');
        updateIntranetAuthUI();
        showToast('🔓 Welcome, Prof. Cheng-Yao Lo! Intranet & Editor Unlocked.');
        // Activate Editor tab by default
        const editorTab = document.querySelector('.intra-tab[data-intra="editor"]');
        if (editorTab) editorTab.click();
      } else {
        if (intraError) {
          intraError.style.display = 'block';
          intraError.textContent = '⚠️ Invalid credentials. Demo login: Username = demo | Password = demo';
        }
      }
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener('click', () => {
      sessionStorage.removeItem('printronics_auth');
      updateIntranetAuthUI();
      showToast('🔒 Signed out of Lab Intranet session.');
      const intraSection = document.getElementById('intranet');
      if (intraSection) intraSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 7. Intranet Tab Navigation
  // ==========================================================================
  const intraTabs = document.querySelectorAll('.intra-tab');
  const intraViews = document.querySelectorAll('.intra-view');

  intraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      intraTabs.forEach(t => t.classList.remove('active'));
      intraViews.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-intra');
      const view = document.getElementById(`view-${target}`);
      if (view) view.classList.add('active');
    });
  });

  // ==========================================================================
  // 8. Embedded PI Visual Website Editor Logic
  // ==========================================================================
  const edTabs = document.querySelectorAll('.editor-tab-btn');
  const edPanels = document.querySelectorAll('.editor-panel');

  edTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      edTabs.forEach(b => b.classList.remove('active'));
      edPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`edtab-${btn.dataset.edtab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // 8a. Apply News
  const btnApplyNews = document.getElementById('btnIntraApplyNews');
  if (btnApplyNews) {
    btnApplyNews.addEventListener('click', () => {
      const title = document.getElementById('intraNewsTitle').value.trim();
      const badge = document.getElementById('intraNewsBadge').value.trim() || 'News 2026';
      const cat = document.getElementById('intraNewsCategory').value;

      if (!title) {
        alert('Please enter an announcement headline.');
        return;
      }

      const timeline = document.querySelector('.timeline');
      if (timeline) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
          <div class="timeline-marker"></div>
          <div class="timeline-card glass-panel">
            <div class="timeline-date">${badge}</div>
            <span class="badge badge-accent">${cat}</span>
            <h4>${title}</h4>
            <p>Newly published lab milestone posted via Authenticated PI Portal.</p>
          </div>
        `;
        timeline.insertBefore(item, timeline.firstChild);
        flashAndScroll(item);
        showToast(`Published: "${title.substring(0, 32)}..."`);
        document.getElementById('intraNewsTitle').value = '';
      }
    });
  }

  // 8b. Apply Member
  const btnApplyMember = document.getElementById('btnIntraApplyMember');
  if (btnApplyMember) {
    btnApplyMember.addEventListener('click', () => {
      const name = document.getElementById('intraMemName').value.trim();
      const chinese = document.getElementById('intraMemChinese').value.trim();
      const role = document.getElementById('intraMemRole').value;
      const topic = document.getElementById('intraMemTopic').value.trim() || 'Flexible Hybrid Electronics & Printed Sensors';

      if (!name) {
        alert('Please enter the full name of the member.');
        return;
      }

      const grid = document.getElementById('membersGrid');
      if (grid) {
        const card = document.createElement('div');
        card.className = 'member-card glass-panel';
        card.dataset.role = role;
        const roleLabel = role === 'phd' ? 'Ph.D. Candidate' : (role === 'ms' ? 'Master Candidate' : (role === 'ra' ? 'Research Assistant' : 'Undergraduate'));
        const roleBadgeClass = role === 'phd' ? 'badge-purple' : 'badge-cyan';

        card.innerHTML = `
          <div class="member-badge ${roleBadgeClass}">${roleLabel}</div>
          <h4 class="member-name">${name} ${chinese ? `(${chinese})` : ''}</h4>
          <div class="member-focus">${topic}</div>
          <p class="member-desc">Newly enrolled researcher in Printronics Lab.</p>
          <div class="member-year">2026 &ndash; Present</div>
        `;
        grid.insertBefore(card, grid.firstChild);
        flashAndScroll(card);
        showToast(`Added: ${name} to Lab Members!`);
        document.getElementById('intraMemName').value = '';
        document.getElementById('intraMemChinese').value = '';
      }
    });
  }

  // 8c. Apply Publication
  const btnApplyPub = document.getElementById('btnIntraApplyPub');
  if (btnApplyPub) {
    btnApplyPub.addEventListener('click', () => {
      const title = document.getElementById('intraPubTitle').value.trim();
      const authors = document.getElementById('intraPubAuthors').value.trim() || 'Printronics Lab Authors';
      const journal = document.getElementById('intraPubJournal').value.trim() || 'Nature Sensors';
      const year = document.getElementById('intraPubYear').value.trim() || '2026';

      if (!title) {
        alert('Please enter a paper title.');
        return;
      }

      const pubList = document.getElementById('pubList');
      if (pubList) {
        const card = document.createElement('article');
        card.className = 'pub-card glass-panel';
        card.dataset.category = 'journal';
        card.innerHTML = `
          <div class="pub-type-badge badge-purple">Journal Article</div>
          <h4 class="pub-title">${title}</h4>
          <div class="pub-authors">${authors}</div>
          <div class="pub-meta">
            <span class="pub-journal">${journal}</span> (${year})
            <span class="pub-doi">&bull; Status: Published</span>
          </div>
        `;
        pubList.insertBefore(card, pubList.firstChild);
        flashAndScroll(card);
        showToast(`Added Paper: "${title.substring(0, 32)}..."`);
        document.getElementById('intraPubTitle').value = '';
      }
    });
  }

  // 8d. Export & Download Updated Code
  const btnExport = document.getElementById('btnExportCodeIntra');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const clonedDoc = document.documentElement.cloneNode(true);
      const toast = clonedDoc.querySelector('.admin-toast');
      if (toast) toast.remove();

      const htmlContent = '<!DOCTYPE html>\n' + clonedDoc.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('💾 Updated index.html exported & downloaded!');
    });
  }

  // ==========================================================================
  // 9. Interactive Access Control (User Management)
  // ==========================================================================
  const userTableBody = document.getElementById('userTableBody');
  const btnAddNewUser = document.getElementById('btnAddNewUser');

  if (userTableBody) {
    userTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-revoke')) {
        const row = e.target.closest('tr');
        const user = e.target.getAttribute('data-user');
        const statusBadge = row.querySelector('td:nth-child(5) .badge');
        statusBadge.textContent = 'Revoked';
        statusBadge.className = 'badge';
        statusBadge.style.background = 'rgba(239,68,68,0.2)';
        statusBadge.style.color = '#fca5a5';

        e.target.textContent = '🔄 Re-activate';
        e.target.className = 'btn btn-outline btn-xs btn-restore';
        showToast(`🔒 Access revoked for ${user}`);
      } else if (e.target.classList.contains('btn-restore')) {
        const row = e.target.closest('tr');
        const user = e.target.getAttribute('data-user');
        const statusBadge = row.querySelector('td:nth-child(5) .badge');
        statusBadge.textContent = 'Active';
        statusBadge.className = 'badge badge-accent';
        statusBadge.style.background = '';
        statusBadge.style.color = '';

        e.target.textContent = '🚫 Revoke';
        e.target.className = 'btn btn-outline btn-xs btn-revoke';
        showToast(`✅ Access re-activated for ${user}`);
      }
    });
  }

  if (btnAddNewUser) {
    btnAddNewUser.addEventListener('click', () => {
      const email = prompt('Enter student NTHU email (e.g., student@mx.nthu.edu.tw):', 'newstudent@mx.nthu.edu.tw');
      if (!email) return;
      const name = prompt('Enter student name:', 'New Lab Member');
      if (!name) return;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><code>${email}</code></td>
        <td><strong>${name}</strong></td>
        <td><span class="badge badge-cyan">New Student</span></td>
        <td>Researcher (Inventory + Booking)</td>
        <td><span class="badge badge-accent">Active</span></td>
        <td>
          <button class="btn btn-outline btn-xs btn-revoke" data-user="${name}">🚫 Revoke</button>
        </td>
      `;
      userTableBody.insertBefore(newRow, userTableBody.firstChild);
      showToast(`Account created for ${name} (${email})!`);
    });
  }

  // ==========================================================================
  // 10. Generic Inventory Table Filters
  // ==========================================================================
  function bindTableFilter(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  bindTableFilter('filterPrecursor', 'tablePrecursor');
  bindTableFilter('filterMcu', 'tableMcu');
  bindTableFilter('filterSubstrate', 'tableSubstrate');
  bindTableFilter('filterMaintenance', 'tableMaintenance');

  // ==========================================================================
  // 11. Plaintext Email Obfuscation Remediation
  // ==========================================================================
  const obfuscatedLinks = document.querySelectorAll('.obfuscated-email');
  obfuscatedLinks.forEach(link => {
    const user = 'chengyao';
    const domain = 'mx.nthu.edu.tw';
    link.href = `mailto:${user}@${domain}`;
    link.title = `Send Email to ${user}@${domain}`;
  });

  console.log("Flexible Printronics Lab Controller loaded successfully.");
});
