/* ============================================================
   art.js — 矢量示意图生成
   1) artScene(kind)  模块2 核心功能示意图（亮白影棚风格）
   2) sysScreen(kind) 模块3 系统界面示意（深色 UI Mock）
   ============================================================ */

const MACHINE = `
  <g class="machine">
    <ellipse cx="200" cy="268" rx="190" ry="26" fill="#0B1220" opacity=".07"/>
    <!-- wheels -->
    <circle cx="92" cy="244" r="48" fill="#23272E"/>
    <circle cx="92" cy="244" r="21" fill="#FFC61A"/>
    <circle cx="92" cy="244" r="9" fill="#23272E"/>
    <circle cx="252" cy="244" r="48" fill="#23272E"/>
    <circle cx="252" cy="244" r="21" fill="#FFC61A"/>
    <circle cx="252" cy="244" r="9" fill="#23272E"/>
    <!-- chassis -->
    <rect x="40" y="190" width="252" height="46" rx="12" fill="#2B3138"/>
    <!-- body -->
    <rect x="46" y="112" width="152" height="84" rx="14" fill="#FFC61A"/>
    <rect x="46" y="164" width="152" height="32" rx="10" fill="#EFB000"/>
    <rect x="60" y="132" width="34" height="12" rx="4" fill="#E0A200" opacity=".7"/>
    <!-- cab -->
    <rect x="56" y="44" width="106" height="78" rx="10" fill="#FFC61A"/>
    <rect x="67" y="55" width="84" height="54" rx="6" fill="#1E252D"/>
    <polygon points="67,55 99,55 67,96" fill="#3A4652" opacity=".85"/>
    <!-- arm -->
    <polygon points="196,124 216,104 304,146 302,172" fill="#EFB000"/>
    <polygon points="298,142 344,112 366,138 322,174" fill="#FFC61A"/>
    <!-- bucket -->
    <polygon points="344,106 404,128 410,186 348,170" fill="#FFC61A"/>
    <polygon points="344,106 404,128 402,140 344,120" fill="#FFD65C"/>
    <g fill="#2B3138">
      <polygon points="352,168 362,171 358,186"/>
      <polygon points="372,173 382,176 378,191"/>
      <polygon points="392,178 402,181 398,196"/>
    </g>
  </g>`;

function sceneBase(extra = "") {
  return `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E7EBF1"/>
    </linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2F6BFF"/><stop offset="100%" stop-color="#4E82FF"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F4F6F9"/><stop offset="100%" stop-color="#E3E7ED"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#sky)"/>
  <rect x="0" y="356" width="800" height="18" fill="#8FB0FF" opacity=".55"/>
  <rect x="0" y="374" width="800" height="104" fill="url(#blue)"/>
  <rect x="0" y="478" width="800" height="122" fill="url(#floor)"/>
  <g transform="translate(238,196)">${MACHINE}</g>
  ${extra}
</svg>`;
}

/* ---------- 模块2：7 张示意图 ---------- */
window.SCENES = {
  /* 铲齿识别：斗齿高亮 + 磨损读数 */
  tooth: () => sceneBase(`
    <g>
      <circle cx="578" cy="352" r="86" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="7 7"/>
      <circle cx="578" cy="352" r="118" fill="none" stroke="#F59E0B" stroke-width="1" opacity=".35"/>
      <g fill="#F59E0B">
        <circle cx="560" cy="368" r="6"/><circle cx="580" cy="374" r="6"/><circle cx="600" cy="380" r="6"/>
      </g>
      <g transform="translate(660,140)">
        <rect width="104" height="86" rx="10" fill="#0B1220" opacity=".92"/>
        <text x="52" y="30" text-anchor="middle" fill="#8FA0B8" font-size="11" font-family="sans-serif">斗齿磨损</text>
        <text x="52" y="62" text-anchor="middle" fill="#F59E0B" font-size="26" font-weight="700" font-family="sans-serif">12%</text>
        <rect x="20" y="72" width="64" height="4" rx="2" fill="#243044"/>
        <rect x="20" y="72" width="26" height="4" rx="2" fill="#F59E0B"/>
      </g>
      <path d="M628 300 L668 218" stroke="#0B1220" stroke-width="1.2" opacity=".35"/>
    </g>`),

  /* 姿态识别：人员举手 → 设备停车 */
  pose: () => sceneBase(`
    <g>
      <g transform="translate(112,254) scale(1.32)">
        <circle cx="0" cy="0" r="15" fill="#23272E"/>
        <rect x="-13" y="16" width="26" height="46" rx="10" fill="#F59E0B"/>
        <path d="M-4 22 L-30 -6 L-22 -14" stroke="#F59E0B" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M-9 62 L-18 100" stroke="#23272E" stroke-width="9" stroke-linecap="round"/>
        <path d="M9 62 L18 100" stroke="#23272E" stroke-width="9" stroke-linecap="round"/>
        <circle cx="0" cy="46" r="46" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 6"/>
      </g>
      <g transform="translate(96,168)">
        <rect width="126" height="40" rx="20" fill="#F59E0B"/>
        <text x="63" y="26" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">手势停车</text>
      </g>
      <g transform="translate(240,398)">
        <rect width="150" height="5" rx="2.5" fill="#23272E" opacity=".25"/>
        <text x="75" y="30" text-anchor="middle" fill="#6B7280" font-size="12" font-family="sans-serif">0.4s 内自动刹停</text>
      </g>
    </g>`),

  /* 标配识别：三类目标框选 */
  detect: () => sceneBase(`
    <g>
      <g stroke="#F59E0B" stroke-width="2" fill="none">
        <rect x="96" y="286" width="62" height="118" rx="4"/>
        <rect x="596" y="300" width="140" height="104" rx="4"/>
        <rect x="470" y="392" width="86" height="52" rx="4"/>
      </g>
      <g font-family="sans-serif" font-size="11" font-weight="700">
        <g fill="#F59E0B"><rect x="96" y="266" width="52" height="20" rx="3"/><text x="122" y="280" text-anchor="middle" fill="#fff">人员</text></g>
        <g fill="#F59E0B"><rect x="596" y="280" width="52" height="20" rx="3"/><text x="622" y="294" text-anchor="middle" fill="#fff">车辆</text></g>
        <g fill="#F59E0B"><rect x="470" y="372" width="52" height="20" rx="3"/><text x="496" y="386" text-anchor="middle" fill="#fff">障碍</text></g>
      </g>
      <g transform="translate(596,300)">
        <circle cx="188" cy="52" r="0"/>
      </g>
      <g transform="translate(660,404)"><circle r="0"/></g>
      <g transform="translate(150,180)">
        <rect width="176" height="44" rx="22" fill="#0B1220" opacity=".9"/>
        <circle cx="24" cy="22" r="5" fill="#3DDC97"/>
        <text x="42" y="27" fill="#fff" font-size="13" font-family="sans-serif">实时识别中 · 3 目标</text>
      </g>
    </g>`),

  /* 自动装车：挖掘机向自卸车卸料（与其它场景同一套底板，挖掘机比例一致） */
  autoLoad: () => `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E7EBF1"/>
    </linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2F6BFF"/><stop offset="100%" stop-color="#4E82FF"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F4F6F9"/><stop offset="100%" stop-color="#E3E7ED"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#sky)"/>
  <rect x="0" y="356" width="800" height="18" fill="#8FB0FF" opacity=".55"/>
  <rect x="0" y="374" width="800" height="104" fill="url(#blue)"/>
  <rect x="0" y="478" width="800" height="122" fill="url(#floor)"/>

  <!-- 自卸车 -->
  <g>
    <ellipse cx="660" cy="486" rx="152" ry="16" fill="#0B1220" opacity=".07"/>
    <!-- 车厢 -->
    <polygon points="524,362 700,362 700,438 524,438" fill="#FFC61A"/>
    <polygon points="524,362 700,362 700,380 524,380" fill="#FFD65C"/>
    <g stroke="#EFB000" stroke-width="5" opacity=".8">
      <path d="M560,384 560,434"/><path d="M600,384 600,434"/><path d="M640,384 640,434"/>
    </g>
    <!-- 物料堆 -->
    <path d="M536 402 Q566 364 600 396 Q622 414 646 394 Q668 380 692 404 L692 438 L536 438 Z" fill="#9AA0A8"/>
    <g fill="#7A7F88">
      <polygon points="552,404 570,386 588,404"/><polygon points="596,406 616,388 636,406"/>
    </g>
    <!-- 底盘 -->
    <rect x="512" y="436" width="214" height="16" rx="6" fill="#2B3138"/>
    <!-- 驾驶室 -->
    <rect x="700" y="338" width="86" height="98" rx="10" fill="#FFC61A"/>
    <rect x="712" y="350" width="60" height="40" rx="5" fill="#1E252D"/>
    <rect x="712" y="400" width="30" height="10" rx="4" fill="#E0A200" opacity=".7"/>
    <!-- 车轮 -->
    <circle cx="566" cy="462" r="26" fill="#23272E"/><circle cx="566" cy="462" r="11" fill="#FFC61A"/><circle cx="566" cy="462" r="5" fill="#23272E"/>
    <circle cx="748" cy="462" r="26" fill="#23272E"/><circle cx="748" cy="462" r="11" fill="#FFC61A"/><circle cx="748" cy="462" r="5" fill="#23272E"/>
  </g>

  <!-- 挖掘机（与「视觉识别」同一底板、同比例，仅整体左移让出卸料位） -->
  <g transform="translate(56,196)">
    ${MACHINE}
  </g>

  <!-- 卸料落点与循环轨迹 -->
  <g>
    <path d="M436 296 Q496 258 538 340" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="7 8" opacity=".55"/>
    <g fill="#9AA0A8">
      <polygon points="466,344 478,332 490,346"/>
      <polygon points="484,360 498,346 512,362"/>
      <polygon points="504,376 516,364 528,378"/>
    </g>
    <g transform="translate(72,150)">
      <rect width="200" height="44" rx="22" fill="#0B1220" opacity=".9"/>
      <circle cx="24" cy="22" r="5" fill="#F59E0B"/>
      <text x="42" y="27" fill="#fff" font-size="13" font-family="sans-serif">自动挖装 · 循迹循环</text>
    </g>
  </g>
</svg>`,

  ring360: () => sceneBase(`
    <g>
      <ellipse cx="440" cy="470" rx="330" ry="86" fill="none" stroke="#2F6BFF" stroke-width="4" stroke-dasharray="12 10"/>
      <g fill="#2F6BFF" opacity=".16">
        <polygon points="110,470 34,404 34,536"/>
        <polygon points="770,470 846,404 846,536"/>
        <polygon points="440,384 386,318 494,318"/>
      </g>
      <g fill="#F59E0B">
        <circle cx="110" cy="470" r="8"/><circle cx="770" cy="470" r="8"/>
        <circle cx="440" cy="384" r="8"/><circle cx="440" cy="556" r="8"/>
      </g>
      <g transform="translate(556,246)">
        <rect width="152" height="40" rx="20" fill="#2F6BFF"/>
        <text x="76" y="26" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">360° 无盲区</text>
      </g>
    </g>`),

  /* 地形侧剖成像：地形轮廓线 */
  profile: () => sceneBase(`
    <g>
      <rect x="60" y="498" width="680" height="86" rx="12" fill="#0B1220" opacity=".90"/>
      <path d="M84 556 L150 542 L220 548 L286 534 L352 544 L420 528 L488 540 L556 526 L624 536 L700 528"
            fill="none" stroke="#F59E0B" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M84 556 L150 542 L220 548 L286 534 L352 544 L420 528 L488 540 L556 526 L624 536 L700 528 L700 580 L84 580 Z"
            fill="#F59E0B" opacity=".12"/>
      <g stroke="#2F6BFF" stroke-width="1.2" stroke-dasharray="3 4" opacity=".8">
        <line x1="420" y1="528" x2="420" y2="576"/><line x1="556" y1="526" x2="556" y2="576"/>
      </g>
      <text x="82" y="520" fill="#8FA0B8" font-size="11" font-family="sans-serif">地形剖面 · 实时重建</text>
      <text x="428" y="570" fill="#F59E0B" font-size="11" font-weight="700" font-family="sans-serif">18.4°</text>
      <text x="564" y="570" fill="#F59E0B" font-size="11" font-weight="700" font-family="sans-serif">3.2m</text>
    </g>`),

  /* 毫米波倒车雷达：后方探测弧 */
  radar: () => sceneBase(`
    <g fill="none" stroke="#F59E0B">
      <circle cx="330" cy="440" r="86" stroke-width="3" opacity=".92"/>
      <circle cx="330" cy="440" r="146" stroke-width="2.4" opacity=".58"/>
      <circle cx="330" cy="440" r="206" stroke-width="2" opacity=".30"/>
    </g>
    <circle cx="330" cy="440" r="7" fill="#F59E0B"/>
    <g transform="translate(66,168)">
      <path d="M0 46 L28 0 L56 46 Z" fill="#F59E0B"/>
      <text x="28" y="39" text-anchor="middle" fill="#fff" font-size="24" font-weight="700" font-family="sans-serif">!</text>
      <rect x="68" y="8" width="158" height="38" rx="10" fill="#0B1220" opacity=".9"/>
      <text x="82" y="33" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">后方 2.4 m</text>
    </g>`),

  /* 多设备快速切换：设备列表 */
  switch: () => sceneBase(`
    <g transform="translate(470,140)">
      <rect width="300" height="308" rx="14" fill="#FFFFFF" opacity=".96"/>
      <rect width="300" height="308" rx="14" fill="none" stroke="#DDE2EA"/>
      <text x="24" y="38" fill="#0B1220" font-size="14" font-weight="700" font-family="sans-serif">设备列表</text>
      <text x="276" y="38" text-anchor="end" fill="#9AA3B2" font-size="11" font-family="sans-serif">3 台在线</text>
      <g font-family="sans-serif" font-size="12.5">
        <g transform="translate(16,58)">
          <rect width="268" height="66" rx="10" fill="#FFF3E7" stroke="#F59E0B"/>
          <rect x="12" y="16" width="34" height="34" rx="8" fill="#F59E0B" opacity=".18"/>
          <text x="60" y="28" fill="#0B1220" font-weight="700">挖掘机 A-01</text>
          <text x="60" y="48" fill="#6B7280" font-size="11">煤矿 · 运行中</text>
          <circle cx="250" cy="33" r="5" fill="#3DDC97"/>
        </g>
        <g transform="translate(16,132)">
          <rect width="268" height="66" rx="10" fill="#F7F8FA"/>
          <rect x="12" y="16" width="34" height="34" rx="8" fill="#0B1220" opacity=".08"/>
          <text x="60" y="28" fill="#0B1220" font-weight="700">装载机 B-07</text>
          <text x="60" y="48" fill="#6B7280" font-size="11">港口 · 待接管</text>
        </g>
        <g transform="translate(16,206)">
          <rect width="268" height="66" rx="10" fill="#F7F8FA"/>
          <rect x="12" y="16" width="34" height="34" rx="8" fill="#0B1220" opacity=".08"/>
          <text x="60" y="28" fill="#0B1220" font-weight="700">挖掘机 C-12</text>
          <text x="60" y="48" fill="#6B7280" font-size="11">危化 · 待接管</text>
        </g>
      </g>
    </g>
    <g transform="translate(196,236)">
      <rect width="150" height="36" rx="18" fill="#2F6BFF"/>
      <text x="75" y="24" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">一键切换 3s</text>
      <path d="M158 18 L214 18" stroke="#2F6BFF" stroke-width="2" stroke-dasharray="5 4"/>
    </g>`),
};

/* ---------- 模块3：系统界面 Mock（1600×750） ---------- */
const SCREEN_FRAME = (title, body) => `
<svg viewBox="0 0 1600 750" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="ui" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0C1526"/><stop offset="100%" stop-color="#070E1C"/>
    </linearGradient>
    <linearGradient id="ac" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="750" fill="url(#ui)"/>
  <rect width="1600" height="58" fill="#101B30"/>
  <g transform="translate(24,29)">
    <circle r="6" cx="0" cy="-18" fill="#33415A"/><circle r="6" cx="22" cy="-18" fill="#33415A"/><circle r="6" cx="44" cy="-18" fill="#33415A"/>
  </g>
  <text x="110" y="34" fill="#9FB0C8" font-size="15" font-family="sans-serif" letter-spacing="1.5">天远远程驾驶控制系统</text>
  <text x="1520" y="34" text-anchor="end" fill="#F59E0B" font-size="15" font-weight="700" font-family="sans-serif">${title}</text>
  <rect x="0" y="58" width="230" height="692" fill="#0B1425"/>
  <g fill="#5B6B85" font-size="14" font-family="sans-serif">
    <rect x="16" y="88" width="198" height="42" rx="8" fill="#F59E0B" opacity=".14"/>
    <text x="34" y="115" fill="#F59E0B" font-weight="700">${title}</text>
    <text x="34" y="176">设备总览</text>
    <text x="34" y="218">视频回传</text>
    <text x="34" y="260">作业记录</text>
    <text x="34" y="302">标定设置</text>
    <text x="34" y="344">告警中心</text>
  </g>
  <line x1="230" y1="58" x2="230" y2="750" stroke="#1A2740"/>
  ${body}
</svg>`;

window.SCREENS = {
  joy: () => SCREEN_FRAME("操纵杆速度标定", `
    <g transform="translate(290,110)">
      <text x="0" y="0" fill="#fff" font-size="24" font-weight="700" font-family="sans-serif">行程—速度曲线</text>
      <text x="0" y="30" fill="#7688A2" font-size="14" font-family="sans-serif">把手柄行程与设备动作速度做线性匹配，形成稳定手感</text>
      <g transform="translate(0,72)">
        <rect width="760" height="430" rx="14" fill="#0A1424" stroke="#1B2942"/>
        <g stroke="#1E2C46">
          <line x1="70" y1="70" x2="710" y2="70"/><line x1="70" y1="150" x2="710" y2="150"/>
          <line x1="70" y1="230" x2="710" y2="230"/><line x1="70" y1="310" x2="710" y2="310"/>
          <line x1="70" y1="370" x2="710" y2="370"/>
        </g>
        <line x1="70" y1="40" x2="70" y2="380" stroke="#2A3A56"/>
        <line x1="70" y1="380" x2="720" y2="380" stroke="#2A3A56"/>
        <path d="M70 380 L190 330 L310 268 L430 196 L550 128 L680 66"
              fill="none" stroke="url(#ac)" stroke-width="4" stroke-linecap="round"/>
        <g fill="#F59E0B">
          <circle cx="190" cy="330" r="6"/><circle cx="310" cy="268" r="6"/><circle cx="430" cy="196" r="6"/>
          <circle cx="550" cy="128" r="6"/><circle cx="680" cy="66" r="6"/>
        </g>
        <text x="70" y="410" fill="#5B6B85" font-size="12" font-family="sans-serif">0%</text>
        <text x="680" y="410" fill="#5B6B85" font-size="12" font-family="sans-serif">100%</text>
      </g>
    </g>
    <g transform="translate(1100,182)">
      <text x="0" y="0" fill="#fff" font-size="20" font-weight="700" font-family="sans-serif">标定流程</text>
      <g font-family="sans-serif">
        <g transform="translate(0,34)"><rect width="380" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="16" fill="#F59E0B"/><text x="34" y="42" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">1</text><text x="66" y="42" fill="#DCE5F2" font-size="16">进入标定界面</text></g>
        <g transform="translate(0,120)"><rect width="380" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="16" fill="#F59E0B"/><text x="34" y="42" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">2</text><text x="66" y="42" fill="#DCE5F2" font-size="16">推杆完成行程采集</text></g>
        <g transform="translate(0,206)"><rect width="380" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="16" fill="#F59E0B"/><text x="34" y="42" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">3</text><text x="66" y="42" fill="#DCE5F2" font-size="16">保存并下发至设备</text></g>
      </g>
      <g transform="translate(0,318)">
        <rect width="380" height="120" rx="10" fill="#F59E0B" opacity=".10" stroke="#F59E0B" stroke-opacity=".35"/>
        <text x="22" y="38" fill="#F59E0B" font-size="13" font-weight="700" font-family="sans-serif">当前机型</text>
        <text x="22" y="74" fill="#fff" font-size="22" font-weight="700" font-family="sans-serif">SY215C · 挖掘机</text>
        <text x="22" y="100" fill="#7688A2" font-size="13" font-family="sans-serif">已完成标定 · 2026-10-28</text>
      </g>
    </g>`),

  ring360: () => SCREEN_FRAME("360° 环视", `
    <g transform="translate(280,100)">
      <g>
        <rect width="620" height="280" rx="10" fill="#0F1B2E" stroke="#1B2942"/>
        <rect x="630" width="620" height="280" rx="10" fill="#0F1B2E" stroke="#1B2942"/>
        <rect y="290" width="620" height="280" rx="10" fill="#0F1B2E" stroke="#1B2942"/>
        <rect x="630" y="290" width="620" height="280" rx="10" fill="#0F1B2E" stroke="#1B2942"/>
      </g>
      <g fill="#3D5372" font-family="sans-serif" font-size="13">
        <text x="24" y="32">CAM 01 · 前视</text><text x="654" y="32">CAM 02 · 后视</text>
        <text x="24" y="322">CAM 03 · 左前</text><text x="654" y="322">CAM 04 · 右前</text>
      </g>
      <g fill="#16233A">
        <rect x="40" y="60" width="540" height="190" rx="6"/><rect x="670" y="60" width="540" height="190" rx="6"/>
        <rect x="40" y="350" width="540" height="190" rx="6"/><rect x="670" y="350" width="540" height="190" rx="6"/>
      </g>
      <g fill="none" stroke="#F59E0B" stroke-width="2" opacity=".8">
        <rect x="250" y="130" width="130" height="60" rx="6"/><rect x="880" y="130" width="130" height="60" rx="6"/>
        <rect x="250" y="420" width="130" height="60" rx="6"/><rect x="880" y="420" width="130" height="60" rx="6"/>
      </g>
      <g fill="#5B7BA8" font-family="sans-serif" font-size="12">
        <text x="262" y="166">目标 · 人员</text><text x="892" y="166">目标 · 车辆</text>
        <text x="262" y="456">目标 · 路肩</text><text x="892" y="456">目标 · 料堆</text>
      </g>
    </g>
    <g transform="translate(1080,140)">
      <text x="0" y="0" fill="#fff" font-size="20" font-weight="700" font-family="sans-serif">鸟瞰拼接</text>
      <g transform="translate(0,34)">
        <rect width="460" height="460" rx="14" fill="#0A1424" stroke="#1B2942"/>
        <circle cx="230" cy="230" r="160" fill="none" stroke="#1F3050" stroke-dasharray="6 8"/>
        <circle cx="230" cy="230" r="105" fill="none" stroke="#1F3050" stroke-dasharray="6 8"/>
        <g transform="translate(230,230)">
          <rect x="-56" y="-34" width="112" height="68" rx="10" fill="#F59E0B"/>
          <rect x="-34" y="-14" width="68" height="28" rx="6" fill="#FFC61A"/>
          <circle cx="0" cy="0" r="118" fill="none" stroke="#2F6BFF" stroke-width="2" opacity=".7"/>
        </g>
        <g fill="#3DDC97"><circle cx="230" cy="96" r="6"/><circle cx="230" cy="364" r="6"/><circle cx="96" cy="230" r="6"/><circle cx="364" cy="230" r="6"/></g>
      </g>
    </g>`),

  radar: () => SCREEN_FRAME("毫米波倒车雷达", `
    <g transform="translate(290,110)">
      <text x="0" y="0" fill="#fff" font-size="24" font-weight="700" font-family="sans-serif">后方探测视图</text>
      <g transform="translate(0,40)">
        <rect width="760" height="470" rx="14" fill="#0A1424" stroke="#1B2942"/>
        <g transform="translate(380,235)">
          <rect x="-70" y="-44" width="140" height="88" rx="12" fill="#1B2942" stroke="#33475F"/>
          <text x="0" y="8" text-anchor="middle" fill="#8FA0B8" font-size="14" font-family="sans-serif">设备</text>
          <g fill="none" stroke="#F59E0B" stroke-width="3">
            <path d="M-96 48 A150 150 0 0 0 96 48"/>
            <path d="M-140 90 A220 220 0 0 0 140 90" opacity=".6"/>
            <path d="M-184 132 A290 290 0 0 0 184 132" opacity=".3"/>
          </g>
          <g fill="#F59E0B"><circle cx="0" cy="150" r="9"/></g>
          <text x="0" y="196" text-anchor="middle" fill="#F59E0B" font-size="15" font-weight="700" font-family="sans-serif">2.4 m · 二级告警</text>
        </g>
      </g>
    </g>
    <g transform="translate(1100,182)">
      <text x="0" y="0" fill="#fff" font-size="20" font-weight="700" font-family="sans-serif">分级告警</text>
      <g font-family="sans-serif">
        <g transform="translate(0,34)"><rect width="400" height="80" rx="10" fill="#F59E0B" opacity=".12" stroke="#F59E0B" stroke-opacity=".4"/><text x="22" y="34" fill="#F59E0B" font-size="14" font-weight="700">一级 · 3.5 m</text><text x="22" y="60" fill="#C9D6E8" font-size="13">提示音 · 屏幕描边</text></g>
        <g transform="translate(0,126)"><rect width="400" height="80" rx="10" fill="#F59E0B" opacity=".18" stroke="#F59E0B" stroke-opacity=".5"/><text x="22" y="34" fill="#F59E0B" font-size="14" font-weight="700">二级 · 2.4 m</text><text x="22" y="60" fill="#C9D6E8" font-size="13">急促报警 · 建议减速</text></g>
        <g transform="translate(0,218)"><rect width="400" height="80" rx="10" fill="#E4483B" opacity=".18" stroke="#E4483B" stroke-opacity=".5"/><text x="22" y="34" fill="#FF7C70" font-size="14" font-weight="700">三级 · 1.2 m</text><text x="22" y="60" fill="#C9D6E8" font-size="13">强制限速 · 联动制动</text></g>
      </g>
      <g transform="translate(0,330)">
        <text x="0" y="0" fill="#7688A2" font-size="13" font-family="sans-serif">穿透粉尘 / 雨雾 · 全天候可用</text>
      </g>
    </g>`),

  spot: () => SCREEN_FRAME("挖斗落点辅助", `
    <g transform="translate(290,110)">
      <text x="0" y="0" fill="#fff" font-size="24" font-weight="700" font-family="sans-serif">落点预标注</text>
      <g transform="translate(0,40)">
        <rect width="760" height="470" rx="14" fill="#0A1424" stroke="#1B2942"/>
        <g transform="translate(70,330)">
          <rect x="-20" y="0" width="220" height="60" rx="8" fill="#1B2942"/>
          <text x="90" y="36" text-anchor="middle" fill="#8FA0B8" font-size="13" font-family="sans-serif">自卸车</text>
        </g>
        <circle cx="180" cy="250" r="34" fill="none" stroke="#F59E0B" stroke-width="3"/>
        <circle cx="180" cy="250" r="6" fill="#F59E0B"/>
        <line x1="180" y1="190" x2="180" y2="310" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="5 5"/>
        <line x1="120" y1="250" x2="240" y2="250" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="5 5"/>
        <path d="M470 120 Q380 180 200 244" fill="none" stroke="#2F6BFF" stroke-width="3" stroke-dasharray="8 7"/>
        <text x="196" y="330" fill="#F59E0B" font-size="14" font-weight="700" font-family="sans-serif">落点偏差 0.12 m</text>
        <text x="470" y="104" fill="#7688A2" font-size="13" font-family="sans-serif">斗齿轨迹</text>
      </g>
    </g>
    <g transform="translate(1100,182)">
      <text x="0" y="0" fill="#fff" font-size="20" font-weight="700" font-family="sans-serif">作业效率</text>
      <g font-family="sans-serif">
        <g transform="translate(0,34)"><rect width="400" height="96" rx="10" fill="#0A1424" stroke="#1B2942"/><text x="22" y="32" fill="#7688A2" font-size="13">单次装车到位率</text><text x="22" y="72" fill="#F59E0B" font-size="30" font-weight="700">92%</text></g>
        <g transform="translate(0,146)"><rect width="400" height="96" rx="10" fill="#0A1424" stroke="#1B2942"/><text x="22" y="32" fill="#7688A2" font-size="13">空挖次数</text><text x="22" y="72" fill="#F59E0B" font-size="30" font-weight="700">-37%</text></g>
        <g transform="translate(0,258)"><rect width="400" height="96" rx="10" fill="#0A1424" stroke="#1B2942"/><text x="22" y="32" fill="#7688A2" font-size="13">场地修整工时</text><text x="22" y="72" fill="#F59E0B" font-size="30" font-weight="700">-28%</text></g>
      </g>
    </g>`),

  talk: () => SCREEN_FRAME("语音对讲", `
    <g transform="translate(290,110)">
      <text x="0" y="0" fill="#fff" font-size="24" font-weight="700" font-family="sans-serif">实时双向通话</text>
      <g transform="translate(0,40)">
        <rect width="760" height="470" rx="14" fill="#0A1424" stroke="#1B2942"/>
        <g transform="translate(380,180)">
          <circle r="76" fill="#F59E0B" opacity=".14"/>
          <circle r="76" fill="none" stroke="#F59E0B" stroke-opacity=".5"/>
          <g fill="#F59E0B">
            <rect x="-12" y="-34" width="24" height="46" rx="12"/>
            <path d="M-24 -6a24 24 0 0 0 48 0" fill="none" stroke="#F59E0B" stroke-width="4"/>
            <line x1="0" y1="18" x2="0" y2="34" stroke="#F59E0B" stroke-width="4"/>
            <line x1="-12" y1="34" x2="12" y2="34" stroke="#F59E0B" stroke-width="4"/>
          </g>
        </g>
        <g transform="translate(120,300)" fill="#2F6BFF" opacity=".85">
          <rect x="0" y="-16" width="6" height="32" rx="3"/><rect x="14" y="-34" width="6" height="68" rx="3"/>
          <rect x="28" y="-26" width="6" height="52" rx="3"/><rect x="42" y="-46" width="6" height="92" rx="3"/>
          <rect x="56" y="-20" width="6" height="40" rx="3"/><rect x="70" y="-38" width="6" height="76" rx="3"/>
          <rect x="84" y="-28" width="6" height="56" rx="3"/><rect x="98" y="-14" width="6" height="28" rx="3"/>
          <rect x="112" y="-40" width="6" height="80" rx="3"/><rect x="126" y="-22" width="6" height="44" rx="3"/>
          <rect x="140" y="-32" width="6" height="64" rx="3"/><rect x="154" y="-12" width="6" height="24" rx="3"/>
          <rect x="168" y="-36" width="6" height="72" rx="3"/><rect x="182" y="-24" width="6" height="48" rx="3"/>
          <rect x="196" y="-44" width="6" height="88" rx="3"/><rect x="210" y="-18" width="6" height="36" rx="3"/>
          <rect x="224" y="-30" width="6" height="60" rx="3"/><rect x="238" y="-10" width="6" height="20" rx="3"/>
          <rect x="252" y="-34" width="6" height="68" rx="3"/><rect x="266" y="-22" width="6" height="44" rx="3"/>
        </g>
        <g transform="translate(120,338)">
          <rect width="300" height="44" rx="22" fill="#16233A"/>
          <circle cx="26" cy="22" r="9" fill="#3DDC97"/>
          <text x="48" y="28" fill="#C9D6E8" font-size="14" font-family="sans-serif">对讲中 · 延迟 120ms</text>
        </g>
      </g>
    </g>
    <g transform="translate(1100,182)">
      <text x="0" y="0" fill="#fff" font-size="20" font-weight="700" font-family="sans-serif">在线席位</text>
      <g font-family="sans-serif">
        <g transform="translate(0,34)"><rect width="400" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="18" fill="#F59E0B"/><text x="34" y="42" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">操</text><text x="66" y="42" fill="#DCE5F2" font-size="15">远程操作员 · 主控</text></g>
        <g transform="translate(0,118)"><rect width="400" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="18" fill="#2F6BFF"/><text x="34" y="42" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">现</text><text x="66" y="42" fill="#DCE5F2" font-size="15">现场安全员</text></g>
        <g transform="translate(0,202)"><rect width="400" height="72" rx="10" fill="#0A1424" stroke="#1B2942"/><circle cx="34" cy="36" r="18" fill="#3DDC97"/><text x="34" y="42" text-anchor="middle" fill="#06121F" font-size="13" font-weight="700">调</text><text x="66" y="42" fill="#DCE5F2" font-size="15">调度中心</text></g>
      </g>
      <g transform="translate(0,306)">
        <rect width="400" height="96" rx="10" fill="#F59E0B" opacity=".10" stroke="#F59E0B" stroke-opacity=".35"/>
        <text x="22" y="34" fill="#F59E0B" font-size="13" font-weight="700" font-family="sans-serif">通话质量</text>
        <text x="22" y="72" fill="#fff" font-size="26" font-weight="700" font-family="sans-serif">优 · 双向无卡顿</text>
      </g>
    </g>`),
};
