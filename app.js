/**
 * Flexible Printronics Lab - Interactive Offline Controller
 * 100% Self-Contained, Zero External CDN Dependencies
 * Includes: Research Pillars, Members Filter, Publications Filter,
 * Authenticated Intranet Portal, Access Control Matrix & Live PI Editor
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
  // 2. Mobile Menu Drawer
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
  // 3. Research Pillars Tab Navigation (Image 1)
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.tab}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 4. Members Filtering & Live Search (Image 2)
  // ==========================================================================
  const memberFilterBtns = document.querySelectorAll('.btn-filter');
  const memberSearch = document.getElementById('memberSearch');

  let activeMemberFilter = 'all';
  let memberSearchQuery = '';

  function updateMemberVisibility() {
    const allCards = document.querySelectorAll('.member-card');
    allCards.forEach(card => {
      const role = card.dataset.role;
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeMemberFilter === 'all' || role === activeMemberFilter;
      const matchesSearch = !memberSearchQuery || text.includes(memberSearchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  memberFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      memberFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMemberFilter = btn.dataset.filter || 'all';
      updateMemberVisibility();
    });
  });

  if (memberSearch) {
    memberSearch.addEventListener('input', (e) => {
      memberSearchQuery = e.target.value.trim().toLowerCase();
      updateMemberVisibility();
    });
  }

  // ==========================================================================
  // 5. Document Center / Publications Filter & Search (Image 3)
  // ==========================================================================
  const pubFilters = document.querySelectorAll('.pub-filter');
  const pubSearch = document.getElementById('pubSearch');

  let activePubFilter = 'all';
  let pubSearchQuery = '';

  function updatePubVisibility() {
    const allPubs = document.querySelectorAll('.pub-card');
    allPubs.forEach(card => {
      const cat = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchesFilter = activePubFilter === 'all' || cat === activePubFilter;
      const matchesSearch = !pubSearchQuery || text.includes(pubSearchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  pubFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      pubFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePubFilter = btn.dataset.pub || 'all';
      updatePubVisibility();
    });
  });

  if (pubSearch) {
    pubSearch.addEventListener('input', (e) => {
      pubSearchQuery = e.target.value.trim().toLowerCase();
      updatePubVisibility();
    });
  }

  // ==========================================================================
  // 6. Toast & Highlight Animation Helpers
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
  // 7. Authenticated Intranet Portal & Multi-Role Access Control (Admin vs. Student)
  // ==========================================================================
  const authGate = document.getElementById('intranetAuthGate');
  const workspace = document.getElementById('intranetWorkspace');
  const loginForm = document.getElementById('intranetLoginForm');
  const intraUser = document.getElementById('intraUser');
  const intraPass = document.getElementById('intraPass');
  const intraError = document.getElementById('intraError');
  const btnSignOut = document.getElementById('btnIntranetSignOut');

  const btnFillAdmin = document.getElementById('btnFillAdmin');
  const btnFillStudent = document.getElementById('btnFillStudent');
  const intraUserRoleText = document.getElementById('intraUserRoleText');
  const intraWorkspaceTitle = document.getElementById('intraWorkspaceTitle');
  const intraWorkspaceSubtitle = document.getElementById('intraWorkspaceSubtitle');
  const studentNoticeBox = document.getElementById('studentNoticeBox');
  const adminOnlyTabs = document.querySelectorAll('.admin-only-tab');

  // Quick autofill buttons for presentation
  if (btnFillAdmin) {
    btnFillAdmin.addEventListener('click', () => {
      intraUser.value = 'demo';
      intraPass.value = 'demo';
      if (intraError) intraError.style.display = 'none';
      showToast('Autofilled Professor Admin (demo / demo)');
    });
  }

  if (btnFillStudent) {
    btnFillStudent.addEventListener('click', () => {
      intraUser.value = 'student';
      intraPass.value = 'student';
      if (intraError) intraError.style.display = 'none';
      showToast('Autofilled Lab Student (student / student)');
    });
  }

  function updateIntranetAuthUI() {
    const isAuth = sessionStorage.getItem('printronics_auth') === 'true';
    const role = sessionStorage.getItem('printronics_role') || 'admin';

    if (!authGate || !workspace) return;

    if (!isAuth) {
      authGate.style.display = 'block';
      workspace.style.display = 'none';
      return;
    }

    authGate.style.display = 'none';
    workspace.style.display = 'block';

    if (role === 'admin') {
      // Role: Professor / Super Admin
      if (intraUserRoleText) {
        intraUserRoleText.innerHTML = '<strong>Authenticated:</strong> Prof. Cheng-Yao Lo (PI &amp; Super Admin) &bull; <span class="badge badge-accent">Role: Super Admin</span>';
      }
      if (intraWorkspaceTitle) {
        intraWorkspaceTitle.textContent = 'Printronics Lab Intranet & Management Console';
      }
      if (intraWorkspaceSubtitle) {
        intraWorkspaceSubtitle.textContent = 'Manage public website content, view internal inventories, allocate MCUs, track chemical precursors, and manage member credentials.';
      }
      if (studentNoticeBox) studentNoticeBox.style.display = 'none';

      // Show Admin-only tabs
      adminOnlyTabs.forEach(t => t.style.display = 'inline-flex');

      // Activate Editor tab by default for Admin
      const editorTab = document.querySelector('.intra-tab[data-intra="editor"]');
      if (editorTab) editorTab.click();

    } else {
      // Role: Lab Student / Researcher (Read-only Internal Data)
      if (intraUserRoleText) {
        intraUserRoleText.innerHTML = '<strong>Authenticated:</strong> Lab Student / Researcher &bull; <span class="badge badge-cyan">Role: Lab Member</span>';
      }
      if (intraWorkspaceTitle) {
        intraWorkspaceTitle.textContent = 'Printronics Lab Member Intranet Portal';
      }
      if (intraWorkspaceSubtitle) {
        intraWorkspaceSubtitle.textContent = 'Internal equipment booking logs, chemical precursor tracking, hardware inventory, and lab SOPs.';
      }
      if (studentNoticeBox) studentNoticeBox.style.display = 'flex';

      // Hide Admin-only tabs (PI Editor & Access Control)
      adminOnlyTabs.forEach(t => t.style.display = 'none');

      // Deactivate admin views and activate chemical precursor tab by default
      const precursorTab = document.querySelector('.intra-tab[data-intra="precursor"]');
      if (precursorTab) precursorTab.click();
    }
  }

  // Initial authentication check
  updateIntranetAuthUI();

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = intraUser.value.trim().toLowerCase();
      const p = intraPass.value.trim().toLowerCase();

      if (u === 'demo' && p === 'demo') {
        if (intraError) intraError.style.display = 'none';
        sessionStorage.setItem('printronics_auth', 'true');
        sessionStorage.setItem('printronics_role', 'admin');
        updateIntranetAuthUI();
        showToast('👑 Signed in as Professor / PI (Super Admin) - Full Site & Intranet Control');
      } else if (u === 'student' && p === 'student') {
        if (intraError) intraError.style.display = 'none';
        sessionStorage.setItem('printronics_auth', 'true');
        sessionStorage.setItem('printronics_role', 'student');
        updateIntranetAuthUI();
        showToast('🎓 Signed in as Lab Student - Equipment & Inventories View');
      } else {
        if (intraError) {
          intraError.style.display = 'block';
          intraError.textContent = '⚠️ Invalid credentials. Demo Logins: demo / demo (Professor) or student / student (Student)';
        }
      }
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener('click', () => {
      sessionStorage.removeItem('printronics_auth');
      sessionStorage.removeItem('printronics_role');
      updateIntranetAuthUI();
      showToast('🔒 Signed out of Lab Intranet session.');
      const intraSection = document.getElementById('intranet');
      if (intraSection) intraSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 8. Intranet Database Tab Switcher & Table Search
  // ==========================================================================
  const intraTabs = document.querySelectorAll('.intra-tab');
  const intraViews = document.querySelectorAll('.intra-view');

  intraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      intraTabs.forEach(t => t.classList.remove('active'));
      intraViews.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const targetView = document.getElementById(`view-${tab.dataset.intra}`);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });

  // Generic Table Filter Helper
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
  // 9. Embedded PI Visual Website Editor Logic
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

  // 9a. Apply News
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

  // 9b. Apply Member
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
        updateMemberVisibility();
      }
    });
  }

  // 9c. Apply Publication
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
        updatePubVisibility();
      }
    });
  }

  // 9d. Export & Download Updated Code
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
  // 10. Interactive Access Control (User Management Matrix)
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
  // 11. Plaintext Email Obfuscation Remediation
  // ==========================================================================
  const obfuscatedLinks = document.querySelectorAll('.obfuscated-email');
  obfuscatedLinks.forEach(link => {
    const user = 'chengyao';
    const domain = 'mx.nthu.edu.tw';
    link.href = `mailto:${user}@${domain}`;
    link.title = `Send Email to ${user}@${domain}`;
  });

  console.log("Flexible Printronics Lab Controller loaded successfully with full tab & filter handlers.");
});
