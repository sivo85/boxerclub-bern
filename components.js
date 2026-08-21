/* Zentrale Website-Bausteine – Änderungen hier gelten auf allen eingebundenen Seiten. */
const SITE={
  sponsors:[
    {name:'Allianz Suisse', type:'haupt', logo:'AZ_Logo_positive_RGB.png', url:'https://www.allianz.ch/'},
    {name:'Mathiblitz', type:'haupt', logo:'Mathi Blitz.png', url:'https://www.mathiblitz.ch/'}
  ]
};

/* Ermittelt den Weg zurück zum Website-Stamm. So funktionieren Header, Footer,
   Logos und Sponsoren auch auf Unterseiten wie /news/herbstpruefung-2025.html. */
function siteRoot(){
  const script=[...document.scripts].find(s=>s.src && s.src.includes('components.js'));
  if(!script)return '';
  const url=new URL(script.src,window.location.href);
  return url.href.slice(0,url.href.lastIndexOf('/')+1);
}
function siteUrl(path=''){return siteRoot()+path}

function mainSponsorStrip(){
  const main=SITE.sponsors.filter(s=>s.type==='haupt');
  if(!main.length)return '';
  return `<div class="top-sponsor-strip"><div class="site-wrap top-sponsor-inner"><span class="top-sponsor-label">Hauptsponsoren</span><div class="top-sponsor-logos">${main.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${siteUrl(s.logo)}" alt="${s.name}"></a>`).join('')}</div></div></div>`
}

function siteHeader(){return `<header class="site-nav"><div class="site-navin"><a class="site-brand" href="${siteUrl('index.html')}"><img src="${siteUrl('boxerkopf-bern.jpg.png')}" alt="Schweizerischer Boxer-Club Ortsgruppe Bern 1926"></a><button class="site-menu-btn" aria-label="Menü öffnen" onclick="document.querySelector('.site-menu').classList.toggle('open')">☰</button><nav class="site-menu"><a href="${siteUrl('club.html')}">Club</a><a href="${siteUrl('training.html')}">Training</a><a href="${siteUrl('agenda.html')}">Agenda</a><a href="${siteUrl('news.html')}">News</a><span class="site-dropdown"><button class="site-dropdown-btn" type="button" aria-label="Geschichte öffnen">Geschichte <span aria-hidden="true">▾</span></button><span class="site-dropdown-menu"><a href="${siteUrl('100-jahre.html')}">100 Jahre OG Bern</a></span></span><a href="${siteUrl('mitgliedschaft.html')}">Mitgliedschaft</a><a href="${siteUrl('kontakt.html')}">Kontakt</a></nav></div></header>`}

function sponsorLogo(s){return `<a class="sponsor-logo" href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${siteUrl(s.logo)}" alt="${s.name}"><span>${s.name}</span></a>`}

/* Im unteren Sponsorenbereich erscheinen nur Partner/Jubiläumspartner – Hauptsponsoren sind exklusiv im Header. */
function sponsorBlock(){
  const jub=SITE.sponsors.filter(s=>s.type==='jubilaeum');
  const others=SITE.sponsors.filter(s=>s.type!=='haupt');
  if(!others.length)return '';
  let html=`<section class="site-sponsors">`;
  if(jub.length)html+=`<div class="site-wrap sponsor-jub"><div class="sponsor-label">Jubiläumspartner · 100 Jahre OG Bern</div></div>`;
  const logos=others.map(s=>sponsorLogo(s)).join('');
  html+=`<div class="sponsor-ticker-block"><div class="sponsor-label">Unsere Partner & Sponsoren</div><div class="sponsor-ticker" aria-label="Partner und Sponsoren"><div class="sponsor-track">${logos}${logos}</div></div></div></section>`;
  return html;
}

function siteFooter(){return `${sponsorBlock()}<footer class="site-footer"><div class="site-wrap site-footer-grid"><div><img class="site-footer-logo" src="${siteUrl('logo-og-bern.png')}" alt="Boxer-Club Bern"></div><div><strong>Boxer-Club Bern</strong><br>Ortsgruppe des Schweizerischen Boxer-Clubs<br>Übungsplatz Struchismoos · Uettligen</div><div><a href="${siteUrl('kontakt.html')}">Kontakt</a><br><a href="${siteUrl('mitgliedschaft.html')}">Mitgliedschaft</a><br><a href="${siteUrl('agenda.html')}">Agenda</a><br><span>© ${new Date().getFullYear()} Boxer-Club Bern</span></div></div></footer>`}

function injectSite(){
  if(!document.querySelector('.top-sponsor-strip')) document.body.insertAdjacentHTML('afterbegin',mainSponsorStrip());
  const h=document.querySelector('[data-site-header]');
  const f=document.querySelector('[data-site-footer]');
  if(h)h.innerHTML=siteHeader();
  if(f){f.innerHTML=siteFooter();return;}
  const existingFooter=document.querySelector('footer');
  const block=sponsorBlock();
  if(existingFooter && block && !document.querySelector('.site-sponsors')) existingFooter.insertAdjacentHTML('beforebegin',block);
}
document.addEventListener('DOMContentLoaded',injectSite);