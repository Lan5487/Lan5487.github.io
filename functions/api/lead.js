// 在线询价留资 - 接收提交 (EdgeOne Pages Function)
// 存储：Makers / EdgeOne 内置 KV。
//       控制台里给本项目绑定的「变量名」必须叫 leads_kv（大小写敏感），
//       与下方 getKV() 中的引用一致。
// 路由：POST /api/lead    写入一条留资
//       GET  /api/lead    健康检查（返回 KV 是否已绑定可用）

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

// 兼容两种绑定暴露方式：控制台绑定后有些环境挂成全局变量，有些挂在 context.env。
// 未绑定时返回 null（而不是抛 ReferenceError），方便接口给出明确提示。
function getKV(context) {
  try {
    if (typeof leads_kv !== 'undefined' && leads_kv) return leads_kv;
  } catch (e) { /* 未定义为全局变量，继续尝试 env */ }
  try {
    const env = context && context.env;
    if (env && env.leads_kv) return env.leads_kv;
  } catch (e) { /* 忽略 */ }
  return null;
}

export async function onRequestGet(context) {
  const kv = getKV(context);
  return json({ ok: !!kv, bound: !!kv, hint: kv ? '' : 'KV 未绑定：请在控制台绑定变量名 leads_kv 后重新部署' });
}

export async function onRequestPost(context) {
  const kv = getKV(context);
  if (!kv) {
    return json({ ok: false, msg: 'KV 未绑定：请在控制台绑定变量名 leads_kv 后重新部署' }, 500);
  }

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    body = null;
  }
  if (!body || typeof body !== 'object') {
    return json({ ok: false, msg: '请求格式错误' }, 400);
  }

  // 必填字段（与两个询价表单的 required 字段一致）
  const required = ['company', 'qty', 'name', 'contact'];
  for (const k of required) {
    if (!body[k] || String(body[k]).trim() === '') {
      return json({ ok: false, msg: `字段 ${k} 必填` }, 400);
    }
  }

  // 仅保留已知字段，避免脏数据写入
  const record = {
    company: clean(body.company, 200),
    model: clean(body.model, 200),
    qty: clean(body.qty, 20),
    name: clean(body.name, 100),
    contact: clean(body.contact, 200),
    note: clean(body.note, 1000),
    source: clean(body.source, 200),
    ip: context.request.headers.get('x-real-ip') ||
         context.request.headers.get('cf-connecting-ip') || '',
    at: new Date().toISOString(),
  };

  const key = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
  await kv.put(key, JSON.stringify(record));

  return json({ ok: true });
}
