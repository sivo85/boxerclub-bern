/* Zentrale Website-Bausteine – Änderungen hier gelten auf allen eingebundenen Seiten. */
const SITE={
  sponsors:[
    /* Beispiel für später:
    {name:'Sponsor', logo:'sponsors/sponsor.png', url:'https://example.ch'}
    */
  ]
};

function siteHeader(){return `<header class="site-nav"><div class="site-navin"><a class="site-brand" href="index.html"><img src="logo-og-bern.png" alt="Boxer-Club Bern"></a><button class="site-menu-btn" aria-label="Menü öffnen" onclick="document.querySelector('.site-menu').classList.toggle('open')">☰</button><nav class="site-menu"><a href="club.html">Club</a><a href="training.html">Training</a><a href="agenda.html">Agenda</a><a href="100-jahre.html">100 Jahre</a><a href="mitgliedschaft.html">Mitglied werden</a></nav></div></header>`}
function sponsorBlock(){if(!SITE.sponsors.length)return '';return `<section class="site-sponsors"><div class="site-wrap"><div class="site-sponsor-title">Unsere Partner & Sponsoren</div><div class="site-sponsor-grid">${SITE.sponsors.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${s.logo}" alt="${s.name}"></a>`).join('')}</div></div></section>`}
function siteFooter(){return `${sponsorBlock()}<footer class="site-footer"><div class="site-wrap site-footer-grid"><div><img class="site-footer-logo" src="logo-og-bern.png" alt="Boxer-Club Bern"></div><div><strong>Boxer-Club Bern</strong><br>Ortsgruppe des Schweizerischen Boxer-Clubs<br>Übungsplatz Struchismoos · Uettligen</div><div><a href="mitgliedschaft.html">Kontakt & Mitgliedschaft</a><br><a href="agenda.html">Agenda</a><br><span>© ${new Date().getFullYear()} Boxer-Club Bern</span></div></div></footer>`}
function injectSite(){const h=document.querySelector('[data-site-header]'),f=document.querySelector('[data-site-footer]');if(h)h.innerHTML=siteHeader();if(f)f.innerHTML=siteFooter()}
document.addEventListener('DOMContentLoaded',injectSite);