/* =========================================================
   Bioprotech v2 — Shared Chrome (header, footer, lang, nav)
   ========================================================= */
(function () {
  const BASE = document.body.dataset.base || '.';
  const LANG_KEY = 'bp-lang';
  const currentLang = localStorage.getItem(LANG_KEY) || 'ko';
  document.documentElement.lang = currentLang;
  document.body.dataset.lang = currentLang;

  // --------- i18n dictionary (loaded async) ----------
  let DICT = null;
  const dictReady = fetch(BASE + '/assets/data/i18n.json')
    .then(r => r.json())
    .then(d => { DICT = d; applyI18n(); })
    .catch(() => { DICT = { ko: {}, en: {} }; });

  function t(key, fallback) {
    if (!DICT) return fallback || key;
    return (DICT[currentLang] && DICT[currentLang][key]) || fallback || key;
  }
  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      el.textContent = t(k, el.textContent);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.dataset.i18nHtml;
      const v = t(k, null);
      if (v) el.innerHTML = v;
    });
  }

  // --------- Mega-menu data ----------
  const MEGA_CATS = [
    {id:'esu',    name:{ko:'전기수술', en:'Electrosurgery',  es:'Electrocirugía'},       code:'ESU'},
    {id:'cardio', name:{ko:'심전도',   en:'Cardiology',      es:'Cardiología'},           code:'ECG'},
    {id:'neuro',  name:{ko:'신경진단', en:'Neurology',       es:'Neurología'},            code:'EEG · EMG'},
    {id:'pain',   name:{ko:'통증관리', en:'Pain Management', es:'Tratamiento del dolor'}, code:'TENS'},
  ];
  const MEGA_PRODS = [
    {id:'smoke-evacuator',        cat:'esu',    name:{ko:'Smoke Evacuator',             en:'Smoke Evacuator',             es:'Smoke Evacuator'}},
    {id:'telescopic-smoke-pencil',cat:'esu',    name:{ko:'Telescopic Smoke Pencil',     en:'Telescopic Smoke Pencil',     es:'Telescopic Smoke Pencil'}},
    {id:'economy-smoke-pencil',   cat:'esu',    name:{ko:'Economy Smoke Pencil',        en:'Economy Smoke Pencil',        es:'Economy Smoke Pencil'}},
    {id:'dual-extension-pencil',  cat:'esu',    name:{ko:'Dual Extension Smoke Pencil', en:'Dual Extension Smoke Pencil', es:'Dual Extension Smoke Pencil'}},
    {id:'surgical-pencil',        cat:'esu',    name:{ko:'Surgical Pencil',             en:'Surgical Pencil',             es:'Surgical Pencil'}},
    {id:'smoke-adapter',          cat:'esu',    name:{ko:'Smoke Adapter',               en:'Smoke Adapter',               es:'Smoke Adapter'}},
    {id:'laparoscopic',           cat:'esu',    name:{ko:'Laparoscopic',                en:'Laparoscopic',                es:'Laparoscopic'}},
    {id:'esu-plate',              cat:'esu',    name:{ko:'ESU Plate',                   en:'ESU Plate',                   es:'ESU Plate'}},
    {id:'ecg-electrode',          cat:'cardio', name:{ko:'ECG Electrode',               en:'ECG Electrode',               es:'ECG Electrode'}},
    {id:'tab-electrode',          cat:'cardio', name:{ko:'TAB Electrode',               en:'TAB Electrode',               es:'TAB Electrode'}},
    {id:'neonatal-electrode',     cat:'cardio', name:{ko:'Neonatal Electrode',          en:'Neonatal Electrode',          es:'Neonatal Electrode'}},
    {id:'spo2-sensor',            cat:'cardio', name:{ko:'SpO₂ Sensor',                en:'SpO₂ Sensor',                 es:'SpO₂ Sensor'}},
    {id:'emg-needle',             cat:'neuro',  name:{ko:'EMG Needle & Electrode',     en:'EMG Needle & Electrode',      es:'EMG Needle & Electrode'}},
    {id:'eeg-cup',                cat:'neuro',  name:{ko:'EEG Cup Electrode',          en:'EEG Cup Electrode',           es:'EEG Cup Electrode'}},
    {id:'surface-electrode',      cat:'neuro',  name:{ko:'Surface Electrode',          en:'Surface Electrode',           es:'Surface Electrode'}},
    {id:'ionm-needle',            cat:'neuro',  name:{ko:'IONM Needle',                en:'IONM Needle',                 es:'IONM Needle'}},
    {id:'neuro-cable',            cat:'neuro',  name:{ko:'Neurology Cable',            en:'Neurology Cable',             es:'Neurology Cable'}},
    {id:'tens-electrode',         cat:'pain',   name:{ko:'TENS Electrode',             en:'TENS Electrode',              es:'TENS Electrode'}},
    {id:'tens-unit',              cat:'pain',   name:{ko:'TENS Unit',                  en:'TENS Unit',                   es:'TENS Unit'}},
    {id:'ems-unit',               cat:'pain',   name:{ko:'EMS Unit',                   en:'EMS Unit',                    es:'EMS Unit'}},
    {id:'if-unit',                cat:'pain',   name:{ko:'IF Unit',                    en:'IF Unit',                     es:'IF Unit'}},
  ];

  // --------- Header HTML ----------
  function headerHTML() {
    const active = document.body.dataset.nav || '';
    const isHome = document.body.dataset.page === 'home';
    const brandHref = BASE + '/index.html';
    const NAV_BY_LANG = {
      ko: { products:'제품',       about:'회사소개', news:'뉴스',     downloads:'자료실',  support:'고객지원', contact:'문의' },
      en: { products:'Products',   about:'About',    news:'News',     downloads:'Resources', support:'Support',  contact:'Contact' },
      es: { products:'Productos',  about:'Empresa',  news:'Noticias', downloads:'Recursos',  support:'Soporte',  contact:'Contacto' },
    };
    const NAV_LABELS = NAV_BY_LANG[currentLang] || NAV_BY_LANG.ko;
    const items = [
      ['products', BASE + '/products/index.html', NAV_LABELS.products],
      ['about',    BASE + '/company/about.html',  NAV_LABELS.about],
      ['news',     BASE + '/news/index.html',     NAV_LABELS.news],
      ['downloads',BASE + '/downloads/index.html',NAV_LABELS.downloads],
      ['support',  BASE + '/support/faq.html',    NAV_LABELS.support],
      ['contact',  BASE + '/support/contact.html',NAV_LABELS.contact],
    ];
    const VAL = {ko:'전체 제품 보기', en:'View All Products', es:'Ver todos los productos'};
    const megaCols = MEGA_CATS.map(cat => {
      const prods = MEGA_PRODS.filter(p => p.cat === cat.id);
      return `<div class="mega-col">
        <a class="mega-cat" href="${BASE}/products/category.html?cat=${cat.id}">
          <span class="mega-cat-ko">${cat.name[currentLang]}</span>
          <span class="mega-cat-code">${cat.code}</span>
        </a>
        <div class="mega-items">${prods.map(p =>
          `<a class="mega-item" href="${BASE}/products/detail.html?id=${p.id}">${p.name[currentLang]}</a>`
        ).join('')}</div>
      </div>`;
    }).join('');

    const nav = items.map(([id, href, label]) => {
      if (id === 'products') {
        return `<div class="nav-has-mega${active === id ? ' active' : ''}" id="nav-prod-wrap">
          <button type="button" class="nav-mega-btn${active === id ? ' active' : ''}" id="nav-prod-btn" aria-expanded="false" aria-haspopup="true">${label}</button>
          <div class="nav-mega" id="nav-mega" aria-hidden="true">
            <div class="mega-wrap">
              <div class="mega-inner">${megaCols}</div>
              <div class="mega-foot"><a href="${BASE}/products/index.html">${VAL[currentLang] || VAL.en} →</a></div>
            </div>
          </div>
        </div>`;
      }
      return `<a href="${href}" class="${active === id ? 'active' : ''}">${label}</a>`;
    }).join('');

    return `
    <header class="bp-header ${isHome ? '' : 'solid'}" id="bp-header">
      <a href="${brandHref}" class="brand">
        <img class="brand-logo" src="${BASE}/assets/img/bioprotech-logo.png" alt="Bioprotech" />
        <span class="wordmark">Bioprotech</span>
      </a>
      <nav class="bp-nav" id="bp-nav">${nav}</nav>
      <div class="bp-header-cta">
        <div class="bp-lang-toggle" role="group" aria-label="Language">
          <button type="button" data-lang="ko" class="${currentLang==='ko'?'active':''}">KO</button>
          <button type="button" data-lang="en" class="${currentLang==='en'?'active':''}">EN</button>
          <button type="button" data-lang="es" class="${currentLang==='es'?'active':''}">ES</button>
        </div>
        <a href="${BASE}/support/contact.html" class="pill">${({ko:'견적 문의',en:'Get a Quote',es:'Solicitar presupuesto'})[currentLang]||'견적 문의'}</a>
        <button type="button" class="bp-burger" id="bp-burger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;
  }

  // --------- Footer HTML ----------
  function footerHTML() {
    const FOOT_BY_LANG = {
      en: {
        prod: 'Products', comp: 'Company', sup: 'Support',
        a1: 'Electrosurgery', a2: 'ECG Electrodes', a3: 'Neurology', a4: 'TENS / Pain',
        b1: 'About', b2: 'History', b3: 'Global', b4: 'R&D',
        c1: 'Inquiry', c2: 'FAQ', c3: 'Downloads', c4: 'Quality',
        terms: 'Terms', privacy: 'Privacy Policy',
        company: 'Bioprotech | CEO',
        reg: 'Business Reg. No.: 108-81-22350',
        addr: '(26365) 151-3 Donghwagongdan-ro, Munmak-eup, Wonju-si, Gangwon-do',
        tel: 'Tel 033-735-7720 · Fax 033-735-7736',
        copy: '© 2026 Bioprotech Co., Ltd. All rights reserved.'
      },
      es: {
        prod: 'Productos', comp: 'Empresa', sup: 'Soporte',
        a1: 'Electrocirugía', a2: 'Electrodos ECG', a3: 'Neurología', a4: 'TENS / Dolor',
        b1: 'Empresa', b2: 'Historia', b3: 'Global', b4: 'I+D',
        c1: 'Consultas', c2: 'Preguntas frecuentes', c3: 'Descargas', c4: 'Calidad',
        terms: 'Términos', privacy: 'Política de privacidad',
        company: 'Bioprotech | Director General',
        reg: 'Núm. de registro mercantil: 108-81-22350',
        addr: '(26365) 151-3 Donghwagongdan-ro, Munmak-eup, Wonju-si, Gangwon-do, Corea',
        tel: 'Tel 033-735-7720 · Fax 033-735-7736',
        copy: '© 2026 Bioprotech Co., Ltd. Todos los derechos reservados.'
      },
      ko: {
        prod: 'Products', comp: 'Company', sup: 'Support',
        a1: '전기수술', a2: '심전도 전극', a3: '신경진단', a4: '통증관리',
        b1: '회사소개', b2: '연혁', b3: '글로벌', b4: '연구개발',
        c1: '문의하기', c2: 'FAQ', c3: '자료실', c4: '품질·인증',
        terms: '이용약관', privacy: '개인정보처리방침',
        company: '㈜바이오프로테크 | 대표이사',
        reg: '사업자등록번호 : 108-81-22350',
        addr: '(26365) 강원도 원주시 문막읍 동화공단로 151-3',
        tel: '전화 033-735-7720 · 팩스 033-735-7736',
        copy: 'Copyright © 2026 ㈜바이오프로테크 All rights reserved.'
      }
    };
    const L = FOOT_BY_LANG[currentLang] || FOOT_BY_LANG.ko;
    return `
    <footer>
      <div class="foot-grid">
        <div class="foot-brand">
          <div class="mark"><span class="mark-sq">BP</span>Bio protech</div>
          <p class="foot-info">
            ${L.company}<br/>
            ${L.reg}<br/>
            ${L.addr}<br/>
            ${L.tel}<br/>
            info@protechsite.com
          </p>
        </div>
        <div class="foot-col">
          <h5>${L.prod}</h5>
          <a href="${BASE}/products/category.html?cat=esu">${L.a1}</a>
          <a href="${BASE}/products/category.html?cat=cardio">${L.a2}</a>
          <a href="${BASE}/products/category.html?cat=neuro">${L.a3}</a>
          <a href="${BASE}/products/category.html?cat=pain">${L.a4}</a>
        </div>
        <div class="foot-col">
          <h5>${L.comp}</h5>
          <a href="${BASE}/company/about.html">${L.b1}</a>
          <a href="${BASE}/company/history.html">${L.b2}</a>
          <a href="${BASE}/company/global.html">${L.b3}</a>
          <a href="${BASE}/company/rnd.html">${L.b4}</a>
        </div>
        <div class="foot-col">
          <h5>${L.sup}</h5>
          <a href="${BASE}/support/contact.html">${L.c1}</a>
          <a href="${BASE}/support/faq.html">${L.c2}</a>
          <a href="${BASE}/downloads/index.html">${L.c3}</a>
          <a href="${BASE}/company/quality.html">${L.c4}</a>
        </div>
      </div>
      <div class="foot-bottom">
        <div>${L.copy}</div>
        <div class="policy">
          <a href="${BASE}/legal/terms.html">${L.terms}</a>
          <a href="${BASE}/legal/privacy.html"><strong>${L.privacy}</strong></a>
        </div>
      </div>
    </footer>

    <div class="floating">
      <a href="tel:0337357720" aria-label="전화 문의" title="전화 문의">
        <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.01l-2.2 2.21z"/></svg>
      </a>
      <a href="#top" aria-label="맨 위로" title="맨 위로">
        <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
      </a>
    </div>`;
  }

  // --------- Inject ----------
  function inject() {
    const headerSlot = document.getElementById('bp-header-slot');
    const footerSlot = document.getElementById('bp-footer-slot');
    if (headerSlot) headerSlot.outerHTML = headerHTML();
    if (footerSlot) footerSlot.outerHTML = footerHTML();

    const header = document.getElementById('bp-header');
    const burger = document.getElementById('bp-burger');
    const nav = document.getElementById('bp-nav');

    if (header && document.body.dataset.page === 'home') {
      const onScroll = () => {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (burger && nav) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
      });
    }

    // ----- 제품 메가메뉴 토글 -----
    const prodBtn  = document.getElementById('nav-prod-btn');
    const prodWrap = document.getElementById('nav-prod-wrap');
    const megaEl   = document.getElementById('nav-mega');
    if (prodBtn && prodWrap) {
      prodBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opening = !prodWrap.classList.contains('open');
        prodWrap.classList.toggle('open', opening);
        prodBtn.setAttribute('aria-expanded', String(opening));
        if (megaEl) megaEl.setAttribute('aria-hidden', String(!opening));
      });
      document.addEventListener('click', (e) => {
        if (prodWrap.classList.contains('open') && !prodWrap.contains(e.target)) {
          prodWrap.classList.remove('open');
          prodBtn.setAttribute('aria-expanded', 'false');
          if (megaEl) megaEl.setAttribute('aria-hidden', 'true');
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          prodWrap.classList.remove('open');
          prodBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.querySelectorAll('.bp-lang-toggle button').forEach(b => {
      b.addEventListener('click', () => {
        const newLang = b.dataset.lang;
        if (newLang !== currentLang) {
          localStorage.setItem(LANG_KEY, newLang);
          location.reload();
        }
      });
    });

    consentBanner();
  }

  // --------- Cookie consent + GA4 (동의 후에만 로드) — OPS-01·OPS-08 ----------
  const GA_ID = 'G-0W0ZD2J7G3';
  const CONSENT_KEY = 'bp-cookie-consent';

  function loadGA() {
    if (window.__bpGaLoaded) return;
    window.__bpGaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function consentBanner() {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === 'granted') { loadGA(); return; }
    if (saved === 'denied') return;
    const TXT = {
      ko: { msg: '이 사이트는 서비스 개선을 위한 방문 통계 쿠키(Google Analytics)를 사용합니다. 동의한 경우에만 수집을 시작합니다.', ok: '동의', no: '거부', more: '개인정보처리방침' },
      en: { msg: 'This site uses analytics cookies (Google Analytics) to improve our service. Collection starts only with your consent.', ok: 'Accept', no: 'Decline', more: 'Privacy Policy' },
      es: { msg: 'Este sitio utiliza cookies de análisis (Google Analytics) para mejorar el servicio. La recopilación comienza solo con su consentimiento.', ok: 'Aceptar', no: 'Rechazar', more: 'Política de privacidad' },
    };
    const L = TXT[currentLang] || TXT.ko;
    const el = document.createElement('div');
    el.className = 'bp-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML = `
      <p>${L.msg} <a href="${BASE}/legal/privacy.html">${L.more}</a></p>
      <div class="bp-cookie-actions">
        <button type="button" class="bp-cookie-accept">${L.ok}</button>
        <button type="button" class="bp-cookie-decline">${L.no}</button>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('.bp-cookie-accept').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'granted');
      el.remove();
      loadGA();
    });
    el.querySelector('.bp-cookie-decline').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'denied');
      el.remove();
    });
  }

  // --------- Helper: query params ----------
  window.bpQuery = function (key) {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };
  window.bpLang = function () { return currentLang; };
  window.bpBase = function () { return BASE; };
  window.bpT = t;
  window.bpDictReady = dictReady;

  // --------- DOM ready ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
