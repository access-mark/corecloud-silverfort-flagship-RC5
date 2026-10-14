(function(){
  const cfg = window.CORECLOUD_CONFIG || {};
  const storageKey = cfg.STORAGE_KEY || 'corecloud_static_leads';

  function safeJson(value){
    try { return JSON.parse(value || '[]'); } catch(e){ return []; }
  }

  function storeLocal(payload){
    const existing = safeJson(localStorage.getItem(storageKey));
    existing.push(payload);
    localStorage.setItem(storageKey, JSON.stringify(existing));
  }

  async function sendToSheet(payload){
    const url = cfg.GOOGLE_APPS_SCRIPT_URL;
    if(!url) return { ok:false, mode:'local', reason:'No Apps Script URL configured' };
    try{
      await fetch(url, {
        method:'POST',
        mode:'no-cors',
        headers:{ 'Content-Type':'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      return { ok:false, mode:'unverified', reason:'Request sent, delivery cannot be confirmed with no-cors' };
    }catch(err){
      return { ok:false, mode:'local', reason: err.message || 'Submission failed' };
    }
  }

  async function capture(payload){
    const enriched = Object.assign({
      id: 'CC-' + Date.now() + '-' + Math.random().toString(16).slice(2,8),
      createdAt: new Date().toISOString(),
      page: location.pathname.split('/').pop() || 'index.html',
      userAgent: navigator.userAgent
    }, payload || {});
    storeLocal(enriched);
    const remote = await sendToSheet(enriched);
    return Object.assign({ payload: enriched }, remote);
  }

  function formToPayload(form){
    const data = Object.fromEntries(new FormData(form).entries());
    return Object.assign(data, {
      source: form.getAttribute('data-lead-source') || form.getAttribute('data-lead-type') || 'FORM',
      type: form.getAttribute('data-lead-type') || 'LEAD'
    });
  }

  function setNote(form, text){
    const note = form.querySelector('[data-form-note]') || document.querySelector('[data-form-note]');
    if(note) note.textContent = text;
  }

  window.CoreCloudLeadCapture = { capture, storeLocal, sendToSheet, formToPayload };

  document.addEventListener('submit', async function(e){
    const form = e.target.closest('[data-corecloud-capture]');
    if(!form) return;
    e.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    if(submit) { submit.disabled = true; submit.dataset.originalText = submit.textContent; submit.textContent = 'Submitting...'; }
    const payload = formToPayload(form);
    const result = await capture(payload);
    const modeText = result.mode === 'unverified' ? 'Submission sent, but receipt is not confirmed. Please contact sales@corecloudza.com if urgent.' : 'This assessment is saved only in this browser. To send it to CoreCloud, email sales@corecloudza.com.';
    setNote(form, modeText);
    form.dispatchEvent(new CustomEvent('corecloud:capture:complete', { bubbles:true, detail: result }));
    if(submit) { submit.disabled = false; submit.textContent = submit.dataset.originalText || 'Submit'; }
  });
})();
