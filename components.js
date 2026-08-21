/* Zentrale Website-Bausteine – Änderungen hier gelten auf allen eingebundenen Seiten. */
const SITE={sponsors:[{name:'Allianz Suisse',type:'haupt',logo:'assets/logos/allianz.png',url:'https://www.maeder-allianz.ch/'},{name:'Mathiblitz',type:'haupt',logo:'assets/logos/mathiblitz.png',url:'https://www.mathiblitz.ch/'}]};
function siteRoot(){const script=[...document.scripts].find(s=>s.src&&s.src.includes('components.js'));if(!script)return '';const url=new URL(script.src,window.location.href);return url.href.slice(0,url.href.lastIndexOf('/')+1)}
function siteUrl(path=''){return siteRoot()+path}

/* Kompatibilität für ältere Seiten: alle früheren Datei-Pfade werden zentral auf
   die neue assets-Struktur umgeleitet. Dadurch bleiben Bilder und PDFs auch auf
   bereits bestehenden Seiten funktionsfähig, ohne doppelte Dateien im Root. */
const LEGACY_ASSETS={
  'Boxerkopf-Bern.jpg.png':'assets/logos/boxerkopf-bern.png',
  'AZ_Logo_positive_RGB.png':'assets/logos/allianz.png',
  'Mathi Blitz.png':'assets/logos/mathiblitz.png',
  'logo-og-bern.png':'assets/logos/logo-og-bern.png',
  'SBC_1906.png':'assets/logos/sbc.png',
  'Logo-SKG_1000x240px_Weiss (1).png':'assets/logos/skg.png',
  'boxer-duo.jpg':'assets/images/boxer-duo.jpg',
  'boxer-wald.jpg':'assets/images/boxer-wald.jpg',
  'Caroline Baumann.jpg':'assets/images/vorstand/caroline-baumann.jpg',
  'Fabienne Burgener.jpg':'assets/images/vorstand/fabienne-burgener.jpg',
  'Martina Beyeler.jpeg':'assets/images/vorstand/martina-beyeler.jpeg',
  'Martina Marti.jpg':'assets/images/vorstand/martina-marti.jpg',
  'Michael Bracher.jpg':'assets/images/vorstand/michael-bracher.jpg',
  'Nina Clavey.jpg':'assets/images/vorstand/nina-clavey.jpg',
  'Sandra Gadient.jpg':'assets/images/vorstand/sandra-gadient.jpg',
  'Simon Vonrüti.jpeg':'assets/images/vorstand/simon-vonrueti.jpeg',
  'Simon Vonrüti.jpeg':'assets/images/vorstand/simon-vonrueti.jpeg',
  'Ueli Burgener.jpg':'assets/images/vorstand/ueli-burgener.jpg',
  'Beitrittsgesuch 2026 (1).pdf':'assets/documents/beitrittsgesuch-2026.pdf',
  'SBC Mitgliederbeiträge ab 01.01.2025[38].pdf':'assets/documents/sbc-mitgliederbeitraege-2025.pdf',
  'SBC Statuten 2020 (1).pdf':'assets/documents/sbc-statuten-2020.pdf'
};
function migrateLegacyAssets(){
  const variants=[];
  Object.entries(LEGACY_ASSETS).forEach(([oldPath,newPath])=>{
    variants.push([oldPath,newPath],[encodeURI(oldPath),newPath]);
  });
  document.querySelectorAll('img[src],a[href],source[src]').forEach(el=>{
    const attr=el.hasAttribute('href')?'href':'src';
    let value=el.getAttribute(attr)||'';
    if(!value||/^(https?:|mailto:|tel:|#)/i.test(value))return;
    for(const [oldPath,newPath] of variants){
      if(value===oldPath||value.endsWith('/'+oldPath)||decodeURI(value)===oldPath){el.setAttribute(attr,siteUrl(newPath));break}
    }
  });
  document.querySelectorAll('style').forEach(style=>{
    let css=style.textContent;
    let changed=false;
    for(const [oldPath,newPath] of Object.entries(LEGACY_ASSETS)){
      if(css.includes(oldPath)){css=css.split(oldPath).join(siteUrl(newPath));changed=true}
      const encoded=encodeURI(oldPath);
      if(css.includes(encoded)){css=css.split(encoded).join(siteUrl(newPath));changed=true}
    }
    if(changed)style.textContent=css;
  });
}
function mainSponsorStrip(){const main=SITE.sponsors.filter(s=>s.type==='haupt');if(!main.length)return '';return `<div class="top-sponsor-strip"><div class="site-wrap top-sponsor-inner"><span class="top-sponsor-label">Hauptsponsoren</span><div class="top-sponsor-logos">${main.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${siteUrl(s.logo)}" alt="${s.name}"></a>`).join('')}</div></div></div>`}
function siteHeader(){return `<header class="site-nav"><div class="site-navin"><a class="site-brand" href="${siteUrl('index.html')}"><img src="${siteUrl('assets/logos/boxerkopf-bern.png')}" alt="Schweizerischer Boxer-Club Ortsgruppe Bern 1926"></a><button class="site-menu-btn" aria-label="Menü öffnen" onclick="document.querySelector('.site-menu').classList.toggle('open')">☰</button><nav class="site-menu"><span class="site-dropdown"><button class="site-dropdown-btn" type="button">Club <span aria-hidden="true">▾</span></button><span class="site-dropdown-menu"><a href="${siteUrl('club.html')}">Unsere Ortsgruppe</a><a href="${siteUrl('sponsoren.html')}">Sponsoren & Partner</a></span></span><a href="${siteUrl('training.html')}">Training</a><a href="${siteUrl('agenda.html')}">Agenda</a><a href="${siteUrl('news.html')}">News</a><span class="site-dropdown"><button class="site-dropdown-btn" type="button">Geschichte <span aria-hidden="true">▾</span></button><span class="site-dropdown-menu"><a href="${siteUrl('100-jahre.html')}">100 Jahre OG Bern</a></span></span><a href="${siteUrl('mitgliedschaft.html')}">Mitgliedschaft</a><a href="${siteUrl('kontakt.html')}">Kontakt</a></nav></div></header>`}
function sponsorLogo(s){return `<a class="sponsor-logo" href="${s.url}" target="_blank" rel="noopener" title="${s.name}"><img src="${siteUrl(s.logo)}" alt="${s.name}"><span>${s.name}</span></a>`}
function sponsorBlock(){const others=SITE.sponsors.filter(s=>s.type!=='haupt');if(!others.length)return '';const logos=others.map(s=>sponsorLogo(s)).join('');return `<section class="site-sponsors"><div class="sponsor-ticker-block"><div class="sponsor-label">Unsere Partner & Sponsoren</div><div class="sponsor-ticker"><div class="sponsor-track">${logos}${logos}</div></div></div></section>`}
function siteFooter(){return `${sponsorBlock()}<footer class="site-footer"><div class="site-wrap"><div class="site-footer-grid"><div class="footer-identity"><img class="site-footer-logo" src="${siteUrl('assets/logos/boxerkopf-bern.png')}" alt="Boxer-Club Bern"><div><strong>Boxer-Club Bern</strong><br><span>Ortsgruppe des Schweizerischen Boxer-Clubs</span><br><span>Übungsplatz Struchismoos · Uettligen</span><br><a class="footer-mail" href="mailto:info@boxerclub-bern.ch">info@boxerclub-bern.ch</a></div></div><div><div class="footer-title">Schnellzugriff</div><div class="footer-links"><a href="${siteUrl('club.html')}">Club</a><a href="${siteUrl('training.html')}">Training</a><a href="${siteUrl('agenda.html')}">Agenda</a><a href="${siteUrl('news.html')}">News</a><a href="${siteUrl('sponsoren.html')}">Sponsoren & Partner</a><a href="${siteUrl('mitgliedschaft.html')}">Mitgliedschaft</a><a href="${siteUrl('kontakt.html')}">Kontakt</a></div></div><div><div class="footer-title">Organisationen</div><div class="footer-org-logos"><a href="https://www.boxerhunde.ch/" target="_blank" rel="noopener" title="Schweizerischer Boxer-Club SBC"><img src="${siteUrl('assets/logos/sbc.png')}" alt="Schweizerischer Boxer-Club SBC"></a><a href="https://www.skg.ch/" target="_blank" rel="noopener" title="Schweizerische Kynologische Gesellschaft SKG"><img src="${siteUrl('assets/logos/skg.png')}" alt="Schweizerische Kynologische Gesellschaft SKG"></a></div><p class="footer-org"><a href="https://www.boxerhunde.ch/" target="_blank" rel="noopener">Schweizerischer Boxer-Club SBC</a><br><a href="https://www.skg.ch/" target="_blank" rel="noopener">Schweizerische Kynologische Gesellschaft SKG</a></p></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Boxer-Club Bern</span><div><a href="${siteUrl('impressum.html')}">Impressum</a><a href="${siteUrl('datenschutz.html')}">Datenschutz</a><a href="https://www.facebook.com/boxerclubbern" target="_blank" rel="noopener">Facebook</a></div></div></div></footer>`}
function injectSite(){migrateLegacyAssets();if(!document.querySelector('.top-sponsor-strip'))document.body.insertAdjacentHTML('afterbegin',mainSponsorStrip());const headerSlot=document.querySelector('[data-site-header]');if(headerSlot){headerSlot.innerHTML=siteHeader()}else{const legacyHeader=document.querySelector('header.nav');if(legacyHeader)legacyHeader.outerHTML=siteHeader()}const footerSlot=document.querySelector('[data-site-footer]');if(footerSlot){footerSlot.innerHTML=siteFooter()}else{const legacyFooter=document.querySelector('footer');if(legacyFooter)legacyFooter.outerHTML=siteFooter()}}
document.addEventListener('DOMContentLoaded',injectSite);