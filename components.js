/* Zentrale Website-Bausteine – Änderungen hier gelten auf allen eingebundenen Seiten. */
const SITE={
  sponsors:[
    {name:'Allianz Suisse', type:'haupt', logo:'AZ_Logo_positive_RGB.png', url:'https://www.allianz.ch/'},
    {name:'Mathiblitz', type:'haupt', logo:'Mathi Blitz.png', url:'https://www.mathiblitz.ch/'}
  ]
};

function siteHeader(){return `<header class="site-nav"><div class="site-navin"><a class="site-brand" href="index.html"><img src="logo-og-bern.png" alt="Boxer-Club Bern"></a><button class="site-menu-btn" aria-label="Menü öffnen" onclick="document.querySelector('.site-menu').classList.toggle('open')">☰</button><nav class="site-menu"><a href="club.html">Club</a><a href="training.html">Training</a><a href="agenda.html">Agenda</a><a href="100-jahre.html">100 Jahre</a><a href="mitgliedschaft.html">Mitglied werden</a></nav></div></header>`}

function sponsorLogo(s,large=false){return `<a class="sponsor-logo${large?' sponsor-logo-main':''}" href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${s.logo}" alt="${s.name}"><span>${s.name}</span></a>`}

function sponsorBlock(){
  if(!SITE.sponsors.length)return '';
  const main=SITE.sponsors.filter(s=>s.type==='haupt');
  const jub=SITE.sponsors.filter(s=>s.type==='jubilaeum');
  const others=SITE.sponsors.filter(s=>s.type!=='haupt');
  let html=`<section class="site-sponsors">`;
  if(main.length)html+=`<div class="site-wrap sponsor-main"><div class="sponsor-label">Hauptsponsoren</div><div class="sponsor-main-grid">${main.map(s=>sponsorLogo(s,true)).join('')}</div></div>`;
  if(jub.length)html+=`<div class="site-wrap sponsor-jub"><div class="sponsor-label">Jubiläumspartner · 100 Jahre OG Bern</div></div>`;
  if(others.length){const logos=others.map(s=>sponsorLogo(s)).join('');html+=`<div class="sponsor-ticker-block"><div class="sponsor-label">Unsere Partner & Sponsoren</div><div class="sponsor-ticker" aria-label="Partner und Sponsoren"><div class="sponsor-track">${logos}${logos}</div></div></div>`}
  html+=`</section>`;return html;
}

function siteFooter(){return `${sponsorBlock()}<footer class="site-footer"><div class="site-wrap site-footer-grid"><div><img class="site-footer-logo" src="logo-og-bern.png" alt="Boxer-Club Bern"></div><div><strong>Boxer-Club Bern</strong><br>Ortsgruppe des Schweizerischen Boxer-Clubs<br>Übungsplatz Struchismoos · Uettligen</div><div><a href="mitgliedschaft.html">Kontakt & Mitgliedschaft</a><br><a href="agenda.html">Agenda</a><br><span>© ${new Date().getFullYear()} Boxer-Club Bern</span></div></div></footer>`}

function injectSite(){
  const h=document.querySelector('[data-site-header]');
  const f=document.querySelector('[data-site-footer]');
  if(h)h.innerHTML=siteHeader();
  if(f){f.innerHTML=siteFooter();return;}
  const existingFooter=document.querySelector('footer');
  if(existingFooter && !document.querySelector('.site-sponsors')) existingFooter.insertAdjacentHTML('beforebegin',sponsorBlock());
}
document.addEventListener('DOMContentLoaded',injectSite);