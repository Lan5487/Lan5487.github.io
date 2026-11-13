/* 天远科技集团官网 — 全站公用「在线询价」留资弹窗组件
 * 样式与【产品与服务 - 技研(GIKEN)静压植桩机】页的「在线询价」表单完全一致（同一套 pp-modal / pp-form）。
 * 用法：
 *   1) 在页面中放置热区按钮：<button type="button" class="js-inquiry"
 *        data-model="产品型号" data-title="弹窗标题" style="left:..%;top:..%;width:..%;height:..%;"></button>
 *      热区必须有一个 position:relative 的父容器（可给该容器加 class="inquiry-host"）。
 *   2) 页面任意位置引入本脚本：<script src="assets/js/inquiry-modal.js"></script>
 * 提交：POST /api/lead（fire-and-forget，后端不可用时不影响用户提示）。
 */
(function () {
  'use strict';

  var CSS = ''
    /* ---- 热区 ---- */
    + '.inquiry-host{position:relative;}'
    + 'button.js-inquiry{position:absolute;display:block;border:0;padding:0;margin:0;'
    + 'background:transparent;cursor:pointer;z-index:11;-webkit-appearance:none;appearance:none;}'
    + 'button.js-inquiry:focus-visible{outline:2px solid #0b308e;outline-offset:2px;}'
    /* ---- 弹窗（与技研页 pp-modal 同一套样式） ---- */
    + '.pp-modal-overlay{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;'
    + 'justify-content:center;padding:16px;background:rgba(8,18,40,0.55);'
    + '-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);'
    + 'opacity:0;visibility:hidden;pointer-events:none;'
    + 'transition:opacity .25s cubic-bezier(0.23,1,0.32,1),visibility .25s cubic-bezier(0.23,1,0.32,1);}'
    + '.pp-modal-overlay.is-open{opacity:1;visibility:visible;pointer-events:auto;}'
    + '.pp-modal{position:relative;display:flex;flex-direction:column;width:100%;max-width:920px;'
    + 'max-height:90vh;background:#fff;border-radius:12px;box-shadow:0 24px 70px rgba(8,18,40,0.35);'
    + 'overflow:hidden;transform:scale(0.95);opacity:0;'
    + 'transition:transform .25s cubic-bezier(0.23,1,0.32,1),opacity .25s cubic-bezier(0.23,1,0.32,1);}'
    + '.pp-modal-overlay.is-open .pp-modal{transform:scale(1);opacity:1;}'
    + '.pp-modal__header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;'
    + 'border-bottom:1px solid #eef0f4;flex:0 0 auto;}'
    + '.pp-modal__title{margin:0;font-size:17px;font-weight:600;color:#0b308e;}'
    + '.pp-modal__close{border:0;background:transparent;font-size:26px;line-height:1;color:#8a92a6;'
    + 'cursor:pointer;width:36px;height:36px;border-radius:8px;'
    + 'transition:background .15s ease,color .15s ease;}'
    + '.pp-modal__close:hover{background:#f2f4f8;color:#0b308e;}'
    /* 询价表单 */
    + '.pp-form{padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;}'
    + '.pp-form__row{display:flex;flex-direction:column;gap:6px;}'
    + '.pp-form__row label{font-size:13px;color:#4a5160;font-weight:500;}'
    + '.pp-form__row .req{color:#e8453c;}'
    + '.pp-form input,.pp-form textarea{font:inherit;font-size:14px;padding:10px 12px;'
    + 'border:1px solid #d7dce6;border-radius:8px;color:#1c2230;background:#fff;'
    + 'transition:border-color .15s ease,box-shadow .15s ease;}'
    + '.pp-form input:focus,.pp-form textarea:focus{outline:none;border-color:#0b308e;'
    + 'box-shadow:0 0 0 3px rgba(11,48,142,0.12);}'
    + '.pp-form input[readonly]{background:#f3f5f9;color:#6b7385;}'
    + '.pp-modal__footer{display:flex;justify-content:flex-end;gap:10px;padding:14px 20px;'
    + 'border-top:1px solid #eef0f4;flex:0 0 auto;}'
    + '.pp-btn{font:inherit;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;'
    + 'border:1px solid #d7dce6;background:#fff;color:#333;cursor:pointer;'
    + 'transition:background .15s ease,transform .1s ease;}'
    + '.pp-btn:hover{background:#f2f4f8;}'
    + '.pp-btn:active{transform:scale(0.97);}'
    + '.pp-btn--primary{background:#0b308e;border-color:#0b308e;color:#fff;}'
    + '.pp-btn--primary:hover{background:#0a2a7d;}'
    + '.pp-form__success{background:#e8f6ee;color:#1f7a45;border:1px solid #b6e3c8;'
    + 'border-radius:8px;padding:10px 12px;font-size:14px;text-align:center;}'
    + '@media (prefers-reduced-motion:reduce){'
    + '.pp-modal-overlay,.pp-modal,.pp-modal-overlay.is-open .pp-modal{transition:opacity .2s ease;}'
    + '.pp-modal{transform:none;}}';

  var MODAL_HTML = ''
    + '<div class="pp-modal-overlay" id="jsInquiryModal" role="dialog" aria-modal="true" aria-labelledby="jsInquiryModalTitle">'
    + '<div class="pp-modal">'
    + '<div class="pp-modal__header">'
    + '<h3 id="jsInquiryModalTitle" class="pp-modal__title">产品询价</h3>'
    + '<button type="button" class="pp-modal__close" data-close aria-label="关闭">&times;</button>'
    + '</div>'
    + '<form class="pp-form" id="jsInquiryForm" novalidate>'
    + '<div class="pp-form__row"><label for="jsIqCompany">公司名称 <span class="req">*</span></label>'
    + '<input type="text" id="jsIqCompany" name="company" required placeholder="请输入公司名称"></div>'
    + '<div class="pp-form__row"><label for="jsIqModel">产品型号</label>'
    + '<input type="text" id="jsIqModel" name="model" readonly></div>'
    + '<div class="pp-form__row"><label for="jsIqQty">数量 <span class="req">*</span></label>'
    + '<input type="number" id="jsIqQty" name="qty" min="1" required placeholder="请输入采购数量"></div>'
    + '<div class="pp-form__row"><label for="jsIqName">姓名 <span class="req">*</span></label>'
    + '<input type="text" id="jsIqName" name="name" required placeholder="请输入您的姓名"></div>'
    + '<div class="pp-form__row"><label for="jsIqContact">联系方式 <span class="req">*</span></label>'
    + '<input type="text" id="jsIqContact" name="contact" required placeholder="电话或邮箱"></div>'
    + '<div class="pp-form__row"><label for="jsIqNote">备注</label>'
    + '<textarea id="jsIqNote" name="note" rows="3" placeholder="其他需求说明（选填）"></textarea></div>'
    + '<div class="pp-form__success" id="jsInquirySuccess" hidden>提交成功，我们会尽快与您联系！</div>'
    + '<div class="pp-modal__footer">'
    + '<button type="button" class="pp-btn" data-close>关闭</button>'
    + '<button type="submit" class="pp-btn pp-btn--primary">提交询价</button>'
    + '</div></form></div></div>';

  function injectStyle() {
    if (document.getElementById('inquiry-modal-style')) return;
    var st = document.createElement('style');
    st.id = 'inquiry-modal-style';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function openModal(ov) {
    ov.classList.add('is-open');
    ov.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var c = ov.querySelector('[data-close]');
    if (c) { requestAnimationFrame(function () { c.focus(); }); }
  }
  function closeModal(ov) {
    ov.classList.remove('is-open');
    ov.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function init() {
    var btns = document.querySelectorAll('button.js-inquiry');
    if (!btns.length) return;                 /* 本页无热区则不建弹窗 */
    injectStyle();

    var wrap = document.createElement('div');
    wrap.innerHTML = MODAL_HTML;
    var ov = wrap.firstChild;
    (document.body || document.documentElement).appendChild(ov);

    var form = ov.querySelector('#jsInquiryForm');
    var iqModel = ov.querySelector('#jsIqModel');
    var iqSuccess = ov.querySelector('#jsInquirySuccess');
    var iqTitle = ov.querySelector('#jsInquiryModalTitle');

    /* 遮罩点击关闭 / 关闭按钮 */
    ov.addEventListener('click', function (e) { if (e.target === ov) closeModal(ov); });
    ov.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { closeModal(ov); });
    });
    /* Esc 关闭：document 级监听（焦点可能不在弹窗内） */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('is-open')) closeModal(ov);
    });

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        form.reset();
        iqSuccess.hidden = true;
        iqModel.value = b.getAttribute('data-model') || '';
        iqTitle.textContent = (b.getAttribute('data-title') || '产品') + ' - 在线询价';
        openModal(ov);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      /* 静默提交留资：不阻塞成功提示，后端不可用时也不影响用户 */
      try {
        var payload = {};
        new FormData(form).forEach(function (v, k) { payload[k] = v; });
        payload.source = location.pathname;
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function () {});
      } catch (err) {}
      iqSuccess.hidden = false;
      setTimeout(function () { closeModal(ov); }, 1600);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
