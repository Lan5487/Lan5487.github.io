/* 天远科技集团官网 — 全站公用顶部导航组件
 * 自包含：内置 :root 变量与 .site-header 相关样式，挂到任意页面均能正确显示，
 * 无需该页面引用 styles.css。各页面在 <body> 顶部放置 <div id="site-header"></div>
 * 并引入本脚本即可，导航内容/高亮由本文件统一控制，保证全站一致。 */
(function () {
  /* 子目录页面（如 helmet/、mine/）可通过 window.SITE_BASE 指定相对前缀、
     window.SITE_NAV_KEY 指定当前应高亮的菜单组。主站根目录页面两者均无需设置。 */
  var BASE = (typeof window.SITE_BASE === 'string') ? window.SITE_BASE : '';
  var FORCE_KEY = (typeof window.SITE_NAV_KEY === 'string') ? window.SITE_NAV_KEY : '';
  var CSS = ':root{--header-h:115px;--primary:#0b308e;--text:#3f3f3f;--phone:#949494;--bg:#ffffff;--max-w:1920px;}'
    + '.site-header{position:sticky;top:0;height:var(--header-h);background:rgba(255,255,255,0.98);z-index:100;}'
    + '.header-inner{display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 80px;}'
    + '.logo a{display:flex;align-items:center;height:var(--header-h);}'
    /* 新 logo 素材为 466×100（比旧版更扁平），按宽度定尺寸，260px 会显得偏小 → 放大到 380px */
    + '.logo img{display:block;width:380px;height:auto;}'
    + '.main-nav{flex:1;display:flex;justify-content:center;}'
    + '.main-nav ul{display:flex;align-items:center;gap:84px;list-style:none;margin:0;padding:0;}'
    + '.main-nav li{position:relative;}'
    + '.main-nav a{display:block;font-size:18px;line-height:var(--header-h);color:var(--text);text-decoration:none;white-space:nowrap;transition:color .2s;}'
    + '.main-nav li.active>a,.main-nav li.current>a{color:var(--primary);}'
    + '.main-nav li.active::after,.main-nav li.current::after{content:"";position:absolute;bottom:7px;left:0;right:0;height:4px;background:var(--primary);border-radius:2px;}'
    + '.main-nav .nav-plain{display:block;font-size:18px;line-height:var(--header-h);color:var(--text);white-space:nowrap;cursor:default;}'
    + '.main-nav li:hover>a{color:var(--primary);}'
    + '.dropdown{display:none;position:absolute;top:calc(var(--header-h) - 8px);left:50%;transform:translateX(-50%);min-width:220px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.08);border-radius:4px;padding:8px 0;}'
    + '.main-nav li:hover .dropdown{display:block;}'
    + '.dropdown a{display:block;padding:10px 24px;line-height:1.5;font-size:15px;color:var(--text);border-bottom:1px solid transparent;}'
    + '.dropdown a:hover{color:var(--primary);background:#f7f8fa;}'
    + '.dropdown .nav-disabled{display:block;padding:10px 24px;line-height:1.5;font-size:15px;color:#b8b8b8;cursor:default;}'
    + '.phone{display:flex;align-items:center;gap:12px;font-size:18px;color:var(--phone);white-space:nowrap;'
    /* 显式重置：子站可能自带同名 .phone 类（如 helmet 站的手机模型示意），会污染电话区 */
    + 'width:auto;height:auto;min-width:0;min-height:0;border:0;outline:0;background:transparent;'
    + 'border-radius:0;padding:0;margin:0;box-shadow:none;float:none;position:static;}'
    + '.phone-icon{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6;}'
    /* ---- 深色导航（智慧矿山页）：底色取自该页首屏顶部实测色，左右渐变保证与首屏无缝衔接 ---- */
    + '.site-header.is-dark{background:#101c3f;background:linear-gradient(90deg,#101c3f 0%,#0f1b3e 52%,#0d1738 100%);}'
    /* 智能头盔页：色值取自该页首屏第一行实测色（左右对称的深蓝渐变），与首屏无缝衔接 */
    + '.site-header.is-dark.is-dark--helmet{background:#0d1a39;background:linear-gradient(90deg,#08101f 0%,#091124 6%,#0a1329 12.5%,#0c1732 25%,#0d1a39 37.5%,#0e1b3d 50%,#0d1938 62.5%,#0b1631 75%,#0a1328 87.5%,#091123 100%);}'
    /* 远程驾驶页：色值取自该页首屏照片第 80 行（图上移 4.17vw 后的接缝行）叠加首屏暗色遮罩 rgba(1,3,9,.62)
       后的实测合成色（20 段水平渐变），与首屏无缝衔接 */
    + '.site-header.is-dark.is-dark--remote{background:#1a1615;background:linear-gradient(90deg,#1c140f 0%,#1e150e 5%,#201711 10%,#1a1411 15%,#1b1512 20%,#191514 25%,#1a1615 30%,#1f1917 35%,#201b18 40%,#211d1b 45%,#1d1917 50%,#161414 55%,#1a1614 60%,#0e0e0e 65%,#131110 70%,#141313 75%,#0d0f0d 80%,#161312 85%,#151313 90%,#26221f 100%);}'
    + '.site-header.is-dark .main-nav a,.site-header.is-dark .main-nav .nav-plain{color:rgba(255,255,255,.88);}'
    + '.site-header.is-dark .main-nav li.active>a,.site-header.is-dark .main-nav li.current>a{color:#fff;}'
    + '.site-header.is-dark .main-nav li:hover>a{color:#fff;}'
    + '.site-header.is-dark .main-nav li.active::after,.site-header.is-dark .main-nav li.current::after{background:#339af0;}'
    + '.site-header.is-dark .phone{color:rgba(255,255,255,.7);}'
    + '.site-header.is-dark .dropdown a,.site-header.is-dark .dropdown .nav-disabled{color:#3f3f3f;}'
    + '.site-header.is-dark .dropdown a:hover{color:var(--primary);}'
    + '@media(max-width:1440px){.header-inner{padding:0 40px;}.main-nav ul{gap:56px;}.logo img{width:320px;}}'
    + '@media(max-width:1200px){.main-nav ul{gap:36px;}.main-nav a{font-size:16px;}.phone{font-size:16px;}.logo img{width:280px;}}'
    + '@media(max-width:992px){.main-nav{display:none;}.header-inner{justify-content:space-between;}.logo img{width:200px;}}'
    + '@media(max-width:560px){.logo img{width:160px;}.phone{font-size:13px;gap:6px;}.phone-icon{width:16px;height:16px;}}';

  var HEADER = '<header class="site-header"><div class="header-inner"><div class="logo">'
    + '<a href="' + BASE + 'index.html"><img src="' + BASE + 'assets/img/logo.png" alt="天远科技集团"></a></div>'
    + '<nav class="main-nav"><ul>'
    + '<li data-key="home"><a href="' + BASE + 'index.html">首页</a></li>'
    + '<li data-key="solution"><a href="' + BASE + 'mine/index.html">解决方案</a><div class="dropdown">'
    + '<a href="' + BASE + 'mine/index.html">智慧矿山解决方案</a></div></li>'
    + '<li data-key="product"><a href="' + BASE + 'scene-1.html">产品与服务</a><div class="dropdown">'
    + '<a href="' + BASE + 'scene-1.html">新能源改装/部件产品</a>'
    + '<a href="' + BASE + 'helmet/index.html">智能头盔</a>'
    + '<a href="' + BASE + 'remote-driving/index.html">远程驾驶</a>'
    + '<a href="' + BASE + 'product-iot.html">车载无线终端</a>'
    + '<a href="' + BASE + 'product-secondhand.html">二手机销售与租赁</a>'
    + '<a href="' + BASE + 'product-pile.html">技研(GIKEN)静压植桩机</a></div></li>'
    /* 客户案例：父级本身可点击，默认进入「新能源改装应用案例」 */
    + '<li data-key="case"><a href="' + BASE + 'case-newenergy.html">客户案例</a><div class="dropdown">'
    + '<a href="' + BASE + 'remote-driving/cases.html">远程驾驶案例</a>'
    + '<a href="' + BASE + 'case-newenergy.html">新能源改装应用案例</a></div></li>'
    + '<li data-key="about"><a href="' + BASE + 'about.html">关于我们</a></li>'
    + '</ul></nav><div class="phone">'
    + '<svg class="phone-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .35 1.97.66 2.88a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.88.54 2.88.66a2 2 0 0 1 1.72 2z"/></svg>'
    + '<span>400-812-1998</span></div></div></header>';

  function inject() {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    if (!document.getElementById('site-header-style')) {
      var st = document.createElement('style');
      st.id = 'site-header-style';
      st.textContent = CSS;
      (document.head || document.documentElement).appendChild(st);
    }
    mount.innerHTML = HEADER;
    var p = location.pathname;
    var key = FORCE_KEY || 'home';
    if (!FORCE_KEY) {
    if (p === '/' || p === '' || /index\.html$/.test(p)) key = 'home';
    else if (/solution/.test(p)) key = 'solution';
    /* 新能源改装场景页 scene-N.html 现为「产品与服务」的入口页，归入 product 组高亮 */
    else if (/scene-\d+\.html$/.test(p)) key = 'product';
    /* 二手机（erji-*）页属于「产品与服务 > 二手机销售与租赁」，同样归入 product 组高亮 */
    else if (/erji-/.test(p)) key = 'product';
    else if (/product/.test(p)) key = 'product';
    else if (/case/.test(p)) key = 'case';
    else if (/about/.test(p)) key = 'about';
    }
    var li = mount.querySelector('li[data-key="' + key + '"]');
    if (li) li.className = 'active';

    /* 深色导航：只有页面显式声明 window.SITE_HEADER_THEME 才启用。
       'dark'   = 智慧矿山页（深蓝渐变，色值取自该页首屏）
       'helmet' = 智能头盔页（纯 #060912，与首屏底色一致）
       'remote' = 远程驾驶页（20 段水平渐变，色值取自该页首屏接缝行 + 遮罩合成色）
       不能按导航高亮组判断 —— solution-fleet / solution-lifecycle 也属于 solution 组，但它们是浅色页。 */
    var theme = (typeof window.SITE_HEADER_THEME === 'string') ? window.SITE_HEADER_THEME : '';
    var dark = theme === 'dark' || theme === 'helmet' || theme === 'remote';
    if (dark) {
      var hd = mount.querySelector('.site-header');
      if (hd) {
        hd.classList.add('is-dark');
        if (theme === 'helmet') hd.classList.add('is-dark--helmet');
        if (theme === 'remote') hd.classList.add('is-dark--remote');
      }
      /* 深底上用白色版 logo，否则黑色字标看不见 */
      var lg = mount.querySelector('.logo img');
      if (lg) lg.src = BASE + 'assets/img/logo-white.png';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

/* 天远科技集团官网 — 滚动位置记忆
 * 需求：从「二级页」（产品详情 iot-* / 二手机 erji-* / 新能源部件 product-newenergy-*）
 * 返回「一级页」时，直接回到上次停留的位置，而不是被重置到页面顶部。
 * 做法：会话内按 pathname 记录 scrollY；仅当来源页属于二级页、且当前页不是二级页、
 * 且没有 #hash 跳转时，才把位置还原。其他情况一律不动（避免点「首页」被拽到中间）。
 * 本文件已挂载于全站页面，无需各页面单独引入。 */
(function () {
  var DEEP = /(?:^|\/)(?:iot-|erji-|product-newenergy-)[^\/]*\.html$/i;
  var KEY = 'ty:scroll:';
  /* 只认「真人输入」：程序化滚动（浏览器原生还原、以及本脚本自己的 scrollTo）也会触发 scroll 事件，
     若用 scroll 事件判断，会让 load 后的补正失效 */
  var userInteracted = false;

  function save() {
    try { sessionStorage.setItem(KEY + location.pathname, String(window.pageYOffset || 0)); } catch (e) {}
  }

  var timer = 0;
  window.addEventListener('scroll', function () {
    if (timer) return;
    timer = setTimeout(function () { timer = 0; save(); }, 250);
  }, { passive: true });
  window.addEventListener('pagehide', save);
  window.addEventListener('beforeunload', save);
  ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach(function (t) {
    window.addEventListener(t, function () { userInteracted = true; }, { passive: true });
  });

  function shouldRestore() {
    if (location.hash) return false;
    var ref = document.referrer || '';
    if (!ref) return false;
    var u;
    try { u = new URL(ref); } catch (e) { return false; }
    if (u.origin !== location.origin) return false;
    if (!DEEP.test(u.pathname)) return false;      // 来源必须是二级页
    if (DEEP.test(location.pathname)) return false; // 当前页不能也是二级页
    return true;
  }

  function apply() {
    if (userInteracted || !shouldRestore()) return;
    var y = 0;
    try { y = parseInt(sessionStorage.getItem(KEY + location.pathname) || '0', 10) || 0; } catch (e) {}
    if (y < 40) return;
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';   // 关掉 html{scroll-behavior:smooth}，立即定位不动画
    window.scrollTo(0, y);
    /* 若图片尚未撑开高度导致被截断，等 load 后再补一次 */
    setTimeout(function () { html.style.scrollBehavior = prev; }, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(apply, 30); });
  } else {
    setTimeout(apply, 30);
  }
  window.addEventListener('load', function () { setTimeout(apply, 120); });
})();
