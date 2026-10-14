document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.cc-rc2-nav'); if(!nav)return;
 const current=location.pathname.split('/').pop()||'index.html';
 nav.querySelectorAll('a[aria-current],button[aria-current]').forEach(el=>el.removeAttribute('aria-current'));
 nav.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(href===current||(current==='index.html'&&href==='./'))a.setAttribute('aria-current','page')});
 const menus=[...nav.querySelectorAll('.cc-rc2-dropdown')];
 const closeAll=()=>menus.forEach(d=>{d.classList.remove('open');d.querySelector('button')?.setAttribute('aria-expanded','false')});
 menus.forEach(d=>{const b=d.querySelector('button');if(!b)return;
  if(d.querySelector('.cc-rc2-menu a[aria-current="page"]'))b.setAttribute('aria-current','page');
  b.addEventListener('click',()=>{const open=!d.classList.contains('open');closeAll();if(open){d.classList.add('open');b.setAttribute('aria-expanded','true')}});
  d.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();b.focus()}if(e.key==='ArrowDown'&&e.target===b){e.preventDefault();d.classList.add('open');b.setAttribute('aria-expanded','true');d.querySelector('.cc-rc2-menu a')?.focus()}});
 });
 document.addEventListener('click',e=>{if(!e.target.closest('.cc-rc2-dropdown'))closeAll()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
});
