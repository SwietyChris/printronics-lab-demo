/**
 * Flexible Printronics Lab - Interactive Offline Controller
 * 100% Self-Contained, Zero External CDN Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle (Dark / Light Mode)
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

  // 2. Mobile Menu Drawer
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

  // 3. Research Pillars Tab Navigation
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

  // 4. Members Filtering & Live Search
  const filterBtns = document.querySelectorAll('.btn-filter');
  const memberCards = document.querySelectorAll('.member-card');
  const memberSearch = document.getElementById('memberSearch');

  let activeMemberFilter = 'all';
  let memberSearchQuery = '';

  function updateMemberVisibility() {
    memberCards.forEach(card => {
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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMemberFilter = btn.dataset.filter;
      updateMemberVisibility();
    });
  });

  if (memberSearch) {
    memberSearch.addEventListener('input', (e) => {
      memberSearchQuery = e.target.value.trim().toLowerCase();
      updateMemberVisibility();
    });
  }

  // 5. Document Center / Publications Filter & Search
  const pubFilters = document.querySelectorAll('.pub-filter');
  const pubCards = document.querySelectorAll('.pub-card');
  const pubSearch = document.getElementById('pubSearch');

  let activePubFilter = 'all';
  let pubSearchQuery = '';

  function updatePubVisibility() {
    pubCards.forEach(card => {
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
      activePubFilter = btn.dataset.pub;
      updatePubVisibility();
    });
  });

  if (pubSearch) {
    pubSearch.addEventListener('input', (e) => {
      pubSearchQuery = e.target.value.trim().toLowerCase();
      updatePubVisibility();
    });
  }

  // 6. Intranet Database Tab Switcher & Table Search
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

  // 7. Plaintext Email Obfuscation Remediation (Phase 1 Spec)
  // Ensures spam crawlers cannot harvest plaintext emails
  const obfuscatedLinks = document.querySelectorAll('.obfuscated-email');
  obfuscatedLinks.forEach(link => {
    const user = 'chengyao';
    const domain = 'mx.nthu.edu.tw';
    link.href = `mailto:${user}@${domain}`;
    link.title = `Send Email to ${user}@${domain}`;
  });

  console.log("Flexible Printronics Lab Offline Prototype loaded successfully.");
});
