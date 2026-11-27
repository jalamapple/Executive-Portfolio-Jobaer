/* ==========================================================================
   S M Jobaer Alam — Interactive Application Engine (js/app.js)
   Website: www.jobaeralam.com
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.PORTFOLIO_DATA || {};
  var EMAIL_CONFIG = DATA.EMAIL_CONFIG || {
    web3formsEndpoint: 'https://api.web3forms.com/submit',
    web3formsAccessKey: '5503b99b-47a7-464e-b17e-17a720c74596',
    recipientEmail: 'hello@jobaeralam.com',
    outlookWebCompose: 'https://outlook.cloud.microsoft/mail/deeplink/compose',
    whatsappNumber: '8801712695028'
  };
  var FREE_TOOLS_CATALOG = DATA.FREE_TOOLS_CATALOG || [];
  var CASE_STUDIES = DATA.CASE_STUDIES || [];
  var INQUIRY_SUGGESTIONS = DATA.INQUIRY_SUGGESTIONS || {};
  var ATS_PLAIN_TEXT_RESUME = DATA.ATS_PLAIN_TEXT_RESUME || '';

  var toastTimer = null;
  function showToast(message) {
    try {
      var toastEl = document.getElementById('toast');
      var textEl = document.getElementById('toast-text');
      if (!toastEl || !textEl) return;
      textEl.textContent = message;
      toastEl.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3400);
    } catch (err) {}
  }

  function copyToClipboard(text, successMsg) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var copied = document.execCommand('copy');
      document.body.removeChild(ta);
      if (copied) { showToast(successMsg || 'Copied to clipboard!'); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showToast(successMsg || 'Copied to clipboard!'); }).catch(function () { showToast('Press Ctrl+C to copy.'); });
      }
    } catch (err) { showToast('Unable to copy automatically.'); }
  }

  function triggerFileDownload(filename, content, mimeType) {
    try {
      var blob = new Blob([content], { type: mimeType });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 2000);
      return true;
    } catch (err) { return false; }
  }

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    if (!document.querySelector('.modal-backdrop.open')) document.body.style.overflow = '';
  }

  function closeAllModals() {
    var modals = document.querySelectorAll('.modal-backdrop.open');
    for (var i = 0; i < modals.length; i++) modals[i].classList.remove('open');
    document.body.style.overflow = '';
  }

  /* === LIQUID "FLOATING ON WATER" SMOOTH SCROLL ENGINE === */
  var liquidScroll = {
    currentY: 0,
    targetY: 0,
    rafId: null,
    glideAnimId: null,
    isGliding: false,
    lastFrameTime: 0
  };

  function getMaxScrollY() {
    return Math.max(0, document.documentElement.scrollHeight - (window.innerHeight || document.documentElement.clientHeight || 0));
  }

  function prefersReducedMotion() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      return false;
    }
  }

  function applyInstantScroll(y) {
    try {
      window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    } catch (e) {
      window.scrollTo(0, y);
    }
  }

  function stopLiquidLoops() {
    if (liquidScroll.rafId) {
      window.cancelAnimationFrame(liquidScroll.rafId);
      liquidScroll.rafId = null;
    }
    if (liquidScroll.glideAnimId) {
      window.cancelAnimationFrame(liquidScroll.glideAnimId);
      liquidScroll.glideAnimId = null;
    }
    liquidScroll.isGliding = false;
  }

  function runLiquidInertiaLoop(now) {
    if (!liquidScroll.lastFrameTime) liquidScroll.lastFrameTime = now;
    var dt = Math.min(0.05, Math.max(0.001, (now - liquidScroll.lastFrameTime) / 1000));
    liquidScroll.lastFrameTime = now;

    var maxY = getMaxScrollY();
    liquidScroll.targetY = Math.max(0, Math.min(maxY, liquidScroll.targetY));

    var diff = liquidScroll.targetY - liquidScroll.currentY;
    if (Math.abs(diff) < 0.35) {
      liquidScroll.currentY = liquidScroll.targetY;
      applyInstantScroll(liquidScroll.currentY);
      liquidScroll.rafId = null;
      liquidScroll.lastFrameTime = 0;
      return;
    }

    var ease = 1 - Math.pow(0.0012, dt);
    liquidScroll.currentY += diff * ease;
    applyInstantScroll(liquidScroll.currentY);
    liquidScroll.rafId = window.requestAnimationFrame(runLiquidInertiaLoop);
  }

  function smoothScrollToY(targetY, durationMs, onDone) {
    var clampedY = Math.max(0, Math.min(targetY, getMaxScrollY()));
    stopLiquidLoops();

    if (prefersReducedMotion()) {
      liquidScroll.currentY = clampedY;
      liquidScroll.targetY = clampedY;
      applyInstantScroll(clampedY);
      if (onDone) onDone();
      return;
    }

    var startY = window.pageYOffset || document.documentElement.scrollTop || 0;
    liquidScroll.currentY = startY;
    liquidScroll.targetY = clampedY;
    var delta = clampedY - startY;

    if (Math.abs(delta) < 1.5) {
      liquidScroll.currentY = clampedY;
      applyInstantScroll(clampedY);
      if (onDone) onDone();
      return;
    }

    var duration = durationMs || Math.min(1050, Math.max(520, Math.abs(delta) * 0.48));
    var startTime = null;
    liquidScroll.isGliding = true;

    function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    function step(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min(1, (now - startTime) / duration);
      var nextY = startY + delta * easeInOutQuint(progress);
      liquidScroll.currentY = nextY;
      liquidScroll.targetY = nextY;
      applyInstantScroll(nextY);

      if (progress < 1) {
        liquidScroll.glideAnimId = window.requestAnimationFrame(step);
      } else {
        liquidScroll.glideAnimId = null;
        liquidScroll.isGliding = false;
        liquidScroll.currentY = clampedY;
        liquidScroll.targetY = clampedY;
        applyInstantScroll(clampedY);
        if (onDone) onDone();
      }
    }

    liquidScroll.glideAnimId = window.requestAnimationFrame(step);
  }

  function smoothScrollToElement(el, extraOffset, onDone) {
    if (!el) return;
    var headerEl = document.querySelector('.site-header');
    var offset = typeof extraOffset === 'number' ? extraOffset : ((headerEl ? headerEl.offsetHeight : 76) + 10);
    var targetY = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - offset;
    smoothScrollToY(targetY, null, onDone);
  }

  function initLiquidWheelScroll() {
    var initialY = window.pageYOffset || document.documentElement.scrollTop || 0;
    liquidScroll.currentY = initialY;
    liquidScroll.targetY = initialY;

    function hasScrollableParent(node) {
      while (node && node !== document.body && node !== document.documentElement) {
        if (node.tagName === 'TEXTAREA' || node.tagName === 'SELECT' || node.isContentEditable) return true;
        var style = window.getComputedStyle(node);
        var overflowY = style ? style.overflowY : '';
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 2) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    }

    window.addEventListener('wheel', function (e) {
      if (prefersReducedMotion()) return;
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      if (document.querySelector('.modal-backdrop.open')) return;
      if (hasScrollableParent(e.target)) return;

      e.preventDefault();

      if (liquidScroll.isGliding && liquidScroll.glideAnimId) {
        window.cancelAnimationFrame(liquidScroll.glideAnimId);
        liquidScroll.glideAnimId = null;
        liquidScroll.isGliding = false;
      }

      var rawDelta = e.deltaY;
      if (e.deltaMode === 1) rawDelta *= 36;
      else if (e.deltaMode === 2) rawDelta *= (window.innerHeight || 800);

      if (!liquidScroll.rafId) {
        var liveY = window.pageYOffset || document.documentElement.scrollTop || 0;
        liquidScroll.currentY = liveY;
        liquidScroll.targetY = liveY;
      }

      liquidScroll.targetY = Math.max(0, Math.min(getMaxScrollY(), liquidScroll.targetY + rawDelta * 1.05));

      if (!liquidScroll.rafId) {
        liquidScroll.lastFrameTime = 0;
        liquidScroll.rafId = window.requestAnimationFrame(runLiquidInertiaLoop);
      }
    }, { passive: false });

    window.addEventListener('scroll', function () {
      if (!liquidScroll.rafId && !liquidScroll.isGliding) {
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        liquidScroll.currentY = y;
        liquidScroll.targetY = y;
      }
    }, { passive: true });

    window.addEventListener('touchstart', function () {
      stopLiquidLoops();
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      liquidScroll.currentY = y;
      liquidScroll.targetY = y;
    }, { passive: true });

    window.addEventListener('keydown', function (e) {
      var navKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (navKeys.indexOf(e.key) !== -1 && !e.target.matches('input, textarea, select')) {
        stopLiquidLoops();
      }
    }, { passive: true });
  }

  function bootPortfolio() {
    var refreshContactSuggestions = function () {};
    var modules = [
      initFooterYear,
      initTheme,
      initMobileMenu,
      initLiquidWheelScroll,
      initNavigationAndScrollSpy,
      initProfilePhoto,
      initCopyButtons,
      initLiveClocks,
      initExpertiseFilter,
      initExperienceTimeline,
      initCaseStudies,
      initContactForm,
      initFreeToolsHub,
      initScopeBuilder,
      initFAQ,
      initResumeHub,
      initModals
    ];
    for (var i = 0; i < modules.length; i++) {
      try { modules[i](); } catch (err) { console.error(err); }
    }

    function initFooterYear() {
      var el = document.getElementById('footer-year');
      if (el) el.textContent = String(new Date().getFullYear());
    }

    function initTheme() {
      var btn = document.getElementById('theme-toggle-btn'),
          sun = document.getElementById('theme-icon-sun'),
          moon = document.getElementById('theme-icon-moon');
      function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        if (sun && moon) {
          sun.style.display = t === 'dark' ? 'inline-block' : 'none';
          moon.style.display = t === 'light' ? 'inline-block' : 'none';
        }
        try { localStorage.setItem('jobaer_portfolio_theme', t); } catch (e) {}
      }
      var saved = 'dark';
      try {
        var s = localStorage.getItem('jobaer_portfolio_theme');
        if (s === 'light' || s === 'dark') saved = s;
      } catch (e) {}
      applyTheme(saved);
      if (btn) {
        btn.addEventListener('click', function () {
          applyTheme((document.documentElement.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark');
        });
      }
    }

    function initMobileMenu() {
      var toggle = document.getElementById('mobile-menu-toggle'),
          drawer = document.getElementById('mobile-drawer'),
          io = document.getElementById('mobile-icon-open'),
          ic = document.getElementById('mobile-icon-close');
      if (!toggle || !drawer) return;
      function setOpen(o) {
        drawer.classList.toggle('open', o);
        toggle.setAttribute('aria-expanded', o ? 'true' : 'false');
        if (io && ic) {
          io.style.display = o ? 'none' : 'inline-block';
          ic.style.display = o ? 'inline-block' : 'none';
        }
      }
      toggle.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
      var links = drawer.querySelectorAll('.js-mobile-link, .js-open-resume');
      for (var i = 0; i < links.length; i++) links[i].addEventListener('click', function () { setOpen(false); });
    }

    function initNavigationAndScrollSpy() {
      var validSections = ['top', 'expertise', 'experience', 'case-studies', 'tools', 'hire-me', 'about', 'faq', 'contact'];
      var menuSections = ['expertise', 'experience', 'case-studies', 'tools', 'hire-me', 'about', 'faq', 'contact'];
      var navLinks = document.querySelectorAll('.nav-desktop a.js-nav-link, .mobile-nav-list a.js-nav-link');
      var progressBar = document.getElementById('scroll-progress-bar');
      var backToTopBtn = document.getElementById('back-to-top-btn');
      var canRewriteUrl = (window.location.protocol === 'http:' || window.location.protocol === 'https:') && window.self === window.top;
      var currentActive = '', isProgrammaticScroll = false, scrollLockTimer = null;

      function updateCleanUrl(sectionId, push) {
        if (!canRewriteUrl) return;
        try {
          var targetPath = '/' + sectionId;
          if (window.location.pathname !== targetPath || window.location.hash) {
            if (push) window.history.pushState({ section: sectionId }, '', targetPath);
            else window.history.replaceState({ section: sectionId }, '', targetPath);
          }
        } catch (err) {}
      }

      function setActiveNav(sectionId) {
        if (currentActive === sectionId) return;
        currentActive = sectionId;
        for (var i = 0; i < navLinks.length; i++) {
          navLinks[i].classList.toggle('nav-active', navLinks[i].getAttribute('data-section') === sectionId);
        }
      }

      function scrollToSection(sectionId, pushHistory) {
        var target = document.getElementById(sectionId);
        if (!target) return;
        isProgrammaticScroll = true;
        if (scrollLockTimer) clearTimeout(scrollLockTimer);
        setActiveNav(sectionId);
        updateCleanUrl(sectionId, pushHistory);
        function unlockScroll() { isProgrammaticScroll = false; }
        if (sectionId === 'top') smoothScrollToY(0, null, unlockScroll);
        else smoothScrollToElement(target, null, unlockScroll);
        scrollLockTimer = setTimeout(unlockScroll, 950);
      }

      if (backToTopBtn) backToTopBtn.addEventListener('click', function () { scrollToSection('top', true); });

      document.addEventListener('click', function (e) {
        var link = e.target.closest('a.js-nav-link');
        if (!link) return;
        var sec = link.getAttribute('data-section');
        if (!sec || validSections.indexOf(sec) === -1) return;
        e.preventDefault();
        scrollToSection(sec, true);
      });

      function updateScrollUI() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var winH = window.innerHeight || document.documentElement.clientHeight || 800;
        var docH = document.documentElement.scrollHeight || 0;
        var maxScroll = Math.max(1, docH - winH);
        if (progressBar) progressBar.style.width = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)).toFixed(1) + '%';
        if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrollY > 420);
        if (isProgrammaticScroll) return;
        if (scrollY < 160) { setActiveNav('top'); updateCleanUrl('top', false); return; }
        if (scrollY + winH >= docH - 60) { setActiveNav('contact'); updateCleanUrl('contact', false); return; }
        var triggerLine = scrollY + 150, matched = 'top';
        for (var i = 0; i < menuSections.length; i++) {
          var el = document.getElementById(menuSections[i]);
          if (el && el.offsetTop <= triggerLine) matched = menuSections[i];
        }
        setActiveNav(matched);
        updateCleanUrl(matched, false);
      }

      var rafPending = false;
      window.addEventListener('scroll', function () {
        if (rafPending) return;
        rafPending = true;
        window.requestAnimationFrame(function () { updateScrollUI(); rafPending = false; });
      }, { passive: true });

      window.addEventListener('popstate', function () {
        var slug = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
        scrollToSection(validSections.indexOf(slug) !== -1 ? slug : 'top', false);
      });

      var initialSlug = (window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname.replace(/^\/+|\/+$/g, '')).toLowerCase();
      if (initialSlug && validSections.indexOf(initialSlug) !== -1) setTimeout(function () { scrollToSection(initialSlug, false); }, 60);
      else updateScrollUI();
    }

    function initProfilePhoto() {
      var img = document.getElementById('about-profile-photo'), fb = document.getElementById('about-profile-fallback');
      if (!img || !fb) return;
      if ((window.location.protocol === 'http:' || window.location.protocol === 'https:') && img.getAttribute('src') === 'images/profile.jpg') {
        img.setAttribute('src', '/images/profile.jpg');
      }
      function showFb() { img.style.display = 'none'; fb.style.display = 'flex'; }
      function showImg() { img.style.display = 'block'; fb.style.display = 'none'; }
      img.addEventListener('error', showFb);
      img.addEventListener('load', function () { if (img.naturalWidth > 0) showImg(); else showFb(); });
      if (img.complete) { if (img.naturalWidth === 0) showFb(); else showImg(); }
    }

    function initCopyButtons() {
      document.addEventListener('click', function (e) {
        var btn = e.target.closest('.js-copy-btn');
        if (!btn) return;
        var text = btn.getAttribute('data-copy');
        if (text) copyToClipboard(text, btn.getAttribute('data-toast'));
      });
    }

    function initLiveClocks() {
      var cEt = document.getElementById('clock-et'), dEt = document.getElementById('date-et'),
          cPt = document.getElementById('clock-pt'), dPt = document.getElementById('date-pt'),
          cBst = document.getElementById('clock-bst'), dBst = document.getElementById('date-bst'),
          badge = document.getElementById('tz-overlap-badge');
      if (!cEt || !cPt || !cBst) return;
      function fmt(d, tz) {
        try {
          return {
            time: new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(d),
            date: new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }).format(d),
            hour24: parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', hour12: false }).format(d), 10) || 12
          };
        } catch (e) { return { time: d.toLocaleTimeString(), date: d.toDateString(), hour24: d.getHours() }; }
      }
      function tick() {
        var now = new Date(), et = fmt(now, 'America/New_York'), pt = fmt(now, 'America/Los_Angeles'), bst = fmt(now, 'Asia/Dhaka');
        cEt.textContent = et.time; if (dEt) dEt.textContent = et.date;
        cPt.textContent = pt.time; if (dPt) dPt.textContent = pt.date;
        cBst.textContent = bst.time; if (dBst) dBst.textContent = bst.date;
        if (badge) {
          var active = (et.hour24 >= 7 && et.hour24 <= 16);
          badge.textContent = active ? 'Live US Overlap Active' : 'Async Ready • Replies Fast';
          badge.classList.toggle('async', !active);
        }
      }
      tick(); setInterval(tick, 1000);
    }

    function initExpertiseFilter() {
      var tabsWrap = document.getElementById('expertise-filter-tabs'), grid = document.getElementById('skills-grid');
      if (!tabsWrap || !grid) return;
      var tabs = tabsWrap.querySelectorAll('.filter-tab'), cards = grid.querySelectorAll('.skill-card');
      tabsWrap.addEventListener('click', function (e) {
        var tab = e.target.closest('.filter-tab'); if (!tab) return;
        var f = tab.getAttribute('data-filter');
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle('active', tabs[i] === tab);
        for (var j = 0; j < cards.length; j++) cards[j].classList.toggle('hidden', f !== 'all' && cards[j].getAttribute('data-category') !== f);
      });
    }

    function initExperienceTimeline() {
      var tl = document.getElementById('experience-timeline'), toggleAll = document.getElementById('toggle-all-exp');
      if (!tl) return;
      var cards = tl.querySelectorAll('.exp-card');
      function sync() {
        if (!toggleAll) return;
        var all = true;
        for (var i = 0; i < cards.length; i++) if (!cards[i].classList.contains('expanded')) { all = false; break; }
        toggleAll.textContent = all ? 'Collapse All Roles' : 'Expand All Roles';
      }
      tl.addEventListener('click', function (e) {
        var tr = e.target.closest('.exp-trigger'); if (!tr) return;
        var card = tr.closest('.exp-card'); if (!card) return;
        tr.setAttribute('aria-expanded', card.classList.toggle('expanded') ? 'true' : 'false'); sync();
      });
      if (toggleAll) {
        toggleAll.addEventListener('click', function () {
          var expand = toggleAll.textContent.indexOf('Expand') !== -1;
          for (var i = 0; i < cards.length; i++) {
            cards[i].classList.toggle('expanded', expand);
            var t = cards[i].querySelector('.exp-trigger');
            if (t) t.setAttribute('aria-expanded', expand ? 'true' : 'false');
          }
          sync();
        });
      }
      sync();
    }

    function initCaseStudies() {
      var grid = document.getElementById('cases-grid'); if (!grid) return;
      grid.addEventListener('click', function (e) {
        var tr = e.target.closest('.js-open-case, .case-card'); if (!tr) return;
        var item = CASE_STUDIES[parseInt(tr.getAttribute('data-case-id'), 10)]; if (!item) return;
        document.getElementById('case-modal-tag').textContent = item.tag;
        document.getElementById('case-modal-title').textContent = item.title;
        document.getElementById('case-modal-challenge').textContent = item.challenge;
        document.getElementById('case-modal-solution').textContent = item.solution;
        var impEl = document.getElementById('case-modal-impact'); impEl.innerHTML = '';
        for (var i = 0; i < item.impact.length; i++) { var li = document.createElement('li'); li.textContent = item.impact[i]; li.style.marginBottom = '6px'; impEl.appendChild(li); }
        var techEl = document.getElementById('case-modal-tech'); techEl.innerHTML = '';
        for (var j = 0; j < item.tech.length; j++) { var sp = document.createElement('span'); sp.className = 'tag'; sp.textContent = item.tech[j]; techEl.appendChild(sp); }
        document.getElementById('case-modal-wa').href = 'https://wa.me/' + EMAIL_CONFIG.whatsappNumber + '?text=' + encodeURIComponent('Hi S M Jobaer Alam, I read your case study "' + item.title + '" on www.jobaeralam.com and would like to discuss a similar project.');
        openModal('case-modal');
      });
    }

    function initFreeToolsHub() {
      var showcaseWrap = document.getElementById('tools-showcase-wrap'),
          toolsGrid = document.getElementById('tools-grid'),
          dropdownPanel = document.getElementById('tools-dropdown-panel'),
          dropdownGrid = document.getElementById('tools-dropdown-grid'),
          dropdownBar = document.getElementById('tools-dropdown-bar'),
          dropdownToggle = document.getElementById('tools-dropdown-toggle'),
          dropdownLabel = document.getElementById('tools-dropdown-label'),
          filterWrap = document.getElementById('tools-filter-tabs'),
          customReqBtn = document.getElementById('tools-request-custom-btn');
      if (!toolsGrid) return;
      var activeToolObj = null;
      var currentCategory = 'all';
      var isDropdownExpanded = false;
      var lastColumnCount = 0;

      function getVisibleRowCapacity() {
        var w = window.innerWidth || document.documentElement.clientWidth || 1200;
        if (w >= 1080) return 3;
        if (w >= 768) return 2;
        return 1;
      }

      function findToolById(id) {
        for (var i = 0; i < FREE_TOOLS_CATALOG.length; i++) if (FREE_TOOLS_CATALOG[i].id === id) return FREE_TOOLS_CATALOG[i];
        return null;
      }

      function triggerDirectZipDownload(url, fileName) {
        var a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', fileName || '');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      function handleToolDownload(tool) {
        if (!tool) return;
        if (tool.isLiveFile && tool.downloadUrl) {
          var resolvedUrl = tool.downloadUrl;
          if ((window.location.protocol === 'http:' || window.location.protocol === 'https:') && resolvedUrl.indexOf('http') !== 0 && resolvedUrl.charAt(0) !== '/') {
            resolvedUrl = '/' + resolvedUrl;
          }
          if (window.location.protocol === 'file:') {
            triggerDirectZipDownload(resolvedUrl, tool.fileName);
            showToast('Downloading ' + tool.fileName + '...');
            return;
          }
          showToast('Preparing download: ' + tool.fileName + '...');
          fetch(resolvedUrl, { method: 'HEAD', cache: 'no-store' }).then(function (res) {
            if (res.ok) {
              triggerDirectZipDownload(resolvedUrl, tool.fileName);
              showToast('Downloading ' + tool.fileName + ' (' + tool.version + ')');
            } else {
              showToast('File not uploaded yet: add ' + tool.downloadUrl + ' to your GitHub repo.');
            }
          }).catch(function () {
            triggerDirectZipDownload(resolvedUrl, tool.fileName);
            showToast('Starting free download: ' + tool.fileName);
          });
        }
      }

      function prefillCustomToolInquiry(toolName) {
        closeModal('tool-modal');
        var cType = document.getElementById('contact-type'), cDetails = document.getElementById('contact-details');
        if (cType) { cType.value = 'Microsoft 365 Consulting'; refreshContactSuggestions(); }
        if (cDetails) {
          cDetails.value = toolName
            ? 'Hi S M Jobaer Alam,\n\nI downloaded "' + toolName + '" from www.jobaeralam.com and would like to discuss a custom version or enterprise deployment for our organization.'
            : 'Hi S M Jobaer Alam,\n\nI visited your Free Tools & Software section on www.jobaeralam.com and would like to commission a custom IT automation tool / PowerShell module.';
        }
        smoothScrollToElement(document.getElementById('contact'));
        showToast('Custom tool inquiry loaded into Contact Form');
      }

      function openToolModal(tool) {
        if (!tool) return;
        activeToolObj = tool;
        document.getElementById('tool-modal-cat').textContent = tool.categoryLabel;
        document.getElementById('tool-modal-ver').textContent = tool.version;
        document.getElementById('tool-modal-title').textContent = tool.name;
        document.getElementById('tool-modal-desc').textContent = tool.shortDesc;
        document.getElementById('tool-modal-reqs').textContent = tool.requirements + ' • ' + tool.size + ' • ' + tool.license;
        document.getElementById('tool-modal-usage').textContent = tool.usage;
        document.getElementById('tool-modal-sha').textContent = tool.sha256;
        var featEl = document.getElementById('tool-modal-features'); featEl.innerHTML = '';
        for (var i = 0; i < tool.features.length; i++) { var li = document.createElement('li'); li.textContent = tool.features[i]; li.style.marginBottom = '6px'; featEl.appendChild(li); }
        openModal('tool-modal');
      }

      function buildToolCardElement(t) {
        var card = document.createElement('article');
        card.className = 'card tool-card';
        card.innerHTML = '<div><div class="tool-top"><span class="case-badge">' + t.categoryLabel + '</span><div class="tool-badges"><span class="tool-free-pill">FREE</span><span class="tool-ver-pill">' + t.version + '</span></div></div><h3 class="tool-title">' + t.name + '</h3><p class="tool-desc">' + t.shortDesc + '</p><div class="tool-meta-bar"><span><strong>Size:</strong> ' + t.size + '</span><span><strong>License:</strong> ' + t.license + '</span></div></div><div class="tool-actions"><button type="button" class="btn btn-emerald btn-sm btn-dl js-tool-download" data-tool-id="' + t.id + '"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Download Free</span></button><button type="button" class="btn btn-secondary btn-sm js-tool-details" data-tool-id="' + t.id + '">Details</button><button type="button" class="btn btn-subtle btn-sm js-tool-sha" data-tool-id="' + t.id + '" title="Copy SHA-256 Checksum">SHA-256</button></div>';
        return card;
      }

      function syncDropdownUI(extraCount) {
        if (!dropdownBar || !dropdownPanel || !dropdownToggle || !dropdownLabel) return;
        if (extraCount <= 0) {
          dropdownBar.style.display = 'none';
          dropdownPanel.classList.remove('open');
          dropdownPanel.setAttribute('aria-hidden', 'true');
          dropdownToggle.setAttribute('aria-expanded', 'false');
          return;
        }
        dropdownBar.style.display = 'flex';
        dropdownPanel.classList.toggle('open', isDropdownExpanded);
        dropdownPanel.setAttribute('aria-hidden', isDropdownExpanded ? 'false' : 'true');
        dropdownToggle.setAttribute('aria-expanded', isDropdownExpanded ? 'true' : 'false');
        dropdownLabel.textContent = isDropdownExpanded
          ? 'Show Fewer Tools & Software'
          : 'Show More Tools & Software (+' + extraCount + ' more)';
      }

      function renderTools(cat) {
        currentCategory = cat || 'all';
        var filtered = [];
        for (var i = 0; i < FREE_TOOLS_CATALOG.length; i++) {
          if (currentCategory === 'all' || FREE_TOOLS_CATALOG[i].category === currentCategory) {
            filtered.push(FREE_TOOLS_CATALOG[i]);
          }
        }
        var firstRowLimit = getVisibleRowCapacity();
        lastColumnCount = firstRowLimit;
        toolsGrid.innerHTML = '';
        if (dropdownGrid) dropdownGrid.innerHTML = '';

        for (var j = 0; j < filtered.length; j++) {
          var cardEl = buildToolCardElement(filtered[j]);
          if (j < firstRowLimit || !dropdownGrid) {
            toolsGrid.appendChild(cardEl);
          } else {
            dropdownGrid.appendChild(cardEl);
          }
        }
        var extraCount = Math.max(0, filtered.length - firstRowLimit);
        syncDropdownUI(extraCount);
      }

      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function () {
          isDropdownExpanded = !isDropdownExpanded;
          var extraCount = dropdownGrid ? dropdownGrid.children.length : 0;
          syncDropdownUI(extraCount);
          if (!isDropdownExpanded) {
            smoothScrollToElement(document.getElementById('tools'));
          }
        });
      }

      if (filterWrap) {
        filterWrap.addEventListener('click', function (e) {
          var tab = e.target.closest('.filter-tab'); if (!tab) return;
          var all = filterWrap.querySelectorAll('.filter-tab');
          for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === tab);
          isDropdownExpanded = false;
          renderTools(tab.getAttribute('data-tool-filter') || 'all');
        });
      }

      var clickContainer = showcaseWrap || toolsGrid;
      clickContainer.addEventListener('click', function (e) {
        var dl = e.target.closest('.js-tool-download'); if (dl) { handleToolDownload(findToolById(dl.getAttribute('data-tool-id'))); return; }
        var det = e.target.closest('.js-tool-details'); if (det) { openToolModal(findToolById(det.getAttribute('data-tool-id'))); return; }
        var sha = e.target.closest('.js-tool-sha'); if (sha) { var t = findToolById(sha.getAttribute('data-tool-id')); if (t) copyToClipboard(t.sha256, 'Copied SHA-256 for ' + t.name); }
      });

      window.addEventListener('resize', function () {
        var nextCols = getVisibleRowCapacity();
        if (nextCols !== lastColumnCount) {
          renderTools(currentCategory);
        }
      });

      var toolModalDlBtn = document.getElementById('tool-modal-download-btn');
      var toolModalCopyShaBtn = document.getElementById('tool-modal-copy-sha');
      var toolModalCustomBtn = document.getElementById('tool-modal-custom-btn');
      if (toolModalDlBtn) toolModalDlBtn.addEventListener('click', function () { handleToolDownload(activeToolObj); });
      if (toolModalCopyShaBtn) toolModalCopyShaBtn.addEventListener('click', function () { if (activeToolObj) copyToClipboard(activeToolObj.sha256, 'Copied SHA-256 checksum!'); });
      if (toolModalCustomBtn) toolModalCustomBtn.addEventListener('click', function () { prefillCustomToolInquiry(activeToolObj ? activeToolObj.name : ''); });
      if (customReqBtn) customReqBtn.addEventListener('click', function () { prefillCustomToolInquiry(''); });
      renderTools('all');
    }

    function initContactForm() {
      var form = document.getElementById('contact-form'),
          cName = document.getElementById('contact-name'),
          cEmail = document.getElementById('contact-email'),
          cComp = document.getElementById('contact-company'),
          cType = document.getElementById('contact-type'),
          cDetails = document.getElementById('contact-details'),
          cBot = document.getElementById('contact-botcheck'),
          sLabel = document.getElementById('suggestions-label'),
          sCont = document.getElementById('suggestions-container'),
          sBtn = document.getElementById('contact-submit-btn'),
          sBanner = document.getElementById('contact-status-banner'),
          sTitle = document.getElementById('contact-status-title'),
          sMsg = document.getElementById('contact-status-msg'),
          dPanel = document.getElementById('contact-dispatch-panel');
      if (!form || !cType || !cDetails) return;

      function renderSuggestions() {
        var sel = cType.value;
        var cfg = INQUIRY_SUGGESTIONS[sel] || INQUIRY_SUGGESTIONS['US Full-Time Remote Job Opportunity'] || { placeholder: '', prompts: [] };
        if (sLabel) sLabel.textContent = 'Suggested Prompts — ' + sel;
        cDetails.placeholder = cfg.placeholder || '';
        if (!sCont) return;
        sCont.innerHTML = '';
        for (var i = 0; i < cfg.prompts.length; i++) {
          (function (p) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'suggestion-chip' + (p.featured ? ' featured' : '');
            chip.textContent = p.label;
            chip.addEventListener('click', function () {
              cDetails.value = p.text;
              cDetails.focus();
              var all = sCont.querySelectorAll('.suggestion-chip');
              for (var k = 0; k < all.length; k++) all[k].classList.remove('active');
              chip.classList.add('active');
              showToast('Inserted prompt into Project or Role Details');
            });
            sCont.appendChild(chip);
          })(cfg.prompts[i]);
        }
      }
      refreshContactSuggestions = renderSuggestions;
      cType.addEventListener('change', renderSuggestions);
      renderSuggestions();

      function getPayload() {
        var name = cName.value.trim(), email = cEmail.value.trim(), company = cComp.value.trim(), type = cType.value, details = cDetails.value.trim();
        return {
          name: name, email: email, company: company, type: type, details: details,
          subject: '[www.jobaeralam.com] ' + type + (name ? ' — ' + name : ''),
          body: ['Hello S M Jobaer Alam,', '', 'Inquiry Type: ' + type, 'Name: ' + (name || 'Not provided'), 'Email: ' + (email || 'Not provided'), 'Company / Platform: ' + (company || 'Not provided'), '', 'Project / Role Details:', details || '(Please add project or role details)', '', 'Sent via www.jobaeralam.com'].join('\n')
        };
      }
      function showStatus(k, t, m, d) { sBanner.className = 'status-banner show status-' + k; sTitle.textContent = t; sMsg.textContent = m; dPanel.classList.toggle('show', !!d); }
      function openOutlook(p) { window.open(EMAIL_CONFIG.outlookWebCompose + '?to=' + encodeURIComponent(EMAIL_CONFIG.recipientEmail) + '&subject=' + encodeURIComponent(p.subject) + '&body=' + encodeURIComponent(p.body), '_blank', 'noopener,noreferrer'); }
      function openGmail(p) { window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(EMAIL_CONFIG.recipientEmail) + '&su=' + encodeURIComponent(p.subject) + '&body=' + encodeURIComponent(p.body), '_blank', 'noopener,noreferrer'); }
      function openMailto(p) { window.location.href = 'mailto:' + EMAIL_CONFIG.recipientEmail + '?subject=' + encodeURIComponent(p.subject) + '&body=' + encodeURIComponent(p.body); }
      function openWa(p) { window.open('https://wa.me/' + EMAIL_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(p.body), '_blank', 'noopener,noreferrer'); }

      form.addEventListener('submit', function (e) {
        e.preventDefault(); if (cBot && cBot.checked) return;
        var p = getPayload();
        if (!p.name) { showStatus('warning', 'Missing Name', 'Please enter your full name before sending.', false); cName.focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) { showStatus('warning', 'Valid Email Required', 'Please enter a valid email address so S M Jobaer Alam can reply directly.', false); cEmail.focus(); return; }
        if (!p.details) { showStatus('warning', 'Missing Details', 'Please enter your project or role details (or click a Suggested Prompt above).', false); cDetails.focus(); return; }
        if (window.location.protocol === 'file:' || !navigator.onLine) { showStatus('info', 'Local Preview / Offline Mode Detected', 'Direct Web3Forms API delivery activates automatically when hosted on https://www.jobaeralam.com. Use any pre-filled option below to send immediately:', true); return; }
        sBtn.disabled = true; sBtn.textContent = 'Sending Inquiry...';
        fetch(EMAIL_CONFIG.web3formsEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ access_key: EMAIL_CONFIG.web3formsAccessKey, subject: p.subject, from_name: p.name + ' (www.jobaeralam.com)', replyto: p.email, name: p.name, email: p.email, company: p.company || 'Not specified', inquiry_type: p.type, message: p.details, botcheck: '' }) })
          .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
          .then(function (res) {
            if (res.ok && res.data && res.data.success) { showStatus('success', 'Inquiry Sent to hello@jobaeralam.com!', 'Thank you, ' + p.name + '. Your message has been delivered directly to S M Jobaer Alam’s Microsoft 365 inbox.', false); showToast('Inquiry delivered to hello@jobaeralam.com!'); form.reset(); renderSuggestions(); }
            else { showStatus('warning', 'Direct API Delivery Unavailable', 'Your inquiry is preserved and pre-filled below. Send it in one click via Outlook Web, Gmail, Desktop Mail, or WhatsApp:', true); }
          })
          .catch(function () { showStatus('warning', 'Network Blocked Automatic Delivery', 'Your inquiry is ready below. Send it directly using Outlook Web, Gmail Web, or WhatsApp:', true); })
          .finally(function () { sBtn.disabled = false; sBtn.textContent = 'Send via Email (hello@jobaeralam.com)'; });
      });

      document.getElementById('contact-send-wa').addEventListener('click', function () { openWa(getPayload()); });
      document.getElementById('quick-wa-btn').addEventListener('click', function () { openWa(getPayload()); });
      document.getElementById('quick-outlook-btn').addEventListener('click', function () { openOutlook(getPayload()); });
      document.getElementById('contact-copy-brief').addEventListener('click', function () { copyToClipboard(getPayload().body, 'Inquiry brief copied!'); });
      document.getElementById('dispatch-outlook').addEventListener('click', function () { openOutlook(getPayload()); });
      document.getElementById('dispatch-gmail').addEventListener('click', function () { openGmail(getPayload()); });
      document.getElementById('dispatch-mailto').addEventListener('click', function () { openMailto(getPayload()); });
      document.getElementById('dispatch-copy').addEventListener('click', function () { copyToClipboard(getPayload().body, 'Full email message copied!'); });
    }

    function initScopeBuilder() {
      var engW = document.getElementById('builder-engagement'), svcW = document.getElementById('builder-services'), timeW = document.getElementById('builder-timeline'), budW = document.getElementById('builder-budget'), prev = document.getElementById('builder-brief-preview');
      if (!prev) return;
      var st = { engagement: 'US Remote Full-Time', services: ['Microsoft 365 Consulting', 'Entra ID & Zero Trust'], timeline: 'Immediate / ASAP', budget: "Open / Let's Discuss" };
      function build() { return ['Hello S M Jobaer Alam,', '', 'I am reaching out via www.jobaeralam.com regarding the following engagement:', '• Engagement Type: ' + st.engagement, '• Focus Areas: ' + (st.services.length ? st.services.join(', ') : 'Microsoft 365 / Azure / Security Consulting'), '• Target Timeline: ' + st.timeline, '• Budget / Compensation: ' + st.budget, '', 'Please share your availability for a brief discovery call or technical interview.'].join('\n'); }
      function render() { prev.textContent = build(); }
      function bindSingle(wrap, attr, key) { if (!wrap) return; wrap.addEventListener('click', function (e) { var c = e.target.closest('.choice-chip'); if (!c) return; st[key] = c.getAttribute(attr) || st[key]; var all = wrap.querySelectorAll('.choice-chip'); for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === c); render(); }); }
      bindSingle(engW, 'data-eng', 'engagement'); bindSingle(timeW, 'data-timeline', 'timeline'); bindSingle(budW, 'data-budget', 'budget');
      if (svcW) svcW.addEventListener('click', function (e) { var c = e.target.closest('.choice-chip'); if (!c) return; var v = c.getAttribute('data-service'), idx = st.services.indexOf(v); if (idx > -1) { st.services.splice(idx, 1); c.classList.remove('active'); } else { st.services.push(v); c.classList.add('active'); } render(); });
      document.getElementById('builder-load-email').addEventListener('click', function () {
        var ct = document.getElementById('contact-type'), cd = document.getElementById('contact-details');
        if (ct) { ct.value = st.engagement.indexOf('Remote') !== -1 ? 'US Full-Time Remote Job Opportunity' : st.engagement.indexOf('On-Premises') !== -1 ? 'US On-Premises / Relocation Role' : st.services.indexOf('Microsoft 365 Consulting') !== -1 ? 'Microsoft 365 Consulting' : 'Freelance Project (Upwork / Fiverr / Direct)'; refreshContactSuggestions(); }
        if (cd) cd.value = build();
        smoothScrollToElement(document.getElementById('contact')); showToast('Scope brief loaded into Contact Form!');
      });
      document.getElementById('builder-send-wa').addEventListener('click', function () { window.open('https://wa.me/' + EMAIL_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(build()), '_blank', 'noopener,noreferrer'); });
      document.getElementById('builder-copy').addEventListener('click', function () { copyToClipboard(build(), 'Scope brief copied to clipboard!'); });
      var pBtns = document.querySelectorAll('.js-platform-prefill');
      for (var p = 0; p < pBtns.length; p++) pBtns[p].addEventListener('click', function () {
        var plat = this.getAttribute('data-platform') || '', inq = this.getAttribute('data-inquiry') || '';
        var cc = document.getElementById('contact-company'), ct = document.getElementById('contact-type');
        if (cc && plat) cc.value = plat; if (ct && inq) { ct.value = inq; refreshContactSuggestions(); }
        smoothScrollToElement(document.getElementById('contact')); showToast('Selected: ' + plat);
      });
      render();
    }

    function initFAQ() {
      var faq = document.getElementById('faq-accordion'); if (!faq) return;
      faq.addEventListener('click', function (e) { var tr = e.target.closest('.faq-trigger'); if (!tr) return; var item = tr.closest('.faq-item'); if (!item) return; tr.setAttribute('aria-expanded', item.classList.toggle('open') ? 'true' : 'false'); });
    }

    function initResumeHub() {
      document.addEventListener('click', function (e) { var tr = e.target.closest('.js-open-resume'); if (!tr) return; e.preventDefault(); openModal('resume-modal'); });
      document.getElementById('btn-download-html').addEventListener('click', function () {
        var area = document.getElementById('printable-resume-area'); if (!area) return;
        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>S M Jobaer Alam — Executive Resume (www.jobaeralam.com)</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#0F172A;background:#FFFFFF;margin:0;padding:28px;line-height:1.55;font-size:14px;}.ats-sheet{max-width:800px;margin:0 auto;}.ats-header{border-bottom:2px solid #0F172A;padding-bottom:12px;margin-bottom:16px;}.ats-name{margin:0;font-size:26px;font-weight:800;}.ats-headline{margin:4px 0 8px;font-size:13px;font-weight:700;color:#1D4ED8;text-transform:uppercase;letter-spacing:0.04em;}.ats-contact-line{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:12px;color:#334155;}.ats-section{margin-bottom:14px;}.ats-section h4{margin:0 0 6px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#1E3A8A;border-bottom:1px solid #CBD5E1;padding-bottom:3px;}.ats-section p{margin:0 0 6px;}.ats-section ul{margin:4px 0 0;padding-left:18px;}.ats-section li{margin-bottom:4px;}.ats-role-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;font-weight:700;margin-top:8px;}@media print{body{padding:0;}@page{size:auto;margin:12mm;}}</style></head><body>' + area.innerHTML + '</body></html>';
        if (triggerFileDownload('S_M_Jobaer_Alam_Resume.html', html, 'text/html;charset=utf-8')) showToast('Downloaded S_M_Jobaer_Alam_Resume.html');
      });
      document.getElementById('btn-download-txt').addEventListener('click', function () { if (triggerFileDownload('S_M_Jobaer_Alam_Resume_ATS.txt', ATS_PLAIN_TEXT_RESUME, 'text/plain;charset=utf-8')) showToast('Downloaded S_M_Jobaer_Alam_Resume_ATS.txt'); });
      document.getElementById('btn-print-pdf').addEventListener('click', function () { window.print(); });
      document.getElementById('btn-copy-resume').addEventListener('click', function () { copyToClipboard(ATS_PLAIN_TEXT_RESUME, 'Full ATS Resume text copied to clipboard!'); });
    }

    function initModals() {
      document.addEventListener('click', function (e) {
        var closeBtn = e.target.closest('.js-close-modal');
        if (closeBtn) { closeModal(closeBtn.getAttribute('data-modal')); return; }
        if (e.target.classList && e.target.classList.contains('modal-backdrop')) closeModal(e.target.id);
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllModals(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPortfolio);
  } else {
    bootPortfolio();
  }
})();
