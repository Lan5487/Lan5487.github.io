/* 智慧矿山管理系统 · 交互脚本 */
(function () {
  'use strict';

  /* ---------- 1. 滚动入场 ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 2. 核心效果数字滚动 ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- 3. 获取方案弹层（样式/交互对齐智能头盔页「联系我们」） ---------- */
  var modal = document.getElementById('leadModal');
  var form = document.getElementById('leadForm');
  var okEl = document.getElementById('leadOk');
  var submitBtn = form ? form.querySelector('.cform__submit') : null;
  var lastFocus = null;

  function resetModal() {
    form.reset();
    okEl.hidden = true;
    okEl.textContent = '';
    okEl.style.color = '';
    submitBtn.disabled = false;
    submitBtn.textContent = '提交';
  }
  function openModal() {
    lastFocus = document.activeElement;
    resetModal();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var first = form.querySelector('input');
    if (first) first.focus({ preventScroll: true });
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  /* 点击遮罩空白处关闭 */
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------- 4. 表单提交 ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var company = String(fd.get('company') || '').trim();
    var contact = String(fd.get('contact') || '').trim();
    if (!company || !contact) {
      okEl.hidden = false;
      okEl.style.color = '#ff8f8f';
      okEl.textContent = '请填写完整的公司名称与联系方式。';
      return;
    }
    okEl.hidden = false;
    okEl.style.color = '';
    okEl.textContent = '已收到您的信息，我们会尽快与您联系。';
    submitBtn.disabled = true;
    submitBtn.textContent = '已提交';
  });
})();
