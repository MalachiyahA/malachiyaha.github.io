/* ===== MOBILE MENU ===== */
const btn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
btn.addEventListener('click',()=>{btn.setAttribute('aria-expanded',nav.classList.toggle('open'))});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}});

/* ===== MARQUEE: duplicates the images so the loop is seamless ===== */
document.querySelectorAll('.track').forEach(t=>[...t.children].forEach(c=>{
 const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');t.appendChild(k)}));

/* ===== LIGHTBOX: opens the hidden <ol class="slides"> list inside a card ===== */
const lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
lb.innerHTML='<button class="lb-x" aria-label="Close">&times;</button><button class="lb-p" aria-label="Previous">&#8249;</button><div class="lb-stage"></div><p class="lb-cap"></p><button class="lb-n" aria-label="Next">&#8250;</button>';
document.body.appendChild(lb);
const stage=lb.querySelector('.lb-stage'),cap=lb.querySelector('.lb-cap');
let slides=[],idx=0,opener=null,x0=0;
function show(n){idx=(n+slides.length)%slides.length;const s=slides[idx];stage.innerHTML='';
 if(s.dataset.video){const f=document.createElement('iframe');f.src='https://player.vimeo.com/video/'+s.dataset.video+'?title=0&byline=0&portrait=0&badge=0&autopause=0';f.allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';f.referrerPolicy='strict-origin-when-cross-origin';f.allowFullscreen=true;f.title=s.textContent;const [ra,rb]=(s.dataset.ratio||'4/3').split('/'),rt=ra/rb;f.style.aspectRatio=rt;f.style.width='min(92vw,1100px,'+(78*rt)+'vh)';stage.appendChild(f)}
 else{const m=new Image();m.src=s.dataset.img;m.alt=s.textContent;stage.appendChild(m)}
 cap.textContent=s.textContent;lb.classList.toggle('single',slides.length<2)}
function closeLb(){lb.hidden=true;stage.innerHTML='';document.body.style.overflow='';if(opener)opener.focus()}
document.addEventListener('click',e=>{const o=e.target.closest('.open');if(!o)return;
 opener=o;slides=[...o.parentElement.querySelectorAll('.slides li')];lb.hidden=false;document.body.style.overflow='hidden';show(0);lb.querySelector('.lb-x').focus()});
lb.querySelector('.lb-x').onclick=closeLb;lb.querySelector('.lb-p').onclick=()=>show(idx-1);lb.querySelector('.lb-n').onclick=()=>show(idx+1);
lb.addEventListener('click',e=>{if(e.target===lb||e.target===stage)closeLb()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
lb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50&&slides.length>1)show(idx+(d<0?1:-1))});
