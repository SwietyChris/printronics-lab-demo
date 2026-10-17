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


  // ==========================================================================
  // 8. PI Visual Editor & Interactive Admin Dashboard Logic
  // ==========================================================================
  const adminModal = document.getElementById("adminModal");
  const openAdminBtn = document.getElementById("openAdminModal");
  const closeAdminBtn = document.getElementById("closeAdminModal");

  function openModal() {
    if (!adminModal) return;
    adminModal.style.display = "flex";
    requestAnimationFrame(() => adminModal.classList.add("open"));
  }

  function closeModal() {
    if (!adminModal) return;
    adminModal.classList.remove("open");
    setTimeout(() => { adminModal.style.display = "none"; }, 250);
  }

  if (openAdminBtn) openAdminBtn.addEventListener("click", openModal);
  if (closeAdminBtn) closeAdminBtn.addEventListener("click", closeModal);

  if (adminModal) {
    adminModal.addEventListener("click", (e) => {
      if (e.target === adminModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && adminModal && adminModal.classList.contains("open")) {
      closeModal();
    }
  });

  // Admin Tab Switching
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  const tabPanels = document.querySelectorAll(".admin-tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = `admin-tab-${btn.dataset.tab}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Flash & Toast Helpers
  function showToast(msg) {
    let toast = document.querySelector(".admin-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "admin-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  function flashAndScroll(el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("flash-highlight");
    setTimeout(() => el.classList.remove("flash-highlight"), 3500);
  }

  // 1. Apply News
  const btnApplyNews = document.getElementById("btnApplyNews");
  if (btnApplyNews) {
    btnApplyNews.addEventListener("click", () => {
      const title = document.getElementById("adminNewsTitle").value.trim();
      const badge = document.getElementById("adminNewsBadge").value.trim() || "News 2026";
      const cat = document.getElementById("adminNewsCategory").value;

      if (!title) {
        alert("Please enter a headline for the news item.");
        return;
      }

      const timeline = document.querySelector(".timeline");
      if (timeline) {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
          <div class="timeline-marker"></div>
          <div class="timeline-card glass-panel">
            <div class="timeline-date">${badge}</div>
            <span class="badge badge-accent">${cat}</span>
            <h4>${title}</h4>
            <p>Newly posted announcement by Lab PI / Administrator.</p>
          </div>
        `;
        timeline.insertBefore(item, timeline.firstChild);
        closeModal();
        flashAndScroll(item);
        showToast(`Published: "${title.substring(0, 32)}..."`);
        document.getElementById("adminNewsTitle").value = "";
      }
    });
  }

  // 2. Apply Member
  const btnApplyMember = document.getElementById("btnApplyMember");
  if (btnApplyMember) {
    btnApplyMember.addEventListener("click", () => {
      const name = document.getElementById("adminMemName").value.trim();
      const chinese = document.getElementById("adminMemChinese").value.trim();
      const role = document.getElementById("adminMemRole").value;
      const topic = document.getElementById("adminMemTopic").value.trim() || "Advanced Flexible Electronics & Sensing";

      if (!name) {
        alert("Please enter the member full name.");
        return;
      }

      const grid = document.getElementById("membersGrid");
      if (grid) {
        const card = document.createElement("div");
        card.className = "member-card glass-panel";
        card.dataset.role = role;
        const roleLabel = role === "phd" ? "Ph.D. Candidate" : (role === "ms" ? "Master Candidate" : (role === "ra" ? "Research Assistant" : "Undergraduate"));
        const roleBadgeClass = role === "phd" ? "badge-purple" : "badge-cyan";

        card.innerHTML = `
          <div class="member-badge ${roleBadgeClass}">${roleLabel}</div>
          <h4 class="member-name">${name} ${chinese ? `(${chinese})` : ""}</h4>
          <div class="member-focus">${topic}</div>
          <p class="member-desc">Newly added researcher in Printronics Lab.</p>
          <div class="member-year">2026 &ndash; Present</div>
        `;
        grid.insertBefore(card, grid.firstChild);
        closeModal();
        flashAndScroll(card);
        showToast(`Added: ${name} to Lab Members!`);
        document.getElementById("adminMemName").value = "";
        document.getElementById("adminMemChinese").value = "";
      }
    });
  }

  // 3. Apply Publication
  const btnApplyPub = document.getElementById("btnApplyPub");
  if (btnApplyPub) {
    btnApplyPub.addEventListener("click", () => {
      const title = document.getElementById("adminPubTitle").value.trim();
      const authors = document.getElementById("adminPubAuthors").value.trim() || "Printronics Lab Authors";
      const journal = document.getElementById("adminPubJournal").value.trim() || "Journal";
      const year = document.getElementById("adminPubYear").value.trim() || "2026";

      if (!title) {
        alert("Please enter a publication title.");
        return;
      }

      const pubList = document.getElementById("pubList");
      if (pubList) {
        const card = document.createElement("article");
        card.className = "pub-card glass-panel";
        card.dataset.category = "journal";
        card.innerHTML = `
          <div class="pub-type-badge badge-purple">Journal Article</div>
          <h4 class="pub-title">${title}</h4>
          <div class="pub-authors">${authors}</div>
          <div class="pub-meta">
            <span class="pub-journal">${journal}</span> (${year})
            <span class="pub-doi">&bull; Status: Recently Published</span>
          </div>
        `;
        pubList.insertBefore(card, pubList.firstChild);
        closeModal();
        flashAndScroll(card);
        showToast(`Added Paper: "${title.substring(0, 32)}..."`);
        document.getElementById("adminPubTitle").value = "";
      }
    });
  }

  // 4. Export & Download Updated index.html Code
  const btnExport = document.getElementById("btnExportCode");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const clonedDoc = document.documentElement.cloneNode(true);
      const modal = clonedDoc.querySelector("#adminModal");
      if (modal) {
        modal.style.display = "none";
        modal.classList.remove("open");
      }
      const toast = clonedDoc.querySelector(".admin-toast");
      if (toast) toast.remove();

      const htmlContent = "<!DOCTYPE html>\n" + clonedDoc.outerHTML;
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "index.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("💾 Updated index.html exported & downloaded!");
    });
  }
