// 留资查看 - 需口令 (EdgeOne Pages Function)
// 路由：GET /api/leads  （Header: Authorization: Bearer <口令>）
// 存储：与 lead.js 共用 KV 绑定变量 leads_kv

const TOKEN = 'TY@1234';

// 兼容两种绑定暴露方式：控制台绑定后有些环境挂成全局变量，有些挂在 context.env。
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
  const auth = context.request.headers.get('authorization') || '';
  if (auth !== `Bearer ${TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const kv = getKV(context);
  if (!kv) {
    return new Response(JSON.stringify({
      error: 'KV 未绑定：请在控制台绑定变量名 leads_kv 后重新部署',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  // 列出所有 lead:* 键（KV 列表可能分页，循环取完）
  const keys = [];
  let cursor = null;
  do {
    const opts = { prefix: 'lead:' };
    if (cursor) opts.cursor = cursor;
    const res = await kv.list(opts);
    if (res && Array.isArray(res.keys)) {
      for (const k of res.keys) keys.push(k.name);
    }
    cursor = res && res.list_complete ? null : (res ? res.cursor : null);
  } while (cursor);

  const rows = [];
  for (const name of keys) {
    const v = await kv.get(name);
    if (!v) continue;
    try {
      const obj = JSON.parse(v);
      if (obj && typeof obj === 'object') rows.push(obj);
    } catch (e) { /* 跳过损坏记录 */ }
  }

  // 新留资在前
  rows.sort((a, b) => (b.at || '').localeCompare(a.at || ''));

  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
