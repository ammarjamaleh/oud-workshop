/* ═══════════════════════════════════════════════════════════════
   app.js — Ibrahim Oud Atelier
   All site logic: language, rendering, modals, compare, audio,
   filters, form, scroll effects, toast, back-to-top
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let lang         = 'en';          // 'en' | 'ar'
let filterActive = 'all';         // 'all' | 'available' | 'sold' | 'samer' | 'alaa'
let compareList  = [];            // array of oud IDs (max 2)
let activeAudio  = null;          // currently playing HTMLAudioElement

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const t    = (obj) => obj[lang] ?? obj['en'];          // pick text by lang
const isAr = ()    => lang === 'ar';

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isAr()) {
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─────────────────────────────────────────────
   LANGUAGE TOGGLE
───────────────────────────────────────────── */
function setLang(newLang) {
  lang = newLang;
  document.body.classList.toggle('ar', lang === 'ar');
  document.body.classList.toggle('en', lang === 'en');
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  // Update toggle button label
  document.querySelectorAll('.btn-lang').forEach(b => {
    b.textContent = lang === 'en' ? 'العربية' : 'English';
  });

  // Re-render dynamic sections
  renderCollection();
  renderMakers();
  renderAudioSection();
  renderWoodGuide();
  renderTestimonials();
  renderSoldGallery();
  renderBlog();
  renderCompareBar();
}

document.querySelectorAll('.btn-lang').forEach(b => {
  b.addEventListener('click', () => setLang(lang === 'en' ? 'ar' : 'en'));
});

/* ─────────────────────────────────────────────
   NAVBAR SCROLL + HAMBURGER
───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

document.getElementById('btn-hamburger').addEventListener('click', function () {
  document.getElementById('nav-drawer').classList.toggle('open');
});
document.querySelectorAll('#nav-drawer a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-drawer').classList.remove('open'));
});

document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─────────────────────────────────────────────
   OUD SVG INLINE — reusable illustration
───────────────────────────────────────────── */
function oudSVG(size = 130) {
  const s  = size;
  const cx = s * 0.5;
  const u  = v => +(s * v).toFixed(2);                 // scale a unit value to pixels
  const gold = a => `rgba(200,168,75,${a})`;

  // Layout from top to bottom: pegbox -> neck -> bowl.
  // The neck stops exactly where the bowl begins, so the shapes no longer overlap.
  const nutY = 0.30, bowlTop = 0.66, bowlBottom = 1.58, bridgeY = 1.335, roseY = 0.99;
  const half = 0.37;                                   // half-width of the widest part of the bowl

  // Bowl: a pear shape that is wider at the bottom
  const bowl = `M ${u(0.5)} ${u(bowlTop)}
    C ${u(0.67)} ${u(bowlTop)} ${u(0.5 + half)} ${u(0.93)} ${u(0.5 + half)} ${u(1.17)}
    C ${u(0.5 + half)} ${u(1.42)} ${u(0.7)} ${u(bowlBottom)} ${u(0.5)} ${u(bowlBottom)}
    C ${u(0.3)} ${u(bowlBottom)} ${u(0.5 - half)} ${u(1.42)} ${u(0.5 - half)} ${u(1.17)}
    C ${u(0.5 - half)} ${u(0.93)} ${u(0.33)} ${u(bowlTop)} ${u(0.5)} ${u(bowlTop)} Z`;

  // Pegbox: slightly wider at the top, joined to the neck at the nut
  const pegbox = `M ${u(0.5 - 0.062)} ${u(nutY)}
    L ${u(0.5 - 0.085)} ${u(0.06)} Q ${u(0.5 - 0.085)} ${u(0.02)} ${u(0.5)} ${u(0.02)}
    Q ${u(0.5 + 0.085)} ${u(0.02)} ${u(0.5 + 0.085)} ${u(0.06)} L ${u(0.5 + 0.062)} ${u(nutY)} Z`;

  // Tuning pegs on both sides of the pegbox (6 on the left, 5 on the right = 11 strings)
  const pegs = [];
  for (let i = 0; i < 6; i++) pegs.push(`<circle cx="${u(0.5 - 0.112)}" cy="${u(0.06 + i * 0.042)}" r="${u(0.016)}" fill="${gold(0.55)}"/>`);
  for (let i = 0; i < 5; i++) pegs.push(`<circle cx="${u(0.5 + 0.112)}" cy="${u(0.081 + i * 0.042)}" r="${u(0.016)}" fill="${gold(0.55)}"/>`);

  // Strings fan out from the nut to the bridge
  const strings = [-2, -1, 0, 1, 2].map(i =>
    `<line x1="${u(0.5 + i * 0.02)}" y1="${u(nutY)}" x2="${u(0.5 + i * 0.05)}" y2="${u(bridgeY)}" stroke="${gold(0.3)}" stroke-width="0.6"/>`
  ).join("");

  return `<svg viewBox="0 0 ${s} ${Math.round(s * 1.625)}" fill="none" xmlns="http://www.w3.org/2000/svg" width="${s}">
    <path d="${bowl}" fill="${gold(0.1)}" stroke="${gold(0.55)}" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${u(roseY)}" r="${u(0.106)}" fill="none" stroke="${gold(0.45)}" stroke-width="0.9"/>
    <circle cx="${cx}" cy="${u(roseY)}" r="${u(0.138)}" fill="none" stroke="${gold(0.2)}" stroke-width="0.7" stroke-dasharray="3 2"/>
    <rect x="${u(0.5 - 0.06)}" y="${u(nutY)}" width="${u(0.12)}" height="${u(bowlTop - nutY)}" rx="${u(0.012)}" fill="${gold(0.18)}" stroke="${gold(0.45)}" stroke-width="1"/>
    <path d="${pegbox}" fill="${gold(0.12)}" stroke="${gold(0.45)}" stroke-width="1"/>
    <rect x="${u(0.5 - 0.066)}" y="${u(nutY - 0.008)}" width="${u(0.132)}" height="${u(0.016)}" rx="1" fill="${gold(0.5)}"/>
    ${pegs.join("\n    ")}
    ${strings}
    <rect x="${u(0.5 - 0.2)}" y="${u(bridgeY)}" width="${u(0.4)}" height="${u(0.028)}" rx="2" fill="${gold(0.4)}"/>
  </svg>`;
}

/* ─────────────────────────────────────────────
   RENDER: COLLECTION
───────────────────────────────────────────── */
function renderCollection() {
  const grid = document.getElementById('ouds-grid');
  if (!grid) return;

  grid.innerHTML = OUDS.map(oud => {
    const name    = isAr() ? oud.nameAr   : oud.nameEn;
    const type    = isAr() ? oud.typeAr   : oud.typeEn;
    const maker   = MAKERS[oud.maker];
    const makerNm = isAr() ? maker.nameAr : maker.nameEn;
    const woods   = isAr() ? oud.woods.ar : oud.woods.en;

    // Badge
    let badgeHtml = '';
    if (oud.status === 'sold') {
      badgeHtml = `<div class="card-badge card-badge--sold">${isAr() ? 'مُبَاع' : 'SOLD'}</div>`;
    } else if (oud.badge) {
      const bType = oud.badge.en.toLowerCase();
      badgeHtml = `<div class="card-badge card-badge--${bType}">${isAr() ? oud.badge.ar : oud.badge.en}</div>`;
    }

    // Sold overlay
    const soldOverlay = `<div class="card-sold-overlay"><div class="sold-stamp">${isAr() ? 'مُبَاع' : 'SOLD'}</div></div>`;

    // Wood preview (first 3 rows)
    const woodRows = woods.slice(0, 3).map(w =>
      `<div class="wood-row">
         <span class="wood-row-part">${w.part}</span>
         <span class="wood-row-wood">${w.wood}</span>
       </div>`
    ).join('');

    // Footer: price or sold destination
    let footerRight = '';
    if (oud.status === 'sold' && oud.soldTo) {
      footerRight = `<div class="card-sold-tag">
        <span style="font-size:1.4rem">${oud.soldTo.flag}</span>
        <span>${oud.soldTo.flag} ${isAr() ? oud.soldTo.countryAr : oud.soldTo.country}</span>
      </div>`;
    } else {
      footerRight = `<button class="btn-details" onclick="openModal(${oud.id}); event.stopPropagation()">
        ${isAr() ? 'التفاصيل' : 'Details'}
      </button>`;
    }

    // Compare checkbox (only for available)
    const compareHtml = oud.status !== 'sold' ? `
    <div class="card-compare-wrap">
      <input type="checkbox" class="card-compare-cb" id="cmp-${oud.id}"
        ${compareList.includes(oud.id) ? 'checked' : ''}
        onchange="toggleCompare(${oud.id}, this.checked, event)"
        onclick="event.stopPropagation()" />
      <label class="card-compare-label" for="cmp-${oud.id}"
        onclick="event.stopPropagation()">
        ${isAr() ? 'إضافة للمقارنة' : 'Add to compare'}
      </label>
    </div>` : '';

    // Hidden class for filter
    const hiddenClass = shouldHide(oud) ? ' hidden' : '';

    return `<div class="oud-card${hiddenClass}" data-id="${oud.id}" data-status="${oud.status}" data-maker="${oud.maker}"
        onclick="openModal(${oud.id})">
      <div class="card-image">
        ${oudSVG(130)}
        ${badgeHtml}
        ${soldOverlay}
        <button class="btn-audio ${oud.audioSrc ? '' : 'no-audio'}"
          onclick="event.stopPropagation(); playAudio(${oud.id})"
          title="${isAr() ? 'استمع للعود' : 'Listen to sample'}"
        >▶</button>
      </div>
      <div class="card-body">
        <div class="card-maker">${makerNm}</div>
        <h3 class="card-name ${isAr() ? 'card-name--ar' : ''}">${name}</h3>
        <p class="card-type">${type}</p>
        <div class="wood-preview">${woodRows}</div>
        <div class="card-foot">
          <div>
            <div class="card-price">${oud.price.toLocaleString()} <span style="font-size:0.85rem;color:var(--gold-dim)">${isAr() ? '$' : oud.currency}</span></div>
            ${oud.status === 'available'
              ? `<div class="card-price-note">${isAr() ? `تسليم خلال ${oud.deliveryWeeks} أسابيع` : `~${oud.deliveryWeeks} wk delivery`}</div>`
              : ''}
          </div>
          ${footerRight}
        </div>
        ${compareHtml}
      </div>
    </div>`;
  }).join('');
}

function shouldHide(oud) {
  if (filterActive === 'all')       return false;
  if (filterActive === 'available') return oud.status !== 'available';
  if (filterActive === 'sold')      return oud.status !== 'sold';
  if (filterActive === 'samer')     return oud.maker !== 'samer';
  if (filterActive === 'alaa')      return oud.maker !== 'alaa';
  return false;
}

/* Filter buttons */
document.addEventListener('click', e => {
  if (e.target.matches('.filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterActive = e.target.dataset.filter;
    renderCollection();
  }
});

/* ─────────────────────────────────────────────
   RENDER: MAKERS
───────────────────────────────────────────── */
function renderMakers() {
  const wrap = document.getElementById('makers-wrap');
  if (!wrap) return;
  wrap.innerHTML = ['samer', 'alaa'].map(key => {
    const m = MAKERS[key];
    return `<div class="maker-card">
      <div class="maker-initial">${m.initial}</div>
      <div class="maker-role">${isAr() ? m.titleAr : m.titleEn} · ${isAr() ? m.locationAr : m.locationEn}</div>
      <h3 class="maker-name ${isAr() ? 'maker-name--ar' : ''}">${isAr() ? m.nameAr : m.nameEn}</h3>
      <div class="maker-specialty">${isAr() ? m.specialtyAr : m.specialtyEn}</div>
      <p class="maker-bio">${isAr() ? m.bioAr : m.bioEn}</p>
      <div class="maker-stats">
        <div class="maker-stat">
          <span class="maker-stat-num">${m.oudsBuilt}+</span>
          <span class="maker-stat-label">${isAr() ? 'عود مصنوع' : 'Ouds Built'}</span>
        </div>
        <div class="maker-stat">
          <span class="maker-stat-num">${m.yearsActive}</span>
          <span class="maker-stat-label">${isAr() ? 'سنة خبرة' : 'Years Active'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   RENDER: AUDIO SECTION
───────────────────────────────────────────── */
function renderAudioSection() {
  const wrap = document.getElementById('audio-wrap');
  if (!wrap) return;
  wrap.innerHTML = OUDS.map(oud => {
    const name = isAr() ? oud.nameAr : oud.nameEn;
    const mName = isAr() ? MAKERS[oud.maker].nameAr : MAKERS[oud.maker].nameEn;
    return `<div class="audio-card">
      <div>
        <div class="audio-card-title ${isAr() ? 'audio-card-title--ar' : ''}">${name}</div>
        <div class="audio-card-meta">${mName}</div>
      </div>
      ${oud.audioSrc
        ? `<div class="audio-player" data-id="${oud.id}">
            <div class="audio-controls">
              <button class="btn-play" id="play-${oud.id}" onclick="playAudio(${oud.id})">▶</button>
              <input type="range" class="audio-progress" id="prog-${oud.id}" value="0" min="0" max="100" step="0.1" oninput="seekAudio(${oud.id}, this.value)"/>
              <span class="audio-time" id="time-${oud.id}">0:00</span>
            </div>
          </div>`
        : `<p class="audio-no-sample">${isAr() ? 'التسجيل الصوتي قريباً' : 'Audio sample coming soon'}</p>`
      }
    </div>`;
  }).join('');
}

/* Audio playback */
const audioElements = {};

function playAudio(id) {
  const oud = OUDS.find(o => o.id === id);
  if (!oud || !oud.audioSrc) {
    showToast(isAr() ? 'التسجيل الصوتي غير متوفر بعد' : 'No audio sample available yet');
    return;
  }
  // Stop current
  if (activeAudio && activeAudio !== audioElements[id]) {
    activeAudio.pause();
    const prevBtn = document.querySelector(`.btn-play.playing`);
    if (prevBtn) prevBtn.classList.remove('playing');
    const prevBtnId = activeAudio.dataset.oudId;
    const prevCardBtn = document.getElementById(`play-${prevBtnId}`);
    if (prevCardBtn) { prevCardBtn.textContent = '▶'; prevCardBtn.classList.remove('playing'); }
  }
  if (!audioElements[id]) {
    const a = new Audio(oud.audioSrc);
    a.dataset.oudId = id;
    a.addEventListener('timeupdate', () => updateProgress(id, a));
    a.addEventListener('ended', () => {
      document.getElementById(`play-${id}`)?.classList.remove('playing');
      document.querySelectorAll(`.btn-audio`).forEach(b => { if (b.dataset.id == id) b.textContent = '▶'; });
    });
    audioElements[id] = a;
  }
  const a = audioElements[id];
  if (a.paused) {
    a.play();
    activeAudio = a;
    const btn = document.getElementById(`play-${id}`);
    if (btn) { btn.textContent = '⏸'; btn.classList.add('playing'); }
  } else {
    a.pause();
    const btn = document.getElementById(`play-${id}`);
    if (btn) { btn.textContent = '▶'; btn.classList.remove('playing'); }
  }
}

function updateProgress(id, audio) {
  const prog = document.getElementById(`prog-${id}`);
  const time = document.getElementById(`time-${id}`);
  if (prog && audio.duration) {
    prog.value = (audio.currentTime / audio.duration) * 100;
  }
  if (time) {
    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    time.textContent = `${m}:${s}`;
  }
}

function seekAudio(id, val) {
  const a = audioElements[id];
  if (a && a.duration) {
    a.currentTime = (val / 100) * a.duration;
  }
}

/* ─────────────────────────────────────────────
   RENDER: WOOD GUIDE
───────────────────────────────────────────── */
function renderWoodGuide() {
  const wrap = document.getElementById('wood-guide-wrap');
  if (!wrap) return;
  wrap.innerHTML = WOODS.map(w => `
    <div class="wood-guide-cell">
      <div class="wg-icon">${w.icon}</div>
      <div class="wg-part ${isAr() ? 'wg-part--ar' : ''}">${isAr() ? w.partAr : w.partEn}</div>
      <p class="wg-desc">${isAr() ? w.descAr : w.descEn}</p>
      <div class="wg-options">
        ${w.options.map(o => `<span class="wg-chip">${o}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDER: TESTIMONIALS
───────────────────────────────────────────── */
function renderTestimonials() {
  const wrap = document.getElementById('testi-wrap');
  if (!wrap) return;
  wrap.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-quote ${isAr() ? 'testi-quote--ar' : ''}">${isAr() ? t.quoteAr : t.quoteEn}</p>
      <div class="testi-author">
        <div class="testi-name">${isAr() ? t.nameAr : t.nameEn}</div>
        <div class="testi-role">${isAr() ? t.roleAr : t.roleEn}</div>
        <div class="testi-city">${isAr() ? t.cityAr : t.cityEn}</div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDER: SOLD GALLERY
───────────────────────────────────────────── */
function renderSoldGallery() {
  const wrap = document.getElementById('sold-wrap');
  if (!wrap) return;
  const soldOuds = OUDS.filter(o => o.status === 'sold');
  wrap.innerHTML = soldOuds.map(oud => {
    const m = MAKERS[oud.maker];
    return `<div class="sold-card">
      <div class="sold-flag">${oud.soldTo?.flag || '🌍'}</div>
      <div class="sold-name ${isAr() ? 'sold-name--ar' : ''}">${isAr() ? oud.nameAr : oud.nameEn}</div>
      <div class="sold-maker">${isAr() ? m.nameAr : m.nameEn}</div>
      <div class="sold-dest">${oud.soldTo ? (isAr() ? `${oud.soldTo.city} · ${oud.soldTo.countryAr}` : `${oud.soldTo.city}, ${oud.soldTo.country}`) : ''}</div>
      <div class="sold-price">${oud.price.toLocaleString()} USD</div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   RENDER: BLOG
───────────────────────────────────────────── */
function renderBlog() {
  const wrap = document.getElementById('blog-wrap');
  if (!wrap) return;
  wrap.innerHTML = BLOG_POSTS.map(p => `
    <div class="blog-card">
      <div class="blog-meta">
        <span class="blog-cat">${isAr() ? p.category.ar : p.category.en}</span>
        <span>${formatDate(p.date)}</span>
        <span>${p.readMinutes} ${isAr() ? 'دقائق قراءة' : 'min read'}</span>
      </div>
      <h3 class="blog-title ${isAr() ? 'blog-title--ar' : ''}">${isAr() ? p.titleAr : p.titleEn}</h3>
      <p class="blog-excerpt">${isAr() ? p.excerptAr : p.excerptEn}</p>
      <a href="#" class="blog-read">${isAr() ? 'اقرأ المزيد ←' : 'Read more →'}</a>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   MODAL: OUD DETAIL
───────────────────────────────────────────── */
function openModal(id) {
  const oud   = OUDS.find(o => o.id === id);
  const maker = MAKERS[oud.maker];
  const woods = isAr() ? oud.woods.ar : oud.woods.en;
  const name  = isAr() ? oud.nameAr : oud.nameEn;
  const type  = isAr() ? oud.typeAr : oud.typeEn;
  const mName = isAr() ? maker.nameAr : maker.nameEn;

  const woodRows = woods.map(w =>
    `<tr><td>${w.part}</td><td>${w.wood}</td></tr>`
  ).join('');

  const deliveryNote = oud.status === 'available'
    ? `<div class="modal-delivery">${isAr() ? `وقت التسليم المتوقع: ${oud.deliveryWeeks} أسابيع` : `Estimated delivery: ~${oud.deliveryWeeks} weeks`}</div>`
    : `<div class="modal-delivery" style="color:var(--red)">${isAr() ? 'تم بيع هذا العود' : 'This oud has been sold'}</div>`;

  const ctaBtn = oud.status === 'available'
    ? `<a href="#contact" class="btn-primary" onclick="closeModal()"><span>${isAr() ? 'استفسر عن هذا العود' : 'Inquire About This Oud'}</span></a>
       <a href="#custom-order" class="btn-ghost" onclick="closeModal()">${isAr() ? 'طلب مخصص مشابه' : 'Order a similar custom oud'}</a>`
    : `<a href="#custom-order" class="btn-primary" onclick="closeModal()"><span>${isAr() ? 'اطلب عوداً مشابهاً' : 'Order a Similar Oud'}</span></a>`;

  document.getElementById('modal-body').innerHTML = `
    <div class="modal-maker">${mName}</div>
    <h2 class="modal-title ${isAr() ? 'modal-title--ar' : ''}">${name}</h2>
    <p class="modal-type">${type}</p>
    <table class="modal-wood-table">
      <thead><tr>
        <th>${isAr() ? 'الجزء' : 'Component'}</th>
        <th>${isAr() ? 'نوع الخشب' : 'Wood'}</th>
      </tr></thead>
      <tbody>${woodRows}</tbody>
    </table>
    <div class="modal-price">${oud.price.toLocaleString()}<small>${isAr() ? 'دولار أمريكي' : 'USD'}</small></div>
    ${deliveryNote}
    <div class="modal-actions">${ctaBtn}</div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

/* ─────────────────────────────────────────────
   COMPARE FEATURE
───────────────────────────────────────────── */
function toggleCompare(id, checked, event) {
  if (event) event.stopPropagation();
  if (checked) {
    if (compareList.length >= 2) {
      showToast(isAr() ? 'يمكنك مقارنة عودَين فقط في آنٍ واحد' : 'You can only compare 2 ouds at a time');
      // Uncheck the box
      const cb = document.getElementById(`cmp-${id}`);
      if (cb) cb.checked = false;
      return;
    }
    compareList.push(id);
  } else {
    compareList = compareList.filter(x => x !== id);
  }
  renderCompareBar();
}

function renderCompareBar() {
  const bar = document.getElementById('compare-bar');
  if (compareList.length === 0) { bar.classList.remove('visible'); return; }
  bar.classList.add('visible');

  const chips = compareList.map(id => {
    const oud  = OUDS.find(o => o.id === id);
    const name = isAr() ? oud.nameAr : oud.nameEn;
    return `<div class="compare-chip">
      <span>${name}</span>
      <button onclick="removeCompare(${id})">✕</button>
    </div>`;
  }).join('');

  document.getElementById('compare-chips').innerHTML = chips;

  const compareBtn = document.getElementById('btn-compare-now');
  compareBtn.textContent = isAr() ? 'قارن الآن' : 'Compare Now';
  compareBtn.disabled = compareList.length < 2;
  compareBtn.style.opacity = compareList.length < 2 ? '0.5' : '1';

  document.getElementById('btn-compare-clear').textContent = isAr() ? 'مسح' : 'Clear';
}

function removeCompare(id) {
  compareList = compareList.filter(x => x !== id);
  const cb = document.getElementById(`cmp-${id}`);
  if (cb) cb.checked = false;
  renderCompareBar();
}

document.getElementById('btn-compare-clear').addEventListener('click', () => {
  compareList = [];
  document.querySelectorAll('.card-compare-cb').forEach(cb => cb.checked = false);
  renderCompareBar();
});

document.getElementById('btn-compare-now').addEventListener('click', openCompareModal);

function openCompareModal() {
  if (compareList.length < 2) return;
  const [a, b]  = compareList.map(id => OUDS.find(o => o.id === id));
  const wa      = isAr() ? a.woods.ar : a.woods.en;
  const wb      = isAr() ? b.woods.ar : b.woods.en;
  const makerA  = isAr() ? MAKERS[a.maker].nameAr : MAKERS[a.maker].nameEn;
  const makerB  = isAr() ? MAKERS[b.maker].nameAr : MAKERS[b.maker].nameEn;
  const nameA   = isAr() ? a.nameAr : a.nameEn;
  const nameB   = isAr() ? b.nameAr : b.nameEn;

  // Build wood comparison rows
  const allParts = wa.map(w => w.part);
  const woodRows = allParts.map((part, i) => {
    const woodA = wa[i]?.wood || '—';
    const woodB = wb[i]?.wood || '—';
    return `<tr>
      <td class="row-label">${part}</td>
      <td class="highlight">${woodA}</td>
      <td class="highlight">${woodB}</td>
    </tr>`;
  }).join('');

  document.getElementById('modal-body').innerHTML = `
    <h2 class="modal-title" style="font-size:1.6rem;margin-bottom:24px">${isAr() ? 'مقارنة الأعواد' : 'Oud Comparison'}</h2>
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead><tr>
          <th>${isAr() ? 'المكوّن' : 'Component'}</th>
          <th>${nameA}<br><small style="font-size:0.65rem;color:var(--gold-dim)">${makerA}</small></th>
          <th>${nameB}<br><small style="font-size:0.65rem;color:var(--gold-dim)">${makerB}</small></th>
        </tr></thead>
        <tbody>
          <tr>
            <td class="row-label">${isAr() ? 'السعر' : 'Price'}</td>
            <td class="compare-price-cell">${a.price.toLocaleString()} USD</td>
            <td class="compare-price-cell">${b.price.toLocaleString()} USD</td>
          </tr>
          <tr>
            <td class="row-label">${isAr() ? 'وقت التسليم' : 'Delivery'}</td>
            <td>${isAr() ? `${a.deliveryWeeks} أسابيع` : `~${a.deliveryWeeks} weeks`}</td>
            <td>${isAr() ? `${b.deliveryWeeks} أسابيع` : `~${b.deliveryWeeks} weeks`}</td>
          </tr>
          ${woodRows}
        </tbody>
      </table>
    </div>
    <div class="modal-actions" style="margin-top:24px">
      <a href="#contact" class="btn-primary" onclick="closeModal()"><span>${isAr() ? 'استفسر الآن' : 'Inquire Now'}</span></a>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ─────────────────────────────────────────────
   MARQUEE: hide Arabic/English items per lang
───────────────────────────────────────────── */
function updateMarquee() {
  document.querySelectorAll('.marquee-item').forEach(el => {
    const isArItem = el.dataset.lang === 'ar';
    el.style.display = (isAr() === isArItem) ? 'inline-flex' : 'none';
  });
}

/* ─────────────────────────────────────────────
   CUSTOM ORDER FORM — delivery preview
───────────────────────────────────────────── */
function updateDelivery() {
  const sel   = document.getElementById('select-grade');
  const dest  = document.getElementById('select-dest');
  const label = document.getElementById('delivery-label');
  if (!sel || !label) return;
  const grade = sel.value;
  const weeks = grade === 'concert' ? '8–12' : grade === 'professional' ? '6–8' : '4–6';
  label.textContent = isAr() ? `وقت التسليم المتوقع: ${weeks} أسابيع` : `Estimated delivery: ${weeks} weeks`;
}

/* ─────────────────────────────────────────────
   CONTACT FORM SUBMIT (frontend only)
───────────────────────────────────────────── */
['contact-form', 'order-form'].forEach(id => {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast(isAr()
      ? 'شكراً لك! سنتواصل معك قريباً'
      : 'Thank you! We\'ll be in touch shortly.');
    form.reset();
  });
});

/* ─────────────────────────────────────────────
   SCROLL REVEAL (Intersection Observer)
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeReveal() {
  document.querySelectorAll('.section-head, .maker-card, .testimonial-card, .blog-card, .sold-card, .wood-guide-cell, .audio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.7s var(--ease), transform 0.7s var(--ease)';
    revealObserver.observe(el);
  });
}

/* ─────────────────────────────────────────────
   HERO OUD SVG (large version)
───────────────────────────────────────────── */
function renderHeroOud() {
  const wrap = document.getElementById('hero-oud');
  if (wrap) wrap.innerHTML = oudSVG(380);
}

/* ─────────────────────────────────────────────
   INIT — run everything on DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial lang class
  document.body.classList.add('en');

  renderHeroOud();
  renderCollection();
  renderMakers();
  renderAudioSection();
  renderWoodGuide();
  renderTestimonials();
  renderSoldGallery();
  renderBlog();

  // Observe for scroll reveals (slight delay so elements render first)
  setTimeout(observeReveal, 100);

  // Delivery widget select change
  const gradeSelect = document.getElementById('select-grade');
  if (gradeSelect) gradeSelect.addEventListener('change', updateDelivery);
});
