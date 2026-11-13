/* ============================================================
   cases.js — P2 案例聚合页 + P3 详情弹窗
   ============================================================ */
const grid = document.getElementById("grid");
const tabs = document.getElementById("tabs");
const ov = document.getElementById("ov");

function cardHTML(c) {
  return `
  <article class="case rv" data-id="${c.id}">
    <div class="case__media">
      <span class="case__tag">${c.industry}</span>
      <img src="${c.img}" alt="${c.name}案例现场" loading="lazy" />
    </div>
    <div class="case__body">
      <h4>${c.name}</h4>
      <p>${c.tag} · ${c.hl}</p>
      <span class="case__go">查看案例详情
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
      </span>
    </div>
  </article>`;
}

function render(filter = "all") {
  const list = window.CASES.filter(c => filter === "all" || c.industry === filter);
  grid.innerHTML = list.map(cardHTML).join("");
  requestAnimationFrame(() => grid.querySelectorAll(".rv").forEach(el => el.classList.add("in")));
}

tabs.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  tabs.querySelectorAll(".filter").forEach(b => b.classList.remove("is-on"));
  btn.classList.add("is-on");
  render(btn.dataset.filter);
});

/* ---------- 弹窗 ---------- */
const inlineBold = s => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

function figHTML(c, x) {
  return `<figure class="mfig">
    <img src="${x.src}" alt="${c.name}现场图" loading="lazy" />
    ${x.cap ? `<figcaption>${x.cap}</figcaption>` : ""}
  </figure>`;
}

/* 把除主图以外的图片，均匀分散插进正文，不堆在开头 */
function scatterFigures(list, anchors) {
  const n = list.length;
  if (!n) return;
  let pos;
  if (anchors.length >= 3) {
    pos = n === 1 ? [1] : n === 2 ? [0, 2] : [0, 1, 2];
  } else {
    pos = Array.from({ length: n }, (_, i) => Math.min(i, anchors.length - 1));
  }
  list.forEach((f, i) => {
    const a = anchors[pos[Math.min(i, pos.length - 1)]];
    if (a) a.insertAdjacentHTML("afterend", f);
  });
}

function openModal(id) {
  const c = window.CASES.find(x => x.id === id);
  if (!c) return;
  document.getElementById("mTag").textContent = c.industry + " · " + c.tag;
  document.getElementById("mTitle").textContent = c.name;
  const mi = document.getElementById("mImg");
  mi.src = c.img; mi.alt = c.name + "案例现场";

  /* 清掉上一轮插入的配图 */
  document.querySelectorAll(".modal__body .mfig").forEach(el => el.remove());

  const gal = c.gallery || [];
  const g = document.getElementById("mGallery");
  g.innerHTML = ""; g.style.display = "none";

  const blocks = document.getElementById("mBlocks");
  const rawBox = document.getElementById("mRaw");

  if (c.raw) {
    blocks.style.display = "none";
    rawBox.innerHTML = c.raw.map(b =>
      b.h ? `<h3 class="raw-h">${b.h}</h3>` : `<p class="raw-p">${inlineBold(b.p)}</p>`
    ).join("");
    /* 原文型案例：按段落长度均分，把配图插在段落之间 */
    const kids = [...rawBox.children];
    if (gal.length && kids.length) {
      const anchors = [];
      for (let i = 0; i < gal.length; i++) {
        const idx = Math.min(kids.length - 1, Math.round((i + 1) * kids.length / (gal.length + 1)));
        anchors.push(kids[idx]);
      }
      scatterFigures(gal.map(x => figHTML(c, x)), anchors);
    }
  } else {
    blocks.style.display = "";
    rawBox.innerHTML = "";
    document.getElementById("mBg").innerHTML = c.bg.replace(/\n\n/g, "<br /><br />");
    document.getElementById("mPain").innerHTML = c.pain.map(p => `<li>${p}</li>`).join("");
    document.getElementById("mSol").innerHTML = c.sol.map(s => `<li>${s}</li>`).join("");
    document.getElementById("mData").innerHTML = c.data.map(d => `<div><b>${d.n}</b><span>${d.u}</span></div>`).join("");
    /* 结构化案例：配图插在「项目背景 / 核心痛点 / 解决方案」之间 */
    const anchors = [...blocks.querySelectorAll(".mblock")].slice(0, 3);
    scatterFigures(gal.map(x => figHTML(c, x)), anchors);
  }

  ov.classList.add("is-open");
  document.body.style.overflow = "hidden";
  ov.querySelector(".modal").scrollTop = 0;
}

function closeModal() {
  ov.classList.remove("is-open");
  document.body.style.overflow = "";
}

ov.addEventListener("click", e => { if (e.target === ov) closeModal(); });
document.getElementById("mClose").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
grid.addEventListener("click", e => {
  const card = e.target.closest(".case");
  if (card) openModal(card.dataset.id);
});

/* ---------- 入场 ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });

render("all");
document.querySelectorAll(".stat").forEach(el => io.observe(el));

/* ---------- 支持 ?case=id 直接打开 ---------- */
const q = new URLSearchParams(location.search).get("case");
if (q) setTimeout(() => openModal(q), 260);
