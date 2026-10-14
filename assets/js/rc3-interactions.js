document.addEventListener('DOMContentLoaded',()=>{
 const backdrop=document.querySelector('[data-modal-backdrop]');if(!backdrop)return;
 const modal=backdrop.querySelector('.modal-card');const closeBtn=backdrop.querySelector('[data-modal-close]');let lastTrigger=null;
 backdrop.setAttribute('role','presentation');modal?.setAttribute('role','dialog');modal?.setAttribute('aria-modal','true');
 const close=()=>{backdrop.classList.remove('open');document.body.style.overflow='';lastTrigger?.focus()};
 document.querySelectorAll('[data-guide]').forEach(a=>a.addEventListener('click',()=>{lastTrigger=a;document.body.style.overflow='hidden';requestAnimationFrame(()=>closeBtn?.focus())}));
 closeBtn?.setAttribute('aria-label','Close guide request');closeBtn?.addEventListener('click',e=>{e.preventDefault();close()});
 backdrop.addEventListener('click',e=>{if(e.target===backdrop)close()});
 document.addEventListener('keydown',e=>{if(!backdrop.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){const items=[...backdrop.querySelectorAll('button:not([disabled]),input:not([type="hidden"]):not([disabled]),a[href],select,textarea')].filter(x=>x.getClientRects().length);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
});
