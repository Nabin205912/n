/* Sathi Printing Press - GitHub Pages + Google Apps Script + Google Sheets */
const API_URL = (typeof APPS_SCRIPT_URL === 'string' ? APPS_SCRIPT_URL : '').trim();

function parseApiText(text){
  const raw = String(text ?? '').trim();
  if(!raw) throw new Error('Apps Script returned an empty response. Please check the Web App deployment.');
  try { return JSON.parse(raw); }
  catch(e){
    if(/^<!doctype html|^<html/i.test(raw)){
      throw new Error('Apps Script returned an HTML page instead of JSON. Redeploy the Web App as Execute as: Me and Who has access: Anyone.');
    }
    throw new Error('Apps Script returned an invalid JSON response.');
  }
}

async function apiPost(payload){
  if(!API_URL) throw new Error('Apps Script URL is not configured.');
  const body = new URLSearchParams();
  Object.entries(payload || {}).forEach(([k,v])=>{
    if(v !== undefined && v !== null) body.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  });
  const res = await fetch(API_URL, {method:'POST', body, redirect:'follow'});
  const data = parseApiText(await res.text());
  if(!data || data.ok === false) throw new Error(data?.error || 'Request failed');
  return data;
}

async function apiGet(params){
  if(!API_URL) throw new Error('Apps Script URL is not configured.');
  const qs = new URLSearchParams(params || {});
  const res = await fetch(API_URL + '?' + qs.toString(), {method:'GET', redirect:'follow'});
  const data = parseApiText(await res.text());
  if(!data || data.ok === false) throw new Error(data?.error || 'Request failed');
  return data;
}

const orderForm = document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const msg = document.getElementById('msg');
    const btn = orderForm.querySelector('button[type="submit"]');
    const f = new FormData(orderForm);
    const payload = {
      action:'createOrder', name:String(f.get('name')||''), phone:String(f.get('phone')||''),
      product:String(f.get('product')||'Other'), quantity:Number(f.get('qty')||1),
      instructions:String(f.get('instructions')||'')
    };
    msg.style.color='#0b5fc6'; msg.textContent='Submitting order...';
    if(btn) btn.disabled=true;
    try{
      const r = await apiPost(payload);
      msg.innerHTML = `<b>Order submitted successfully.</b><br>Your Order ID: <strong>${escapeHtml(r.orderId)}</strong><br>Save this ID to track your order.`;
      msg.style.color='#08723d'; orderForm.reset();
      const qty=orderForm.querySelector('[name="qty"]'); if(qty) qty.value=100;
    }catch(err){
      msg.textContent='Order could not be submitted: '+err.message; msg.style.color='#b0002b';
    }finally{ if(btn) btn.disabled=false; }
  });
}

const trackForm = document.getElementById('trackForm');
if(trackForm){
  trackForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const id=String(new FormData(trackForm).get('orderId')||'').trim();
    const box=document.getElementById('trackResult');
    const btn=trackForm.querySelector('button[type="submit"]');
    if(!id){ box.innerHTML='<p>Please enter your Order ID.</p>'; return; }
    box.innerHTML='<p>Checking order...</p>'; if(btn) btn.disabled=true;
    try{
      let r;
      try { r = await apiPost({action:'track',orderId:id}); }
      catch(postErr){
        // Fallback for older Apps Script deployments that expose tracking through doGet().
        r = await apiGet({action:'track',orderId:id});
      }
      const o=r.order || r;
      if(!o || (!o.orderId && !o.id && !o.status)) throw new Error('Order not found. Please check the Order ID.');
      box.innerHTML=`<div style="background:#fff;color:#102a43;padding:18px;border-radius:14px"><b>${escapeHtml(o.orderId||o.id||id)}</b><p>${escapeHtml(o.product||'Order')} • Qty ${escapeHtml(o.quantity||'')}</p><strong style="color:#087a4d">Status: ${escapeHtml(o.status||o.orderStatus||'Pending')}</strong>${o.updatedAt?`<p style="margin-bottom:0">Last updated: ${escapeHtml(o.updatedAt)}</p>`:''}</div>`;
    }catch(err){
      box.innerHTML=`<div style="background:#fff0f1;color:#b0002b;padding:12px;border-radius:10px">${escapeHtml(err.message||'Order not found.')}</div>`;
    }finally{ if(btn) btn.disabled=false; }
  });
}

function escapeHtml(v){return String(v ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
