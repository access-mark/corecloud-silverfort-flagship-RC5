(function(){
  const backdrop=document.querySelector('[data-modal-backdrop]');
  const close=document.querySelector('[data-modal-close]');
  const title=document.querySelector('[data-guide-title]');
  const asset=document.querySelector('[data-guide-asset]');
  const cfg=window.CORECLOUD_CONFIG||{};

  let lastTrigger=null;
  const closeModal=()=>{if(!backdrop)return;backdrop.classList.remove('open');document.body.style.overflow='';lastTrigger?.focus()};
  close?.addEventListener('click',e=>{e.preventDefault();closeModal()});
  backdrop?.addEventListener('click',e=>{if(e.target===backdrop)closeModal()});
  document.addEventListener('keydown',e=>{if(!backdrop?.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();closeModal()}else if(e.key==='Tab'){const focusable=[...backdrop.querySelectorAll('button:not([disabled]),input:not([type="hidden"]):not([disabled]),a[href],select,textarea')].filter(el=>el.getClientRects().length);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  document.querySelectorAll('[data-guide]').forEach(card=>{
    card.addEventListener('click',(e)=>{
      e.preventDefault();
      lastTrigger=card;document.body.style.overflow='hidden';
      const guide=card.getAttribute('data-guide');
      if(title) title.textContent='Complete the form to receive the Executive Guide to '+guide+'.';
      if(asset) asset.value=guide;
      const form = document.querySelector('[data-lead-form]');
      const guideUrl = cfg.GUIDE_ASSETS && cfg.GUIDE_ASSETS[guide];
      if(form && guideUrl){
        const next = form.querySelector('input[name="_next"]');
        if(next) next.value = new URL(guideUrl, location.origin + location.pathname).href;
        const subject = form.querySelector('input[name="_subject"]');
        if(subject) subject.value = '[CoreCloudZA] Executive Guide Download: ' + guide;
      }
      if(backdrop){backdrop.classList.add('open');backdrop.querySelector('.modal-card')?.setAttribute('role','dialog');backdrop.querySelector('.modal-card')?.setAttribute('aria-modal','true');requestAnimationFrame(()=>close?.focus())}
    });
  });


  document.querySelectorAll('[data-lead-form]').forEach(form=>{
    if(!form.getAttribute('action')) form.setAttribute('data-corecloud-capture','true');
    form.addEventListener('corecloud:capture:complete', function(ev){
      const data = ev.detail && ev.detail.payload ? ev.detail.payload : {};
      if(data.type === 'GUIDE_DOWNLOAD' || data.leadType === 'GUIDE_DOWNLOAD'){
        const guide = data.asset || form.querySelector('[data-guide-asset]')?.value;
        const guideUrl = cfg.GUIDE_ASSETS && cfg.GUIDE_ASSETS[guide];
        const note = form.querySelector('[data-form-note]') || document.querySelector('[data-form-note]');
        if(note) note.textContent = 'Thank you. Your guide is opening now. If it does not open, use the link below.';
        if(guideUrl){
          setTimeout(()=>{ window.open(guideUrl, '_blank', 'noopener'); }, 350);
        }
      }
      form.reset();
    });
  });
})();
