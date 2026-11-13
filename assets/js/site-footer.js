/* 天远科技集团官网 — 全站公用底部导航栏（页脚）组件
 * 排版参考「底部导航栏参考.jpg」：左上 logo + 地址，右上服务热线；下方左侧四栏导航、
 * 右侧三个二维码（公众号 / 抖音号 / 视频号，含文字标签）。仅参考排版，配色沿用本站浅灰底。
 * logo 改用完整版素材（原 footer/logo.png 底部被裁，显示不完整）。
 * 用法：<div id="site-footer-new"></div><script src="assets/js/site-footer.js"></script>
 * 说明：远程驾驶页/案例页已上线 —— 页脚两条均指向 remote-driving/ 下的对应页面，与顶部导航保持一致。 */
(function () {
  var CSS = '.sf{background:#ececec;color:#3f3f3f;'
    + 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;}'
    + '.sf *{box-sizing:border-box;}'
    + '.sf-inner{max-width:1920px;margin:0 auto;padding:46px 159px 50px 161px;}'

    /* ---- 上排：logo ／ 服务热线 + 公司地址（两行右对齐） ---- */
    + '.sf-top{display:flex;align-items:flex-start;justify-content:space-between;}'
    + '.sf-brand img{display:block;width:322px;height:auto;}'
    + '.sf-hot{text-align:right;padding-top:6px;}'
    + '.sf-hot__line{display:flex;align-items:baseline;justify-content:flex-end;gap:8px;white-space:nowrap;}'
    + '.sf-hot__k{font-size:14px;line-height:20px;color:#8a8a8a;letter-spacing:.12em;}'
    + '.sf-hot__v{font-size:30px;line-height:1.2;font-weight:600;color:#0b308e;letter-spacing:.02em;text-decoration:none;}'
    + 'a.sf-hot__v:hover{color:#0b308e;opacity:.82;}'
    + '.sf-hot__line--addr{margin-top:6px;}'
    + '.sf-addr{font-size:15px;line-height:20px;color:#4a4a4a;white-space:nowrap;}'

    /* ---- 下排：四栏导航 ／ 三个二维码 ---- */
    + '.sf-mid{display:flex;align-items:flex-start;justify-content:space-between;margin-top:38px;flex-wrap:wrap;gap:20px 0;}'
    + '.sf-cols{display:flex;align-items:flex-start;}'
    + '.sf-col{flex:0 0 auto;}'
    + '.sf-col:nth-child(1){width:262px;}'
    + '.sf-col:nth-child(2){width:322px;}'
    + '.sf-col:nth-child(3){width:258px;}'
    + '.sf-col:nth-child(4){width:246px;}'
    + '.sf-h{display:block;font-size:18px;font-weight:600;line-height:22px;margin:0 0 22px;color:#3f3f3f;text-decoration:none;transition:color .2s;}'
    + 'a.sf-h:hover{color:#0b308e;}'
    + '.sf-col ul{list-style:none;margin:0;padding:0;}'
    + '.sf-col li{font-size:15px;line-height:30px;margin:0;}'
    + '.sf-col li a{color:#4a4a4a;text-decoration:none;transition:color .2s;}'
    + '.sf-col li a:hover{color:#0b308e;}'
    + '.sf-disabled{color:#b0b0b0;cursor:default;}'
    + '.sf-qrs{display:flex;align-items:flex-start;gap:30px;flex:0 0 auto;padding-top:2px;}'
    + '.sf-qr{text-align:center;}'
    + '.sf-qr img{display:block;width:104px;height:104px;border-radius:8px;background:#fff;}'
    + '.sf-qr span{display:block;margin-top:10px;font-size:14px;line-height:20px;color:#5a5a5a;}'

    + '@media(max-width:1600px){'
    + '.sf-inner{padding:38px 60px 42px;}'
    + '.sf-brand img{width:270px;}'
    + '.sf-hot__v{font-size:26px;}'
    + '.sf-col:nth-child(1){width:210px;}.sf-col:nth-child(2){width:272px;}'
    + '.sf-col:nth-child(3){width:206px;}.sf-col:nth-child(4){width:186px;}'
    + '.sf-h{font-size:16px;margin-bottom:18px;}.sf-col li{font-size:14px;line-height:27px;}'
    + '.sf-qrs{gap:22px;}.sf-qr img{width:92px;height:92px;}'
    + '}'
    + '@media(max-width:1360px){'
    + '.sf-col:nth-child(1){width:186px;}.sf-col:nth-child(2){width:236px;}'
    + '.sf-col:nth-child(3){width:180px;}.sf-col:nth-child(4){width:158px;}'
    + '.sf-qrs{gap:16px;}.sf-qr img{width:80px;height:80px;}.sf-qr span{font-size:13px;}'
    + '}'
    + '@media(max-width:1160px){'
    + '.sf-inner{padding:32px 40px 38px;}'
    + '.sf-top{flex-wrap:wrap;gap:16px;}'
    + '.sf-brand img{width:250px;}'
    + '.sf-hot{text-align:left;padding-top:0;}'
    + '.sf-hot__line{justify-content:flex-start;}'
    + '.sf-cols{display:grid;grid-template-columns:1fr 1fr;column-gap:24px;width:100%;}'
    + '.sf-col{width:auto!important;margin-bottom:20px;}'
    + '.sf-qrs{gap:20px;padding-top:6px;}.sf-qr img{width:86px;height:86px;}'
    + '}'
    + '@media(max-width:680px){'
    + '.sf-inner{padding:28px 24px 34px;}'
    + '.sf-brand img{width:220px;}'
    + '.sf-cols{grid-template-columns:1fr;}'
    + '.sf-qrs{gap:18px;}.sf-qr img{width:80px;height:80px;}'
    + '}';

  /* 一级=栏目，二级=条目；无实际页面用 span.sf-disabled */
  var HTML = '<footer class="sf"><div class="sf-inner">'
    + '<div class="sf-top">'
    + '<div class="sf-brand">'
    + '<img src="assets/img/footer/logo.png" alt="天远科技集团">'
    + '</div>'
    + '<div class="sf-hot">'
    + '<div class="sf-hot__line">'
    + '<span class="sf-hot__k">服务热线：</span>'
    + '<a class="sf-hot__v" href="tel:4008121998">400-812-1998</a>'
    + '</div>'
    + '<div class="sf-hot__line sf-hot__line--addr">'
    + '<span class="sf-hot__k">公司地址：</span>'
    + '<span class="sf-addr">石家庄高新区中山东路1035号</span>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="sf-mid">'
    + '<nav class="sf-cols" aria-label="底部导航">'
    + '<div class="sf-col"><a class="sf-h" href="mine/index.html">解决方案</a><ul>'
    + '<li><a href="mine/index.html">智慧矿山解决方案</a></li></ul></div>'
    + '<div class="sf-col"><a class="sf-h" href="scene-1.html">产品与服务</a><ul>'
    + '<li><a href="scene-1.html">新能源改装/部件产品</a></li>'
    + '<li><a href="helmet/index.html">智能头盔</a></li>'
    + '<li><a href="remote-driving/index.html">远程驾驶</a></li>'
    + '<li><a href="product-iot.html">车载无线终端</a></li>'
    + '<li><a href="product-secondhand.html">二手机销售与租赁</a></li>'
    + '<li><a href="product-pile.html">技研(GIKEN)静压植桩机</a></li></ul></div>'
    + '<div class="sf-col"><a class="sf-h" href="case-newenergy.html">客户案例</a><ul>'
    + '<li><a href="remote-driving/cases.html">远程驾驶案例</a></li>'
    + '<li><a href="case-newenergy.html">新能源改装应用案例</a></li></ul></div>'
    + '<div class="sf-col"><a class="sf-h" href="about.html">关于我们</a><ul>'
    + '<li><a href="about.html">集团简介</a></li></ul></div>'
    + '</nav>'
    + '<div class="sf-qrs">'
    + '<div class="sf-qr"><img src="assets/img/footer/qr-mp.png" alt="天远科技集团 公众号二维码"><span>公众号</span></div>'
    + '<div class="sf-qr"><img src="assets/img/footer/qr-douyin.png" alt="天远科技集团 抖音号二维码"><span>抖音号</span></div>'
    + '<div class="sf-qr"><img src="assets/img/footer/qr-wechat-channels.png" alt="天远科技集团 视频号二维码"><span>视频号</span></div>'
    + '</div>'
    + '</div>'
    + '</div></footer>';

  function inject() {
    var mount = document.getElementById('site-footer-new');
    if (!mount) return;
    if (!document.getElementById('site-footer-style')) {
      var st = document.createElement('style');
      st.id = 'site-footer-style';
      st.textContent = CSS;
      (document.head || document.documentElement).appendChild(st);
    }
    mount.innerHTML = HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
