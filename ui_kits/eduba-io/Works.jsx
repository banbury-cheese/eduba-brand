/* ============================================================
   Works.jsx — Stacked folder-tab cards (from Works.tsx)
   Tab SVGs offset horizontally, GSAP scroll-drive replaced
   with a simple click-to-advance for the UI kit preview.
   ============================================================ */

const { useRef, useEffect, useState: useStateW } = React;

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DIA  = "'Diatype', 'Space Grotesk', system-ui, sans-serif";

const worksItems = [
  { id:'pacific-colgate', badge:'Pacific Life', title:'Pacific Life & Colgate-Palmolive', year:'2025', client:'CORRELATION ONE',
    tags:['WORKFLOW INTEGRATION','AGENT DEVELOPMENT','MULTI-DAY SESSIONS','EXECUTIVE & FRONTLINE'],
    summary:'600+ employees trained, 95% adoption after 30 days, agents built during coursework projected to save 2,000–3,000 hours annually.',
    theme:{ bg:'#d8bfc1', title:'#5d3136', meta:'rgba(93,49,54,0.65)', tagBg:'rgba(93,49,54,0.1)', tagText:'#5d3136', divider:'rgba(93,49,54,0.2)', placeholderBg:'rgba(93,49,54,0.07)', placeholderText:'rgba(93,49,54,0.4)', summary:'rgba(93,49,54,0.8)' }},
  { id:'kpmg', badge:'KPMG', title:'KPMG UK Executive Workshop', year:'2025', client:'KPMG UK',
    tags:['STRATEGIC AI','EXECUTIVE WORKSHOP','GLOBAL CONSULTANCY'],
    summary:'40+ senior executives trained on strategic AI decision-making — built around one core question: when should the answer be no?',
    theme:{ bg:'#5d3136', title:'#fefbf6', meta:'rgba(254,251,246,0.65)', tagBg:'rgba(254,251,246,0.14)', tagText:'#fefbf6', divider:'rgba(254,251,246,0.28)', placeholderBg:'rgba(254,251,246,0.08)', placeholderText:'rgba(254,251,246,0.4)', summary:'rgba(254,251,246,0.8)' }},
  { id:'vigilore', badge:'VigilOre', title:'VigilOre Compliance Platform', year:'2024', client:'ARMETOUR',
    tags:['DEFENSE','MULTI-AGENT SYSTEMS','FULL PRODUCT BUILD'],
    summary:'Multi-agent compliance platform for DRC mining operations. 160+ hours of manual work per cycle reduced to under 5 minutes.',
    theme:{ bg:'#f9ecdf', title:'#5d3136', meta:'rgba(93,49,54,0.65)', tagBg:'rgba(93,49,54,0.09)', tagText:'#5d3136', divider:'rgba(93,49,54,0.16)', placeholderBg:'rgba(93,49,54,0.06)', placeholderText:'rgba(93,49,54,0.4)', summary:'rgba(93,49,54,0.8)' }},
];

function Works() {
  const [active, setActiveW] = useStateW(0);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  // On active change, animate new card sliding up
  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      if (i <= active) {
        gsap.to(el, { y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      } else {
        gsap.set(el, { y: '100%' });
      }
    });
  }, [active]);

  return (
    <section data-screen-label="02 Works" style={{ background:'#FEFBF6', position:'relative', minHeight:'80vh' }}>
      {/* "Back Home" black tab top-right */}
      <div style={{ position:'absolute', top:0, right:40, zIndex:20, display:'flex', alignItems:'center', gap:0 }}>
        <svg width="220" height="46" viewBox="0 0 344 46" fill="none" preserveAspectRatio="none" style={{ display:'block', width:220, height:46 }}>
          <path d="M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z" fill="#111"/>
        </svg>
        <span style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
          fontFamily:MONO, fontSize:10, fontWeight:800, letterSpacing:'0.1em',
          textTransform:'uppercase', color:'#fff', whiteSpace:'nowrap' }}>BACK HOME -&gt;</span>
      </div>

      {/* Stacked cards viewport */}
      <div ref={containerRef} style={{ position:'relative', height:'85vh', overflow:'hidden' }}>
        {worksItems.map((work, i) => (
          <div key={work.id} ref={el => cardRefs.current[i] = el}
            style={{
              position:'absolute', top:0, left:0, right:0, bottom:0,
              transform: i <= active ? 'translateY(0)' : 'translateY(100%)',
              zIndex: i + 1,
            }}>
            {/* Folder tab */}
            <div style={{ position:'absolute', top:2, left: i * 220 + 20, zIndex:10, display:'flex', alignItems:'center' }}>
              <svg width="200" height="46" viewBox="0 0 344 46" fill="none" preserveAspectRatio="none" style={{ width:200, height:46, display:'block' }}>
                <path d="M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z" fill={work.theme.bg}/>
              </svg>
              <span style={{ position:'absolute', left:'50%', top:'52%', transform:'translate(-50%,-50%)',
                fontFamily:MONO, fontSize:10, fontWeight:800, letterSpacing:'0.1em',
                textTransform:'uppercase', color:work.theme.title, whiteSpace:'nowrap' }}>{work.badge}</span>
            </div>

            {/* Body */}
            <div style={{
              position:'absolute', top:48, left:0, right:0, bottom:0,
              background:work.theme.bg, padding:'40px 60px', display:'flex', flexDirection:'column', gap:20,
            }}>
              {/* Header row */}
              <div style={{ display:'flex', gap:36, alignItems:'flex-start' }}>
                <h3 style={{ fontFamily:DIA, fontSize:'clamp(32px,3.2vw,58px)', fontWeight:700, lineHeight:1.05, color:work.theme.title, margin:0, flex:'1 1 auto' }}>{work.title}</h3>
                <div style={{ fontFamily:MONO, fontSize:12, color:work.theme.meta, display:'flex', flexDirection:'column', gap:8, flex:'0 0 300px' }}>
                  <span>{work.year}</span>
                  <span>{work.client}</span>
                  <a href="#" style={{ color:work.theme.title, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'underline', textUnderlineOffset:'0.16em' }}>VIEW PROJECT</a>
                  {/* tag ticker */}
                  <div style={{ overflow:'hidden', background:work.theme.tagBg, padding:'3px 0', marginTop:4 }}>
                    <span style={{ fontFamily:MONO, fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:work.theme.tagText }}>
                      {work.tags.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashed divider */}
              <div style={{ borderBottom:`2px dashed ${work.theme.divider}`, width:'100%' }}/>

              {/* Gallery placeholders */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, flex:'1 1 auto' }}>
                {[0,1,2].map(n => (
                  <div key={n} style={{ background:work.theme.placeholderBg, display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', color:work.theme.placeholderText, textTransform:'uppercase' }}>
                    IMAGE PLACEHOLDER
                  </div>
                ))}
              </div>

              {/* Summary */}
              <p style={{ fontFamily:DIA, fontSize:18, lineHeight:1.4, color:work.theme.summary, margin:0 }}>{work.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div style={{ display:'flex', gap:10, justifyContent:'center', padding:'12px 0', background:'#FEFBF6' }}>
        {worksItems.map((_, i) => (
          <button key={i} onClick={() => setActiveW(i)} style={{
            width: i===active ? 24 : 8, height:8, borderRadius:4, border:'none', cursor:'pointer',
            background: i===active ? '#5d3136' : '#D8BFC0', transition:'all .2s ease', padding:0,
          }}/>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Works });
