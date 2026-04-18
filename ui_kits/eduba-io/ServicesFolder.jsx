/* ============================================================
   ServicesFolder.jsx — Folder-tab accordion (from Services.tsx)
   Each card uses the exact SVG shape from the source.
   Click to expand/collapse with GSAP height animation.
   ============================================================ */

const { useRef: useRefS, useState: useStateS } = React;

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DIA  = "'Diatype', 'Space Grotesk', system-ui, sans-serif";

const servicesItems = [
  { id:'learn', title:'Learn The Workflow',
    headline:'We start with what people actually do all day.',
    description:'Before training or building anything, we map real workflows. Where time goes. What is tedious. What is high stakes. What already works.',
    projects:['PACIFIC LIFE WORKFLOW AUDIT','COLGATE-PALMOLIVE TEAM SESSIONS','UNIVERSITY OF EDINBURGH FACULTY PROGRAM'],
    theme:{ background:'#d8bfc1', title:'#5d3136', dots:'rgba(254,251,246,0.9)', border:'rgba(66,29,36,0.22)' }},
  { id:'sort', title:'Sort The Work',
    headline:'We decide which layer each problem belongs on.',
    description:'Most failed AI projects start by automating the wrong thing. We sort the work into traditional software, rule-based logic, AI, or do not build this.',
    projects:['KPMG UK EXECUTIVE WORKSHOP','IAG INNOVATION TEAM','ACADEMY OF INTERNATIONAL AFFAIRS NRW'],
    theme:{ background:'#7b5a5c', title:'#fefbf6', dots:'rgba(254,251,246,0.9)', border:'rgba(254,251,246,0.24)' }},
  { id:'train', title:'Train People To Build',
    headline:'Workshops double as discovery and delivery.',
    description:'People learn by building something real with their own data. The exercises surface pain points, missing tooling, and decisions worth automating.',
    projects:['600+ ENTERPRISE TRAINEES','FLAGLER COLLEGE FACULTY PROGRAM','CORRELATION ONE DELIVERY PARTNERSHIP'],
    theme:{ background:'#ffffff', title:'#5d3136', dots:'rgba(93,49,54,0.32)', border:'rgba(93,49,54,0.18)' }},
  { id:'build', title:'Build What Makes Sense',
    headline:'We ship systems with the team still in the loop.',
    description:'For the problems that do belong to AI, we build the systems. Multi-agent platforms, data pipelines, governance tooling, and production workflows.',
    projects:['VIGILORE COMPLIANCE PLATFORM','ETHICS ENGINE RESEARCH','ICR SOFT POWER RESEARCH'],
    theme:{ background:'#f9ecdf', title:'#5d3136', dots:'rgba(66,29,36,0.35)', border:'rgba(66,29,36,0.2)' }},
  { id:'govern', title:'Govern What Works',
    headline:'Every live system needs a way to measure, hold, and stop.',
    description:'We attach evaluation, risk review, and operating rules to the systems that stay in use. Governance is part of the build process, not the meeting that happens after.',
    projects:['UNIVERSITY OF EDINBURGH RESEARCH','BRITISH COUNCIL POLICY WORK','ENTERPRISE RISK AND ADOPTION REVIEWS'],
    theme:{ background:'#5d3136', title:'#fefbf6', dots:'rgba(254,251,246,0.9)', border:'rgba(254,251,246,0.22)' }},
];

/* The exact SVG path from Services.tsx cardHeaderSvgDesktop */
function CardHeaderSvg({ bg, title, dotColor }) {
  return (
    <svg viewBox="0 0 1483 132" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', height:'auto', display:'block' }}
      preserveAspectRatio="none">
      <path d="M547.739 0.5H10.5Q0.5 0.5 0.5 10.5V121Q0.5 131 10.5 131H1472.5Q1482.5 131 1482.5 121V73Q1482.5 63 1472.5 63H601.297Q596.297 63 593.297 59L552.739 5.5Q549.739 1.5 547.739 0.5Z"
        fill={bg} stroke={bg} strokeLinejoin="round" strokeLinecap="round"/>
      {/* Corner arrow */}
      <path fillRule="evenodd" clipRule="evenodd"
        d="M8.5686 39.4314L8.5 39.5V9.5H38.5L38.4314 9.56862C22.4175 10.6115 9.6115 23.4175 8.5686 39.4314Z"
        fill={title}/>
      {/* Dot grid — 2×4 */}
      {[74.5,81.25,88,94.75].map((y,ri) =>
        [1461,1454.25,ri<2?1447.5:null,ri===0?1440.75:null].filter(Boolean).map((x,ci) => (
          <rect key={`${ri}-${ci}`} x={x-1.5} y={y-0.5} width={3.75} height={3.75} rx={0.5} fill={dotColor}/>
        ))
      )}
    </svg>
  );
}

function ServicesFolder() {
  const [activeIdx, setActiveIdx] = useStateS(2); // default: "Train" open
  const contentRefs = useRefS([]);

  const handleClick = (idx) => {
    const prev = activeIdx;
    const next = activeIdx === idx ? null : idx;

    // Close previous
    if (prev !== null && prev !== idx) {
      const el = contentRefs.current[prev];
      if (el) gsap.to(el, { height: 0, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
    }

    // Open/close clicked
    const el = contentRefs.current[idx];
    if (el) {
      if (next === null) {
        gsap.to(el, { height: 0, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
      } else {
        const h = el.scrollHeight;
        gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.45, ease: 'power2.out', overwrite: 'auto',
          onComplete: () => gsap.set(el, { height: 'auto' }) });
      }
    }
    setActiveIdx(next);
  };

  return (
    <section data-screen-label="03 Services" style={{ background:'#FEFBF6', padding:'40px 48px 72px' }}>
      {/* Section header */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:48, paddingBottom:24, borderBottom:`1px solid #EAD5D6`, marginBottom:'9vh' }}>
        <h2 style={{ fontFamily:DIA, fontSize:'clamp(14px,1.7vw,20px)', fontWeight:600, color:'#5d3136', margin:0 }}>What We Do</h2>
        <p style={{ fontFamily:MONO, fontSize:12, color:'#A2777A', lineHeight:1.7, margin:0 }}>
          We treat every engagement as a sequence. We learn the workflow, sort the work by the right layer, train people on the problems that matter, build the systems that hold up, and put governance around what stays live.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {servicesItems.map((svc, i) => (
          <div key={svc.id} style={{ position:'relative', marginTop: i===0 ? 0 : -10, zIndex: i+1 }}>
            {/* Clickable header */}
            <button onClick={() => handleClick(i)} style={{
              width:'100%', padding:0, border:'none', background:'transparent',
              cursor:'pointer', display:'block', textAlign:'left', position:'relative',
            }}>
              <CardHeaderSvg bg={svc.theme.background} title={svc.theme.title} dotColor={svc.theme.dots}/>
              {/* Title overlaid */}
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
                paddingLeft:'2vw', pointerEvents:'none', zIndex:2 }}>
                <span style={{ fontFamily:DIA, fontSize:'clamp(24px,2.7vw,38px)', fontWeight:600, color:svc.theme.title, lineHeight:1.05 }}>
                  {svc.title}
                </span>
              </div>
              {/* Cover strip so next card hides behind */}
              <div style={{ position:'absolute', left:0, right:0, height:'clamp(90px,9vw,132px)',
                bottom:'calc(-1 * clamp(90px,9vw,132px))', background:svc.theme.background, zIndex:0, pointerEvents:'none' }}/>
            </button>

            {/* Expandable content */}
            <div ref={el => contentRefs.current[i] = el}
              style={{ height: activeIdx===i ? 'auto' : 0, overflow:'hidden',
                background:svc.theme.background, position:'relative', zIndex:0 }}>
              <div style={{ padding:'14px clamp(18px,2vw,28px) 84px', opacity: activeIdx===i ? 1 : 0,
                transition:'opacity 0.3s ease' }}>
                {/* Column layout: left = title + projects, right = description */}
                <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, padding:'0 10px' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                    <div>
                      <span style={{ fontFamily:MONO, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
                        color:svc.theme.title, textTransform:'uppercase', display:'block', marginBottom:20 }}>TITLE</span>
                      <div style={{ borderTop:`1px dashed ${svc.theme.title}`, opacity:.4, marginBottom:20 }}/>
                      <h4 style={{ fontFamily:DIA, fontSize:'clamp(24px,3vw,42px)', fontWeight:500,
                        color:svc.theme.title, lineHeight:1.12, margin:'0 0 36px' }}>{svc.headline}</h4>
                    </div>
                    <div style={{ marginTop:'auto' }}>
                      <span style={{ fontFamily:MONO, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
                        color:svc.theme.title, textTransform:'uppercase', display:'block', marginBottom:12 }}>WHERE THIS SHOWS UP</span>
                      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:6 }}>
                        {svc.projects.map(p => (
                          <li key={p} style={{ fontFamily:MONO, fontSize:10, letterSpacing:'0.14em',
                            color:svc.theme.title, textTransform:'uppercase' }}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column' }}>
                    <span style={{ fontFamily:MONO, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
                      color:svc.theme.title, textTransform:'uppercase', display:'block', marginBottom:20 }}>DESCRIPTION</span>
                    <div style={{ borderTop:`1px dashed ${svc.theme.title}`, opacity:.4, marginBottom:20 }}/>
                    <p style={{ fontFamily:DIA, fontSize:'clamp(18px,2vw,26px)', fontWeight:400,
                      color:svc.theme.title, opacity:.72, lineHeight:1.45, margin:0 }}>{svc.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { ServicesFolder });
