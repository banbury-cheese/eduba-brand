const { useState: useStateR } = React;

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DIA  = "'Diatype', 'Space Grotesk', system-ui, sans-serif";

/* ---- Resources grid ---------------------------------------- */
function Resources() {
  const items = [
    { key:'scribe', icon:'../../assets/icons/resource-scribe.svg', label:'Scribe', meta:'WRITING' },
    { key:'study',  icon:'../../assets/icons/resource-study-arcade.svg', label:'Study-Arcade', meta:'LEARNING' },
    { key:'vox',    icon:'../../assets/icons/resource-vox-meet.svg', label:'Vox-Meet', meta:'COMING SOON' },
    { key:'clief',  icon:'../../assets/icons/resource-clief-notes.svg', label:'Clief Notes', meta:'READING' },
    { key:'sub',    icon:'../../assets/icons/resource-substack.svg', label:'Substack', meta:'NEWSLETTER' },
  ];
  const [hover, setHover] = useStateR(null);
  const [toast, setToast] = useStateR(null);
  return (
    <section data-screen-label="03 Resources" style={{background:'#FEFBF6', color:'#4A2C2A', padding:'60px 40px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40}}>
        <div>
          {/* mono label */}
          <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#A2777A', marginBottom:12}}>SECTION 03 / RESOURCES</div>
          {/* Diatype heading */}
          <h2 style={{fontFamily:DIA, fontSize:34, fontWeight:700, margin:0, letterSpacing:'-0.02em'}}>Things we made.</h2>
        </div>
        <span style={{fontFamily:MONO, fontSize:11, color:'#7D5658'}}>Click to explore →</span>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12}}>
        {items.map(it => (
          <button key={it.key}
            onMouseEnter={()=>setHover(it.key)}
            onMouseLeave={()=>setHover(null)}
            onClick={()=>{
              const msg = it.meta==='COMING SOON' ? `${it.label.toUpperCase()} IS COMING SOON.` : `OPENING ${it.label.toUpperCase()}…`;
              setToast(msg); setTimeout(()=>setToast(null), 2000);
            }}
            style={{
              aspectRatio:'2/1', background: hover===it.key ? '#EAD5D6aa' : 'transparent',
              border: `1px solid ${hover===it.key ? '#5d3136' : '#D8BFC0'}`,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:10, padding:'16px 10px', cursor:'pointer', textAlign:'center',
              transition:'all .2s ease', fontFamily:MONO,
            }}>
            <img src={it.icon} style={{height:28}}/>
            {/* mono label — uppercase per spec */}
            <span style={{fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', color:'#5d3136'}}>{it.label}</span>
            <span style={{fontSize:7, fontWeight:700, letterSpacing:'0.12em', color:'#A2777A', textTransform:'uppercase'}}>{it.meta}</span>
          </button>
        ))}
      </div>

      {toast && (
        <div style={{
          position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)',
          background:'#5d3136', color:'#FEFBF6', padding:'10px 20px', fontFamily:MONO,
          fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em',
          boxShadow:'0 18px 40px rgba(93,49,54,0.16)', zIndex:100,
        }}>{toast}</div>
      )}
    </section>
  );
}

/* ---- Services (dark) --------------------------------------- */
function Services() {
  const items = [
    { n:'01', t:'Computational orchestration', d:'We design the workflow layer between humans and systems, for organisations that cannot afford to get it wrong.' },
    { n:'02', t:'Applied AI products', d:'Scribe, Study-Arcade and the others — we build our own tools, and sell what holds up in use.' },
    { n:'03', t:'Research & policy', d:'We publish with ICR and others. We advise on the rules that will shape this decade of AI.' },
  ];
  return (
    <section data-screen-label="04 Services" style={{background:'#5d3136', color:'#EAD5D6', padding:'60px 40px'}}>
      {/* mono label */}
      <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#D8BFC0', marginBottom:12}}>SECTION 04 / SERVICES</div>
      {/* Diatype heading */}
      <h2 style={{fontFamily:DIA, fontSize:48, fontWeight:700, margin:'0 0 40px', letterSpacing:'-0.02em', maxWidth:900, color:'#FEFBF6'}}>What we do.</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
        {items.map(it => (
          <article key={it.n} style={{background:'#F9ECDF', color:'#5d3136', padding:'20px 22px', display:'flex', flexDirection:'column', gap:14}}>
            {/* mono card ID */}
            <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', color:'#A2777A', textTransform:'uppercase'}}>SERVICES / {it.n}</div>
            {/* Diatype card title — lowercase */}
            <h3 style={{fontFamily:DIA, fontSize:18, fontWeight:700, margin:0, lineHeight:1.2, textTransform:'lowercase'}}>{it.t}</h3>
            {/* Diatype body */}
            <p style={{fontFamily:DIA, fontWeight:300, fontSize:15, lineHeight:1.6, margin:0, color:'rgba(93,49,54,.75)', textIndent:30}}>{it.d}</p>
            {/* mono button */}
            <button style={{marginTop:'auto', background:'none', border:'none', padding:0, fontFamily:MONO, fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#5d3136', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8}}>
              Learn more <span style={{fontSize:12}}>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Resources, Services });
