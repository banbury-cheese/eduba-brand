const { useState } = React;

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DIA  = "'Diatype', 'Space Grotesk', system-ui, sans-serif";

const readings = [
  'The Foundation',
  'The Archive',
  'Implementation Playbooks',
  'Building Your Stack',
  'The Vault',
];

/* ---- Hero --------------------------------------------------
   Light #FEFBF6 surface. Gradient wordmark fills the width.
   Readings row beneath with arrow-corner accents.            */
function Hero() {
  return (
    <section data-screen-label="01 Hero" style={{
      background:'#FEFBF6', color:'#4A2C2A',
      display:'flex', flexDirection:'column',
      borderBottom:'1px solid #EAD5D6',
    }}>
      {/* wordmark — nearly full-width, tight top padding */}
      <div style={{padding:'2vh 6px 0', width:'100%', boxSizing:'border-box'}}>
        <img src="../../assets/wordmark.svg" style={{width:'100%', display:'block'}}/>
      </div>

      {/* readings row */}
      <div style={{
        display:'flex', gap:32, flexWrap:'wrap',
        padding:'16px 20px 20px',
        fontFamily:MONO, fontSize:11, fontWeight:500,
        textTransform:'uppercase', letterSpacing:'0.04em', color:'#4A2C2A',
      }}>
        {readings.map(r => (
          <a key={r} href="#" style={{
            display:'flex', alignItems:'flex-start', gap:8,
            color:'inherit', textDecoration:'none', opacity:.85,
          }}>
            {/* arrow-corner accent */}
            <svg width="11" height="11" viewBox="0 0 30 30" fill="none" style={{flexShrink:0, marginTop:1}}>
              <path d="M30 0L30 30L0 30L30 0Z" fill="#D8BFC0"/>
            </svg>
            {r}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---- Framework --------------------------------------------- */
function Framework() {
  const rows = [
    { n:'01', t:'Learn',  d:'We start with what people actually do all day. Where time goes. What is tedious. What is loved. What is ignored.' },
    { n:'02', t:'Sort',   d:'We sort the noise. What belongs to humans. What belongs to systems. What belongs in the middle.' },
    { n:'03', t:'Train',  d:'We map real workflows — not the idealised version in the slide deck — and design the loop around them.' },
    { n:'04', t:'Build',  d:'We ship systems with the team still in the loop. For the problems that do belong to AI, we build the systems.' },
    { n:'05', t:'Govern', d:'We write the policies, the oversight, the kill-switches. We make the system accountable to the humans using it.' },
  ];
  const themes = [
    { bg:'#d8bfc1', fg:'#5d3136' },
    { bg:'#7b5a5c', fg:'#fefbf6' },
    { bg:'#ffffff', fg:'#5d3136' },
    { bg:'#f9ecdf', fg:'#5d3136' },
    { bg:'#5d3136', fg:'#fefbf6' },
  ];
  return (
    <section data-screen-label="02 Framework" style={{background:'#FEFBF6', color:'#4A2C2A'}}>
      {/* section header */}
      <div style={{padding:'60px 40px 40px', borderBottom:'1px solid #D8BFC0',
        display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:40,
      }}>
        <div>
          {/* mono label */}
          <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#A2777A', marginBottom:12}}>SECTION 02 / FRAMEWORK</div>
          {/* Diatype heading */}
          <h2 style={{fontFamily:DIA, fontSize:48, fontWeight:700, lineHeight:1.05, margin:0, letterSpacing:'-0.02em', maxWidth:720}}>
            We learn, sort, train, build, govern.
          </h2>
        </div>
        {/* Diatype body */}
        <div style={{fontFamily:DIA, fontWeight:300, fontSize:15, lineHeight:1.6, maxWidth:240, color:'#7D5658'}}>
          A five-step operating model for bringing AI into real teams — not a launch checklist.
        </div>
      </div>

      {rows.map((r,i)=>(
        <div key={r.n} style={{
          display:'grid', gridTemplateColumns:'120px 1fr 1fr 1fr', gap:40,
          padding:'40px', borderBottom: i===rows.length-1 ? 'none' : '1px solid rgba(93,49,54,.2)',
          alignItems:'flex-start',
          background: themes[i].bg, color: themes[i].fg,
        }}>
          {/* mono step label */}
          <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', opacity:.7}}>
            STEP {r.n}
          </div>
          {/* Diatype title — lowercase per spec */}
          <h3 style={{fontFamily:DIA, fontSize:34, fontWeight:700, margin:0, textTransform:'lowercase'}}>{r.t}.</h3>
          {/* Diatype body */}
          <p style={{fontFamily:DIA, fontWeight:300, fontSize:15, lineHeight:1.6, margin:0, maxWidth:360, textIndent:30}}>{r.d}</p>
          {/* mono snake label */}
          <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', textAlign:'right', opacity:.7}}>
            ({r.t.toLowerCase()}_phase)
          </div>
        </div>
      ))}
    </section>
  );
}

Object.assign(window, { Hero, Framework });
