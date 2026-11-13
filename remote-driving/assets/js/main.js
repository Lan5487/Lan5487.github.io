/* ============================================================
   main.js — P1 产品页交互
   ============================================================ */

/* ---------- 模块2：核心功能数据 ---------- */
const AI_FEATURES = [
  {
    art: "tooth", title: "铲齿识别", short: "实时监测铲斗状态，磨损报警",
    desc: "实时监测铲斗的状态。磨损报警，避免带伤作业，降低维修成本。",
  },
  {
    art: "pose", title: "姿态识别", short: "一个手势，就是紧急停车令",
    desc: "现场人员举手，设备即刻停车。无需对讲、无需遥控，一个手势，就是紧急停车令。",
  },
  {
    art: "detect", title: "视觉识别", short: "人员、车辆、障碍物主动预警",
    desc: "依托车载摄像头与边缘计算，实时检测人员、车辆、障碍物，主动预警，为远程操控再加一道安全防线。",
  },
  {
    art: "autoLoad", title: "自动装车", short: "一键挖装，一人盯多台",
    desc: "划定挖掘点与卸料点，一键启动自动挖装。铲斗循迹自动循环作业，解放双手；一人可同时盯守多台设备，效率成倍提升。",
  },
];

const CORE_FEATURES = [
  {
    art: "ring360", title: "360 环视", short: "4 路摄像头，360 度无盲区",
    desc: "4 路摄像头，360 度环视无盲区。无论前进、后退、旋转，周围环境一览无余。倒车、回转、贴边作业，360 环视全程护航。",
  },
  {
    art: "profile", title: "地形侧剖成像", short: "把模糊的坡面变成看得见的剖面线",
    desc: "传感器实时扫描前方物体表面，生成侧面轮廓数据，把模糊的坡面变成看得见的剖面线。前方地形，一键成形。坡度、轮廓、障碍物，实时重建，远程操控的「透视眼」。",
  },
  {
    art: "radar", title: "毫米波倒车雷达", short: "穿透粉尘雨雾，分级告警",
    desc: "毫米波雷达穿透粉尘雨雾，远距离稳定探测后方障碍。危险靠近，分级告警即时响应，为安全留足反应时间。全天候可靠，恶劣天气倒车同样安心。",
  },
  {
    art: "switch", title: "多设备快速切换", short: "一套舱，连接多台设备",
    desc: "一套远程驾驶舱即可连接多台设备快速响应。设备列表清晰管理，一键切换，数秒完成无缝接管。换机不换舱，切换即作业，调度更灵活。一个人，就是一支队伍。",
  },
];

function featCard(f) {
  const media = f.img
    ? `<img src="${f.img}" alt="${f.title}示意" loading="lazy" />`
    : window.SCENES[f.art]();
  return `
  <article class="feat-card rv">
    <div class="feat-card__media">${media}</div>
    <div class="feat-card__cap">
      <h4>${f.title}</h4>
      <p>${f.short}</p>
    </div>
    <div class="feat-card__over">
      <h5>${f.title}</h5>
      <p>${f.desc}</p>
    </div>
  </article>`;
}

document.getElementById("aiGrid").innerHTML = AI_FEATURES.map(featCard).join("");
document.getElementById("coreGrid").innerHTML = CORE_FEATURES.map(featCard).join("");

/* ---------- 模块3：系统图片 ---------- */
const SYS_ITEMS = [
  {
    key: "joy", name: "操纵杆速度标定", sub: "线性手感", video: "assets/video/joy.mp4",
    desc: "把杆的行程与设备动作速度精确匹配，形成线性手感。三步完成标定：进入界面、标定、保存，全程可视化。支持多机型适配，换设备不换手感。",
    ico: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v8M8 20h8M12 4V2"/></svg>`,
  },
  {
    key: "ring360", name: "360 环视", sub: "4 路拼接", video: "assets/video/ring360.mp4",
    desc: "4 路摄像头，360 度环视无盲区。无论前进、后退、旋转，周围环境一览无余。倒车、回转、贴边作业，360 环视全程护航。",
    ico: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/></svg>`,
  },
  {
    key: "radar", name: "毫米波倒车雷达", sub: "分级告警", video: "assets/video/radar.mp4",
    desc: "毫米波雷达穿透粉尘雨雾，远距离稳定探测后方障碍。危险靠近，分级告警即时响应，为安全留足反应时间。全天候可靠，恶劣天气倒车同样安心。",
    ico: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 20V4M12 20l-7-4M12 20l7-4"/><path d="M5 12a9 9 0 0 1 14 0"/></svg>`,
  },
  {
    key: "spot", name: "挖斗落点辅助", sub: "预标注落点", video: "assets/video/spot.mp4",
    desc: "实时计算挖斗空间位置，预标注落点，远程操控也能铲铲精准。装车一次到位，修整精准成型。少空挖、少误挖，作业效率显著提升。",
    ico: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
  },
  {
    key: "talk", name: "语音对讲", sub: "实时双向", video: "assets/video/talk.mp4",
    desc: "实时双向通话。远程操控不是孤岛——指令传达、协调配合，零延迟沟通。调度指令秒达，现场反馈即时应答，协同作业更顺畅。",
    ico: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>`,
  },
];

const stage = document.getElementById("sysStage");
const tabsBox = document.getElementById("sysTabs");

stage.insertAdjacentHTML("beforeend", SYS_ITEMS.map((it, i) => `
  <div class="sys__panel${i === 0 ? " is-on" : ""}" data-key="${it.key}" data-idx="${i}">
    <video class="sys__video" src="${it.video}" muted playsinline
      preload="${i === 0 ? "auto" : "metadata"}" aria-label="${it.name}演示"></video>
    <div class="sys__over"><div class="sys__over-in">
      <h4>${it.name}</h4><p>${it.desc}</p>
    </div></div>
  </div>`).join(""));

tabsBox.innerHTML = SYS_ITEMS.map((it, i) => `
  <button class="sys-tab${i === 0 ? " is-on" : ""}" data-key="${it.key}">
    <span class="sys-tab__ico">${it.ico}</span>
    <span><b>${it.name}</b><small>${it.sub}</small></span>
  </button>`).join("");

stage.classList.add("is-active");

function selectSys(key, restart = true) {
  document.querySelectorAll(".sys__panel").forEach(p => {
    const on = p.dataset.key === key;
    p.classList.toggle("is-on", on);
    const v = p.querySelector("video");
    if (!v) return;
    if (on) { if (restart) v.currentTime = 0; v.play().catch(() => {}); }
    else v.pause();
  });
  document.querySelectorAll(".sys-tab").forEach(t => t.classList.toggle("is-on", t.dataset.key === key));
  stage.classList.add("is-active");
}

/* 无人操作时按顺序自动播放，播完自动切下一个，循环 */
const SYS_ORDER = SYS_ITEMS.map(it => it.key);
let sysManualUntil = 0;   // 用户手动切换后 20s 内不自动轮播
let sysPending = false;   // 视频播完但鼠标正悬停，等移出再切
const sysCurrentIdx = () => {
  const p = document.querySelector(".sys__panel.is-on");
  return p ? Number(p.dataset.idx) : 0;
};
function sysNext() {
  selectSys(SYS_ORDER[(sysCurrentIdx() + 1) % SYS_ORDER.length]);
}
document.querySelectorAll(".sys__panel video").forEach(v => {
  v.addEventListener("ended", () => {
    if (Date.now() < sysManualUntil) return;
    if (stage.matches(":hover")) { sysPending = true; return; }
    sysNext();
  });
});
stage.addEventListener("mouseleave", () => { if (sysPending) { sysPending = false; sysNext(); } });

tabsBox.addEventListener("click", e => {
  const btn = e.target.closest(".sys-tab");
  if (!btn) return;
  sysManualUntil = Date.now() + 20000;
  sysPending = false;
  selectSys(btn.dataset.key);
});

/* 舞台离开视口时暂停播放，回到视口继续当前项 */
const sysIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = document.querySelector(".sys__panel.is-on video");
    if (!v) return;
    if (e.isIntersecting) v.play().catch(() => {});
    else v.pause();
  });
}, { threshold: 0.2 });
sysIO.observe(stage);

/* ---------- 模块5：案例预览 ---------- */
const previewBox = document.getElementById("previewCases");
const previewTabs = document.getElementById("previewTabs");

function renderPreview(filter = "all") {
  let list;
  if (filter === "all") {
    // 全部：每个行业各取一个，保证场景多样性
    list = ["港口", "危化", "矿山"].map(ind => window.CASES.find(c => c.industry === ind)).filter(Boolean);
  } else {
    list = window.CASES.filter(c => c.industry === filter).slice(0, 3);
  }
  previewBox.innerHTML = list.map(c => `
    <article class="case rv" data-id="${c.id}">
      <div class="case__media">
        <span class="case__tag">${c.industry}</span>
        <img src="${c.img}" alt="${c.name}案例现场" loading="lazy" />
      </div>
      <div class="case__body">
        <h4>${c.name}</h4>
        <p>${c.hl}</p>
        <span class="case__go">查看案例详情
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </article>`).join("");
  requestAnimationFrame(() => previewBox.querySelectorAll(".rv").forEach(el => el.classList.add("in")));
}

previewTabs.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  previewTabs.querySelectorAll(".filter").forEach(b => b.classList.remove("is-on"));
  btn.classList.add("is-on");
  renderPreview(btn.dataset.filter);
});
previewBox.addEventListener("click", e => {
  const card = e.target.closest(".case");
  if (card) window.location.href = "cases.html?case=" + card.dataset.id;
});
renderPreview("all");

/* ---------- 入场动画 ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ---------- 首屏卡片悬停（触屏兼容） ---------- */
document.querySelectorAll(".feat-card").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("is-on"));
});

/* ---------- 宣传片：滚动到视口自动播放 ---------- */
const promo = document.getElementById("promoVideo");
if (promo) {
  let userPaused = false;   // 用户手动暂停过就不再自动续播
  let curRatio = 0;         // 当前可见比例，用于区分"滚出暂停"与"用户暂停"

  promo.addEventListener("pause", () => {
    // 只有在视频仍处于视口内时按下的暂停，才算用户主动暂停
    if (curRatio >= 0.5 && !promo.ended) userPaused = true;
  });
  promo.addEventListener("play", () => { userPaused = false; });

  const pio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      curRatio = e.intersectionRatio;
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        if (promo.paused && !userPaused) promo.play().catch(() => {});
      } else if (!promo.paused) {
        promo.pause();
      }
    });
  }, { threshold: [0, 0.5, 1] });
  pio.observe(promo);
}
